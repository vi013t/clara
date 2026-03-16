<script lang="ts">
    import { dfs, bfs, type Node } from "../../api/graph";

    let { graph }: { graph: Node } = $props();

    let edges: SVGElement = null!;

    let nodes: Node[] = $derived.by(() => {
        let nodes: Node[] = [];
        dfs(graph, node => nodes.push(node));
        return nodes;
    });

    $effect(() => {
        bfs(graph, node => node.olderSiblings.forEach(sibling => createEdge(node.position, sibling.position)));
    });

    function createEdge(pos1: [number, number], pos2: [number, number]) {
        const line = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "line"
        );
        line.setAttribute("x1", `${pos1[0] + innerWidth / 2}`);
        line.setAttribute("y1", `${pos1[1] + innerHeight / 2}`);
        line.setAttribute("x2", `${pos2[0] + innerWidth / 2}`);
        line.setAttribute("y2", `${pos2[1] + innerHeight / 2}`);
        line.setAttribute("stroke", "#888888");
        line.setAttribute("stroke-width", "2");

        edges.appendChild(line);
        return line;
    }
</script>

<section>
    {#each nodes as node}
        <button 
            style:--node-color={node.color} 
            class="node"
            style:left="{node.position[0] + innerWidth / 2}px"
            style:top="{node.position[1] + innerHeight / 2}px"
            style:--text='"{node.text}"'
        ></button>
    {/each}
    <svg bind:this={edges}></svg>
</section> 

<style>
    .node {
        background-color: var(--node-color);
        width: 1rem;
        height: 1rem;
        overflow: visible;
        border-radius: 50%;
        position: absolute;
        display: flex;
        justify-content: center;
        transform: translate(-50%, -50%);
        z-index: 99;

        &::after {
            content: var(--text);
            word-wrap: none;
            white-space: nowrap;
            top: 125%;
            position: absolute;
            color: #a6adc8;
        }
    }

    svg {
        position: absolute;
        width: 100%;
        height: 100%;
        pointer-events: none;
    }

    section {
        position: relative;
        overflow: hidden;
        width: 100%;
        height: 100%;
    }
</style>