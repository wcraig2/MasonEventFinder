<script>
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
                        <span class="fav-desc">Add To Favorites</span>

                        <!-- This button can be tested to see if it indeed adds a favorite to the localStorage. -->
                        <button class="fav-button" id="favorites-button{i}" on:keydown={() => {}} on:click={() => addToFavorites(i)}>
                            <img alt="a star" id="favorites-image" src={star}>
                        </button>
                        <span hidden id="added-favorites-hidden{i}">Added to favorites!</span>

                        <p class="place-name" id="place-name{i}">{p.name}</p>
                        <p class="place-address" id="place-address{i}">{p.address}</p>
                        
                        <span>Distance from campus:</span>
                        <p class="place-distance" id="place-distance{i}">
                            {parseFloat(p.distance.toFixed(2))}
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
            </div>
        {/if}
    {/each}
{/if}