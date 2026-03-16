import BookIcon from "../components/icons/BookIcon.svelte";
import { treeNode, type DataRow, type Dataset } from "./tree";

type Project = {
	datasets: Dataset[];
};

let currentProject: Project = $state({
	datasets: [
		{
			name: "Plot Events",
			icon: BookIcon,
			data: treeNode<DataRow>({ "Name": "Plot Events" }, 
				treeNode({ "Name": "Act I" },
					treeNode({"Name": "Hook" }),
					treeNode({"Name": "Inciting Incident" }),
					treeNode({"Name": "First Plot Point" })
				),
				treeNode({ "Name": "Act II" },
					treeNode({"Name": "First Pinch Point" }),
					treeNode({"Name": "Midpoint" }),
					treeNode({"Name": "Second Pinch Point" })
				),
				treeNode({ "Name": "Act III" },
					treeNode({"Name": "Third Plot Point" }),
					treeNode({"Name": "Climax" }),
					treeNode({"Name": "Resolution" })
				)
			),
			fields: [
				{ name: "Name", ValueType: "text" },
				{ name: "Script", ValueType: "text" }
			]
		},
	],
});

export function project() {
	return currentProject;
}
