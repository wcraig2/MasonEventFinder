<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { webVitals } from '$lib/vitals';
	import './style.css';
	// import './black-blue.css';
	import './map.css';

	import sun from "$lib/images/sun.png";
	import moon from "$lib/images/moon.png";
	import { redirect } from '@sveltejs/kit';
	import { goto } from '$app/navigation';


	/** @type {import('./$types').LayoutServerData} */
	export let data;

	$: if (browser && data?.analyticsId) {
		webVitals({
			path: $page.url.pathname,
			params: $page.params,
			analyticsId: data.analyticsId
		});
	}

	const setTheme = (theme) => {
		document.documentElement.dataset.theme = theme;
		document.cookie = 'siteTheme = ${theme}';
	};

	let imagePath = sun;
	function handleClick() {
		if (imagePath === sun) {
			imagePath = moon;
			setTheme('dark');
		} else {
			imagePath = sun;
			setTheme('light');
		}
	}

	let searchTerms: string;

	// Another test can be performed here to see if typing in something into the search bar
	// and pressing the enter key works as expected.
	async function handleSearchSubmit(e: KeyboardEvent) {
		if (e.key === "Enter") {
			searchTerms = searchTerms.trim();
			if (searchTerms.length > 0) {
				await goto(`/search/${searchTerms}`);
				searchTerms = "";
			}
		}
	}
</script>



<title>GMU Entertainment Finder</title>
<div class="container-fluid">
	<div class="row">
		<div class="col-3 col-md-2">
			<!--Sidebar-->
			<div class="sidebar">
				<a href="/places" class="main-menu-item menu-item menu-item-div">Places</a>
				<!-- <div class="menu-div">
					<a href="about:blank" class="menu-item">Example Menu Item</a>
				</div> -->
				<div class="menu-bar" />
				<a href="/explore" class="main-menu-item menu-item menu-item-div">Explore</a>
				<div class="menu-bar" />
				<a href="/favorites" class="main-menu-item menu-item menu-item-div">Favorites</a>
				<div class="menu-bar" />
				<div class="search">
					<input
						bind:value={searchTerms} 
						type="text" 
						placeholder="Search and hit enter..." 
						name="search-form" 
						class="search-form" 
						on:keypress={handleSearchSubmit}
						required
					/>
				</div>
				<div class="toggler aligncenter">
					<img alt="a sun" src={imagePath} class="clickable" id="icon" on:keydown={() => {}} on:click={handleClick} />
				</div>
			</div>
		</div>
		<div class="col-0 col-md-1" />
		<!--MAIN CONTENT-->
		<div id="content" class="col-9 col-md-6">
			<!--Top Bar-->
			<div>
				<div class="row">
					<div class="col-3">
						<a href="/"><img
							alt="mason logo"
							style="width:100%"
							src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/George_Mason_University_logo.svg/1024px-George_Mason_University_logo.svg.png"
						/></a>
					</div>
					
					<div class="col-9">
						<br>
						<h1><a href="/">Entertainment Finder</a></h1>
					</div>
				</div>
				<br>
				<main>
					<slot />
				</main>
			</div>
			<div class="col-0 col-md-1" />
		</div>
	</div>
</div>
