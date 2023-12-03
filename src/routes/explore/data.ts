import placeData from "$lib/place_data.json"

const pageSize = 25;
const numberOfPages = placeData.length / pageSize;

export const slugData = [...Array(numberOfPages).keys()];
