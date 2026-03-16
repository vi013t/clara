<script lang="ts">
	import { bfsTree, type Dataset } from "../../api/tree";

    let { dataset }: { dataset: Dataset } = $props();

    let rows = $derived(bfsTree(dataset.data));
</script>

<div class="columns">
    {#each dataset.fields as field}
        <div class="column">
            <div class="cell"><b>{field.name}</b></div>
            {#each rows as row}
                <div class="cell">
                    {row[field.name]}
                </div>
            {/each}
        </div>
    {/each}
</div>

<style>
    .columns {
        display: flex;
    }

    .column {
        display: flex;
        flex-direction: column;
    }

    .cell {
        color: #cdd6f4;
        border: 1px solid #45475a;
        width: 10rem;
        height: 3rem;
        display: flex;
        align-items: center;
        padding-left: 1rem;
    }
</style>