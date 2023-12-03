import { error } from '@sveltejs/kit';
import { slugData } from '../data.js';

export function load({ params }) {
	const pageNumber = slugData.find((i) => i === parseInt(params.slug));

	if (!pageNumber) throw error(404);

	return {
		pageNumber
	};
}