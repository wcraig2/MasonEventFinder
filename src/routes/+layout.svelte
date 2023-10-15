<script>
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { webVitals } from '$lib/vitals';
	import './style.css';
	import './black-blue.css';
	import './map.css';

	/** @type {import('./$types').LayoutServerData} */
	export let data;

	$: if (browser && data?.analyticsId) {
		webVitals({
			path: $page.url.pathname,
			params: $page.params,
			analyticsId: data.analyticsId
		});
	}
</script>
<title>GMU Entertainment Finder</title>
<!--Top Bar-->
<div>
	<!--GMU Logo MAKE CLASS FOR THESE LATER-->
	<img alt="mason logo" style="width:100px; display:inline-block; margin-right:10px;" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/George_Mason_University_logo.svg/1024px-George_Mason_University_logo.svg.png"/>
	<!--Site Header-->
	<h1>Entertainment Finder</h1>
</div>
<div id="content" class="container-fluid">
	<div class="row">
		<div class="col-xs-2">
			<!--Sidebar-->
			<div class="sidebar">
				<a class="main-menu-item menu-item menu-item-div">Nearby Events</a>
				<div class="menu-div">
					<a href="about:blank" class="menu-item">Example Menu Item</a>
				</div>
				<div class="menu-bar"></div>
				<a class="main-menu-item menu-item menu-item-div">Nearby Places</a>
				<div class="menu-bar"></div>
				<a class="main-menu-item menu-item menu-item-div">Favorites</a>
				<div class="menu-bar"></div>
				<a class="main-menu-item menu-item menu-item-div">Popular Events</a>
				<div class="menu-bar"></div>
				<a class="main-menu-item menu-item menu-item-div">Suggestions</a>
				<div class="menu-bar"></div>
				<a class="main-menu-item menu-item menu-item-div">My Profile</a>
				<div class="menu-bar"></div>
				<div class="search">
					<form method="get" action="about:blank">
						<input type="text" placeholder="Search and hit enter..." name="s" class="search-form">
					</form>
				</div>
			</div>
		</div>
		<div class="col-xs-1"></div>
		<div class="col-xs-6">
			<main>
				<slot />
			</main>
		</div>
		<div class="col-xs-1"></div>
	</div>
</div>
