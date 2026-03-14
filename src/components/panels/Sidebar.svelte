<script>
	import BookIcon from "../icons/BookIcon.svelte";
	import CalendarIcon from "../icons/CalendarIcon.svelte";
	import ClockIcon from "../icons/ClockIcon.svelte";
	import LocationIcon from "../icons/LocationIcon.svelte";
	import PersonIcon from "../icons/PersonIcon.svelte";

</script>
<section>
    <button>
        <BookIcon stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
    </button>
    <button>
        <PersonIcon stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
    </button>    
    <button>
        <LocationIcon stroke="var(--stroke)" style="width: 1.25rem; height: 1.25rem;" />
    </button>
    <button>
        <CalendarIcon stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
    </button>
    <button>
        <ClockIcon stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
    </button>
</section>

<style>
    section {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        border-right: 1px solid #313244;
        background: #181825;
        width: 3rem;
        gap: 0.5rem;
        padding-top: 0.5rem;

        > * {
            border-radius: 0.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 1.75rem;
            height: 1.75rem;

            &:hover {
                background-color: #b4befe;
                --stroke: #181825;
            }

            &:not(:hover) {
                --stroke: #9399b2;
            }
        }
    }
</style>