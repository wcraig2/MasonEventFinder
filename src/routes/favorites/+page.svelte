<script lang="ts">
	import { onMount } from "svelte";
    import { clearSelectedFavorite, clearFavorites, getFavorites, type FavoritePlace} from "$lib/helper_functions.ts"
    
    let favoritePlaces: FavoritePlace[];

    onMount(() => {
        favoritePlaces = getFavorites();
    });
</script>

<div class="results-block">
    <div class="favorites-header">
        Your Favorited Locations
    </div>
    <hr>

    <form data-sveltekit-reload class="clear-favorites-form">
        <button data-sveltekit-reload class="clear-favorites" id="clear-favorites" on:click={clearFavorites}>
            Clear Favorites
        </button>
    </form>

    {#if favoritePlaces == null || favoritePlaces.length == 0}
        <div class="no-favorites-block">
            <p class="no-favorites-message">You don't have any favorites at the moment.</p>
        </div>
    {:else}
        {#each favoritePlaces as p, i}
            <div class="place-block">
                <div class="place-content" id="place{i}">
                    <form data-sveltekit-reload class="clear-selected-favorite-form">
                        <button data-sveltekit-reload class="clear-selected-favorite" id="clear-selected-favorite" on:click={() => {clearSelectedFavorite(p.url)}}>
                            Remove
                        </button>
                    </form>
                    
                    <h3 class="place-name" id="place-name{i}"><a href="{p.url}">{p.name}</a></h3>
					<p class="place-category" id="place-category{i}"><a href="/places?category={p.category}">{p.category}</a></p>
                    <hr>
                    <p class="place-address" id="place-address{i}"><b>{p.address}</b></p>
                    <p class="place-distance" id="place-distance{i}">
                        Distance from Campus: {p.distance} miles
                    </p>
                    <p class="place-wca" id="place-wca{i}">
                        { p.wheelchair_accessible ? "Wheelchair Accessible?: Yes" : "Wheelchair Accessible?: No" }
                    </p>
                </div>
            </div>
        {/each}
    {/if}
    
</div>
