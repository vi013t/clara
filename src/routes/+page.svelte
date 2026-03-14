<script>
	import { treeNode } from "../api/tree";
	import BookIcon from "../components/icons/BookIcon.svelte";
	import CharacterView from "../components/panels/CharacterView.svelte";
	import Editor from "../components/panels/Editor.svelte";
	import Navbar from "../components/panels/Navbar.svelte";
	import Panel from "../components/panels/Panel.svelte";
	import Sidebar from "../components/panels/Sidebar.svelte";
	import ThreeActStructure from "../components/views/ThreeActStructure.svelte";
	import TreeView from "../components/views/TreeView.svelte";
	import View from "../components/views/View.svelte";
</script>

<main>
    <Navbar />
    <div>
        <Sidebar />
        <View>
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
        <Editor title="Hook" />
        <Panel title="Notes" width="35rem"></Panel>
    </div>
</main>

<style>
    main {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;

        > div {
            display: flex;
            height: 100%;
            width: fit-content;
        }
    }
</style>