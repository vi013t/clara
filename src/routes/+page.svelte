<script>
	import { treeNode } from "../api/tree";
	import BookIcon from "../components/icons/BookIcon.svelte";
	import Editor from "../components/panels/Editor.svelte";
	import Sidebar from "../components/panels/Sidebar.svelte";
	import TreeView from "../components/views/TreeView.svelte";
	import View from "../components/views/View.svelte";
	import Pane from "../components/Pane.svelte";
</script>

<main>
    <Sidebar />
    <Pane tabs={[{ title: "Events", icon: BookIcon }]} width="20rem" background="#181825">
        <View views={["tree", "spreadsheet", "graph"]} view="tree">
            <TreeView tree={
                treeNode("Events", 
                    treeNode("Hook"),
                    treeNode("Inciting Incident"),
                    treeNode("First Plot Point"),
                    treeNode("First Pinch Point"),
                    treeNode("Midpoint"),
                    treeNode("Second Pinch Point"),
                    treeNode("Third Plot Point"),
                    treeNode("Climax"),
                    treeNode("Resolution"),
                )
            }/>
        </View>
    </Pane>
    <Editor title="Hook" />
    <Pane tabs={[{ title: "Notes", icon: BookIcon }]} width="35rem"></Pane>
</main>

<style>
    main {
        width: 100%;
        height: 100%;
        display: flex;
    }
</style>