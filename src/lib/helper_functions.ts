
import {writable} from "svelte/store";
import {browser} from "$app/environment";

// Only purpose of this is to get rid of annoying type errors
// when trying to access the fields of this object.
export interface FavoritePlace {
    name: string,
    address: string,
    distance: string,
    category: string,
    wheelchair_accessible: boolean,
    url: string,
};

export function clearFavorites() {
    const user = writable(browser);
    user.subscribe((value) => {
        if (browser) {
            localStorage.clear();
        }
    })
}

export function clearSelectedFavorite(placeUrl: string) {
    const user = writable(browser);
    user.subscribe((value) => {
        if (browser) {
            localStorage.removeItem(placeUrl);
        }
    })
}

export function addToFavorites(idNum: number) {
    console.log("in browser?: " + String(browser));
    const user = writable(browser);

    const addedFavoriteText = document.getElementById(`added-favorites-hidden${idNum}`);
    addedFavoriteText.hidden = false;
    const placeName = document.getElementById(`place-name${idNum}`);
    const placeAddress = document.getElementById(`place-address${idNum}`);
    const placeDistance = document.getElementById(`place-distance${idNum}`);
    const placeWca = document.getElementById(`place-wca${idNum}`);
    const placeUrl = document.getElementById(`place-url${idNum}`);
    const placeCategory = document.getElementById(`place-category${idNum}`);
    const favoritesObject = {
        "name": placeName.innerText,
        "address": placeAddress.innerText,
        "category": placeCategory.innerText,
        "distance": placeDistance.innerText,
        "wheelchair_accessible": placeWca.innerText,
        "url": placeUrl.innerText,
    }

    const favoritesObjectString = JSON.stringify(favoritesObject);
    user.subscribe((value) => {
        if (browser) {
            localStorage.setItem(`${placeUrl.innerText}`, favoritesObjectString);
        }
    });
}

export function getFavorites(): FavoritePlace[] {
    const items = [];
    
    for (let key in window.localStorage) {
        if (!window.localStorage.getItem(key)) {
            continue;
        }
        const parsed = JSON.parse(window.localStorage.getItem(key));
        items.push(parsed);
    }

    console.log(items);
    
    return items;
}