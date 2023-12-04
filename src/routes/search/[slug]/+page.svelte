<script lang="ts">
    import star from "$lib/images/star.png";
    import {addToFavorites} from "$lib/helper_functions.ts";

    export let data;

    $: places = data.places;

    const limit = 100;
</script>


<div class="search-result-title">
    <p>Search Results</p>
</div>

<div id="search-results-block">
    <div style="text-align:center; padding:30px" >
        <h2>You searched for: {data.searchTerm}</h2>
    </div>
</div>

<!-- <div class="filter-presets-block">
    <form data-sveltekit-reload>
        <input  
            bind:value={distanceFilterValue} 
            class="filter-preset-distance-button" 
            on:keydown={filterPlacesByDistance}
            placeholder="Dist. (mi)">
    </form>
</div> -->

{#if places.length == 0}
    <div class="results-block">
        No results. Try searching again.
    </div>
{:else}
    {#each places as p, i}
        {#if i < limit}
            <div class="results-block">
                <div class="place-block">
					<div class="place-content" id="place{i}">
						<button class="fav-button alignright" id="favorites-button{i}" on:keydown={() => {}} on:click={() => addToFavorites(i)}>
							<img alt="Add to Favorites" id="favorites-image" src={star}>
						</button>
						<span hidden id="added-favorites-hidden{i}" class="alignright">Added to favorites!</span>
						<h3 class="place-name" id="place-name{i}"><a href="{p.url}">{p.name}</a></h3>
                        <span id="place-url{i}" style="display:none">{p.url}</span>
						<p class="place-category" id="place-category{i}"><a href="/places?category={p.category}">{p.category}</a></p>
						<hr>
						<p class="place-address" id="place-address{i}"><b>{p.address}</b></p>
						<p class="place-distance" id="place-distance{i}">
							Distance from Campus: {parseFloat(Number(p.distance).toFixed(2))} miles
						</p>
						<p class="place-wca" id="place-wca{i}">
							{ p.wheelchair_accessible ? "Wheelchair Accessible?: Yes" : "Wheelchair Accessible?: No" }
						</p>
					</div>
				</div>
            </div>
        {/if}
    {/each}
{/if}