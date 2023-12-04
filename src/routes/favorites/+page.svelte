<script lang="ts">
	import { onMount } from "svelte";
    import { clearSelectedFavorite, clearFavorites, getFavorites, type FavoritePlace} from "$lib/helper_functions.ts"
    
    let favoritePlaces: FavoritePlace[];

    onMount(() => {
        favoritePlaces = getFavorites();
    })
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
                    <p class="place-name" id="place-name{i}">{p.name}</p>
                    <form data-sveltekit-reload class="clear-favorites-form">
                        <button data-sveltekit-reload class="clear-favorites" id="clear-favorites" on:click={() => { clearSelectedFavorite(p.url) }}>
                            Remove From Favorites
                        </button>
                    </form>
                    <p class="place-address" id="place-address{i}">{p.address}</p>
                    
                    <span>Distance from campus:</span>
                    <p class="place-distance" id="place-distance{i}">
                        {p.distance}
                    </p>

                    <span>Wheelchair Accessible?</span>
                    <p class="place-wca" id="place-wca{i}">
                        { p.wheelchair_accessible ? "Yes" : "No" }
                    </p>
                    
                    <span>Maps URL:</span>
                    <p class="place-url" id="place-url{i}">{p.url}</p>
        
                    <span>Category: </span>
                    <p class="place-category" id="place-category{i}">{p.category}</p>

                </div>
            </div>
            <hr>
        {/each}
    {/if}
    
</div>
