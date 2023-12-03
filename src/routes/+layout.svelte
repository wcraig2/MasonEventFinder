<script>
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { webVitals } from '$lib/vitals';
	import './style.css';
	// import './black-blue.css';
	import './map.css';
	import Map from '$lib/Map.svelte';

	import sun from "$lib/images/sun.png";
	import moon from "$lib/images/moon.png";


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
</script>



<title>GMU Entertainment Finder</title>
<div class="container-fluid">
	<div class="row">
		<div class="col-2">
			<!--Sidebar-->
			<div class="sidebar">
				<a href="/explore" class="main-menu-item menu-item menu-item-div">Explore</a>
				<!-- <div class="menu-div">
					<a href="about:blank" class="menu-item">Example Menu Item</a>
				</div> -->
				<div class="menu-bar" />
				<a href="/places" class="main-menu-item menu-item menu-item-div">Places</a>
				<div class="menu-bar" />
				<a href="/favorites" class="main-menu-item menu-item menu-item-div">Favorites</a>
				<div class="menu-bar" />
				<div class="search">
					<form method="get" action="src\routes\search\+page.svelte">
						<input type="text" placeholder="Search and hit enter..." name="s" class="search-form" required/>
					</form>
				</div>
				<div class="toggler aligncenter">
					<img src={imagePath} class="clickable" id="icon" on:click={handleClick} />
				</div>
			</div>
		</div>
		<div class="col-1" />
		<!--MAIN CONTENT-->
		<div id="content" class="col-6">
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
						<h1>Entertainment Finder</h1>
					</div>
				</div>
				<br>
				<main>
					<slot />
				</main>
			</div>
			<div class="col-1" />
		</div>
	</div>
</div>
