<script>
	import FolderIcon from "../icons/FolderIcon.svelte";
	import GearIcon from "../icons/GearIcon.svelte";
	import QuestionMarkIcon from "../icons/QuestionMarkIcon.svelte";
</script>
<nav>
    <button>
        <FolderIcon stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
    </button>
    <button>
        <GearIcon stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
    </button>
    <button>
        <QuestionMarkIcon stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
    </button>
</nav>

<style>
    nav {
        width: 100%;
        height: 3rem;
        background-color: #11111b;
        display: flex;
        align-items: center;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        gap: 0.5rem;
        border-bottom: 1px solid #313244;

        > * {
            color: #cdd6f4;
            display: flex;
            border-radius: 0.25rem;
            font-size: 0.8rem;
            padding: 0.25rem;
            --stroke: #cdd6f4;

            &:hover {
                background-color: #b4befe;
                color: #181825;
                --stroke: #181825;
            }
        }
    }
</style>