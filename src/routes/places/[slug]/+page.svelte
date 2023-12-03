<script lang="ts">
    import placeData from "$lib/place_data.json";

    export let data;
    
    const chunkSize = 25;
    const numberOfChunks = placeData.length / chunkSize;
    const chunks = [...Array(numberOfChunks).keys()];

    let currentChunk = data.pageNumber;
    let startingChunk = currentChunk;
    let places = placeData.slice(startingChunk * chunkSize, (startingChunk+1) * chunkSize);
    
    console.log(currentChunk);
    console.log(startingChunk);
    console.log(places);

</script>


<body>
    <div class="display-inline-flex pagination-container">
        <ul class="pagination">
            {#each chunks as c}
                {#if c == currentChunk}
                    <li class="active-page">
                        <span>{c+1}&nbsp</span>
                    </li>
                {:else}
                    <li data-sveltekit-reload>
                        <a href="/places/{c}">{c+1}&nbsp</a>
                    </li>
                {/if}
            {/each}
        </ul>
    </div>
    
    <div class="results-block">
        {#each places as p, i}
            {#if i <= numberOfChunks}
            <div class="place-block">
                <div class="place-content">
                    <p class="place-name">{p.name}</p>
                    <p class="place-address">{p.address}</p>
                    <p class="place-distance">
                        Distance from campus: {parseFloat(p.distance.toFixed(2))}
                    </p>s
                    <p class="place-wca">
                        Wheelchair accessible?: {p.wheelchair_accessible ? "Yes" : "No"}
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
                            <span>{c+1}&nbsp</span>
                        </li>
                    {:else}
                        <li data-sveltekit-reload>
                            <a href="/places/{c}">{c+1}&nbsp</a>
                        </li>
                    {/if}
                {/each}
            </ul>
        </div>
    </div>
</body>