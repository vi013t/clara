<script>
	import { linearGraph } from "../../api/graph";
	import NodeView from "./NodeView.svelte";

</script>

<div class="acts" style:left="{-558 + innerWidth / 2}px">
    <span>Act I</span>
    <span>Act II</span>
    <span>Act III</span>
</div>

<NodeView graph={linearGraph(
    { text: "Hook", position: [-600, 0] },
    { text: "Inciting Incident", position: [-450, 0] },
    { text: "First Plot Point", position: [-300, 0] },
    { text: "First Pinch Point", position: [-150, 0] },
    { text: "Midpoint", position: [0, 0] },
    { text: "Second Pinch Point", position: [150, 0] },
    { text: "Third Plot Point", position: [300, 0] },
    {text: "Climax", position: [450, 0] },
    { text: "Resolution", position: [600, 0] }
)}/>

<style>
    .acts {
        position: absolute;
        display: grid;
        grid-template-columns: 1fr 2fr 1fr;
        width: 1200px;
        height: 500px;
        top: 175px;

        > * {
            color: #585b70;
            display: flex;
            justify-content: center;
            font-size: 3rem;
            border-right: 1px solid #313244;
            border-left: 1px solid #313244;
            padding-top: 50px;
        }
    }
</style>