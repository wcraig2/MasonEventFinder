import { error, redirect } from '@sveltejs/kit';
import placeData from "$lib/place_data.json";
import leven from "fast-levenshtein";
import type { FavoritePlace } from '$lib/helper_functions.js';

const DISTANCE_THRESHOLD = 3;

export function load({params}) {
    const searchTerm = params.slug;
    const places: FavoritePlace[] = []
    for (let place of placeData) {
        const splitPlaceName = place.name.split(" ");
        const splitSearchTerm = searchTerm.split(" ");
        let shouldBreak = false;
        
        for (const subSearchTerm of splitSearchTerm) {
            for (const subPlaceName of splitPlaceName) {
                if (leven.get(subSearchTerm.toLowerCase(), subPlaceName.toLowerCase(), { useCollator: true}) < DISTANCE_THRESHOLD) {
                    places.push(place);
                    shouldBreak = true;
                    break;
                } else if (subPlaceName.indexOf(subSearchTerm) !== -1) {
                    places.push(place);
                    break;
                }
            }

            if (shouldBreak) {
                break;
            }
        }  
    }

    return {
        searchTerm: searchTerm,
        places: places,
    }
}