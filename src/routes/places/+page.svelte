<script lang="ts">
    import placeData from "$lib/place_data.json";
    import star from "$lib/images/star.png";
    import {addToFavorites} from "$lib/helper_functions.ts";
	import { page } from '$app/stores';

    export let data;
    
    const chunkSize = 25;
    const numberOfChunks = placeData.length / chunkSize;
    const chunks = [];
    for (let i = 0; i < numberOfChunks; i++) {
        chunks.push(i);
    }

    const currentChunk = data.slug[0];
    const startingChunk = currentChunk;
    const places = placeData.slice(startingChunk * chunkSize, (startingChunk+1) * chunkSize);
	
    const category = $page.url.searchParams.get('category');
    const hasCategory = $page.url.searchParams.has('category');
    const distance = $page.url.searchParams.get('distance');
    const hasDistance = $page.url.searchParams.get('distance');
</script>


<body>
	{#if !hasCategory && !hasDistance} 
    <div class="display-inline-flex pagination-container">
        <ul class="pagination">
            {#each chunks as c}
                {#if c == currentChunk}
                    <li class="active-page">
                        <span>{c+1}&nbsp;</span>
                    </li>
                {:else}
                    <li>
                        <a href="/places/{data.slug[c]}">{c+1}&nbsp;</a>
                    </li>
                {/if}
            {/each}
        </ul>
    </div>
	{/if}

    
    {#each places as p, i}
        <div class="results-block">
			{#if !hasCategory || category == p.category}
			{#if !hasDistance || distance >= p.distance}
            {#if !hasCategory && !hasDistance && i <= numberOfChunks}
            <div class="place-block">
                <div class="place-content" id="place{i}">
                    <button class="fav-button alignright" id="favorites-button{i}" on:keydown={() => {}} on:click={() => addToFavorites(i)}>
                        <img alt="Add to Favorites" id="favorites-image" src={star}>
                    </button>
                    <span hidden id="added-favorites-hidden{i}" class="alignright">Added to favorites!</span>
                    <h3 class="place-name" id="place-name{i}"><a href="{p.url}">{p.name}</a></h3>
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
            {/if}
            {/if}
        </div>
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
                        <a href="/places/{data.slug[c]}">{c+1}&nbsp;</a>
                    </li>
                {/if}
            {/each}
        </ul>
    </div>
    
</body>