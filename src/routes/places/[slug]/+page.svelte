<script lang="ts">
    import placeData from "$lib/place_data.json";
    import star from "$lib/star-small.png";
    import {addToFavorites} from "$lib/helper_functions.ts"

    export let data;
    
    const chunkSize = 25;
    const numberOfChunks = placeData.length / chunkSize;
    const chunks = [...Array(numberOfChunks).keys()];

    let currentChunk = data.pageNumber;
    let startingChunk = currentChunk;
    let places = placeData.slice(startingChunk * chunkSize, (startingChunk+1) * chunkSize);
</script>


<body>

    <!-- 
        Here a test can be performed to assert if, by visiting /places/0, the code will successfully
        redirect back to the /places route.
     -->

     <!-- TODO: These can be put into their own components, if we have time. Otherwise just roll with it. -->
    <div class="display-inline-flex pagination-container">
        <ul class="pagination">
            {#each chunks as c}
                {#if c == currentChunk}
                    <li class="active-page">
                        <span>{c+1}&nbsp</span>
                    </li>
                {:else}
                    {#if c == 0}
                        <li data-sveltekit-reload>
                            <a href="/places">{c+1}&nbsp</a>
                        </li>
                    {:else}
                        <li data-sveltekit-reload>
                            <a href="/places/{c}">{c+1}&nbsp</a>
                        </li>
                    {/if}
                {/if}
            {/each}
        </ul>
    </div>

    {#each places as p, i}
        <div class="results-block">
            {#if i <= numberOfChunks}
                <div class="place-block">
                    <div class="place-content" id="place{i}">
                        <span class="fav-desc">Add To Favorites</span>
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
            {/if}
        </div>
    {/each}

    <div class="display-inline-flex pagination-container">
        <ul class="pagination">
            {#each chunks as c}
                {#if c == currentChunk}
                    <li class="active-page">
                        <span>{c+1}&nbsp</span>
                    </li>
                {:else}
                    {#if c == 0}
                        <li data-sveltekit-reload>
                            <a href="/places">{c+1}&nbsp</a>
                        </li>
                    {:else}
                        <li data-sveltekit-reload>
                            <a href="/places/{c}">{c+1}&nbsp</a>
                        </li>
                    {/if}
                {/if}
            {/each}
        </ul>
    </div>

</body>