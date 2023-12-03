<script lang="ts">
    import placeData from "$lib/place_data.json";
    import star from "$lib/star-small.png";

    export let data;
    
    const chunks = [];
    
    for (let i = 0; i < numberOfChunks; i++) {
        
    }

    function addToFavorites() {
        
    }

</script>


<body>
    <div class="results-block">
        {#each places as p, i}
            {#if i <= numberOfChunks}
            <div class="place-block">
                <div class="place-content" id="place{i}">
                    <span class="fav-desc">Add To Favorites</span>
                    <img alt="fav-button" id="favorites-button" src={star} on:keydown={() => {}} on:click={addToFavorites}>
                    <p class="place-name">{p.name}</p>
                    <p class="place-address">{p.address}</p>
                    <p class="place-distance">
                        Distance from campus: {parseFloat(p.distance.toFixed(2))}
                    </p>
                    <p class="place-wca">
                        Wheelchair accessible?: { p.wheelchair_accessible ? "Yes" : "No" }
                    </p>
                    <p class="place-url">{p.url}</p>
                    <p class="place-category">{p.category}</p>

                </div>
            </div>
            <hr>
            {/if}
        {/each}

        <div class="display-inline-flex pagination-container">
            <ul class="pagination">
                {#each chunks as c}
                    {#if c == currentChunk}
                        <li class="active-page">
                            <span>{c+1}&nbsp;</span>
                        </li>
                    {:else}
                        <li>
                            <a href="/explore/{data.slug[c]}">{c+1}&nbsp;</a>
                        </li>
                    {/if}
                {/each}
            </ul>
        </div>
    </div>
</body>