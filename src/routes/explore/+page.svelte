<script lang="ts">
    import placeData from "$lib/place_data.json";
    import star from "$lib/images/star.png";
    import {addToFavorites} from "$lib/helper_functions.ts"

    export let data;
    
    const chunkSize = 10;
    const numberOfChunks = placeData.length / 10;

    let rs1 = Math.floor(Math.random() * (numberOfChunks-1));
    let rs2 = rs1 + 1;
    
    let randomPlaces = placeData.slice(rs1*chunkSize, rs2*chunkSize);

</script>


<body>
    <div class="results-block">
        {#each randomPlaces as p, i}
            {#if i <= numberOfChunks}
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
                        { p.wheelchair_accessible ? "Wheelchair Accessible?: Yes" : "Wheelchair Accessible?: No" }
                    </p>
                </div>
            </div>
            {/if}
        {/each}
    </div>
</body>