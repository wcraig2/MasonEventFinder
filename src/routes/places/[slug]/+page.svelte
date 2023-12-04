<script lang="ts">
    import placeData from "$lib/place_data.json";
    import star from "$lib/images/star.png";
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
							Distance from Campus: {parseFloat(p.distance.toFixed(2))} miles
						</p>
						<p class="place-wca" id="place-wca{i}">
							Wheelchair Accessible?: { p.wheelchair_accessible ? "Yes" : "No" }
						</p>
					</div>
				</div>
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