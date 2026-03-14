<script>
	import BookIcon from "../icons/BookIcon.svelte";
	import CalendarIcon from "../icons/CalendarIcon.svelte";
	import ClockIcon from "../icons/ClockIcon.svelte";
	import LocationIcon from "../icons/LocationIcon.svelte";
	import PersonIcon from "../icons/PersonIcon.svelte";
	import CircledPlusIcon from "../icons/CircledPlusIcon.svelte";
</script>

<section>
    <div class="buttons">
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
        <button>
            <CircledPlusIcon stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
        </button>
    </div>
</section>

<style>
    section {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        width: 3rem;
        padding-top: 3rem;
        background-color: #11111b;

        .buttons {
            gap: 0.5rem;
            padding-top: 0.5rem;
            background: #181825;
            border-right: 1px solid #313244;
            border-top: 1px solid #313244;
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            height: 100%;

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
    }
</style>