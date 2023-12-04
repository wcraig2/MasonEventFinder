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
                    <span class="fav-desc">Add To Favorites</span>
                    <button class="fav-button" id="favorites-button{i}" on:keydown={() => {}} on:click={() => addToFavorites(i)}>
                        <img alt="a star" id="favorites-image" src={star}>
                    </button>
                    <span hidden id="added-favorites-hidden{i}">Added to favorites!</span>
                    <p class="place-name" id="place-name{i}">{p.name}</p>
                    <p class="place-address" id="place-address{i}">{p.address}</p>
                    <p class="place-distance" id="place-distance{i}">
                        Distance from campus: {parseFloat(p.distance.toFixed(2))}
                    </p>
                    <p class="place-wca" id="place-wca{i}">
                        Wheelchair accessible?: { p.wheelchair_accessible ? "Yes" : "No" }
                    </p>
                    <p class="place-url" id="place-url{i}">Maps URL: {p.url}</p>
                    <p class="place-category" id="place-category{i}">Category: {p.category}</p>

                </div>
            </div>
            <hr>
            {/if}
        {/each}
    </div>
</body>