<script lang="ts">
	export let data;
	
	// Demo of printing out the users returned from the 
	// "load" function in the page.server.ts file.
	for (const user in data.users) {
		console.log(user);
	}

</script>

<!--Map-->
<div style="; width:75%; height:750px; border:none; padding:none;">
	<iframe title = "Map" src="https://storage.googleapis.com/maps-solutions-q9m38c7ts5/neighborhood-discovery/snel/neighborhood-discovery.html"
	width="100%" height="100%"
   style="border:0;"
   loading="lazy">
</iframe>
</div>
<!--Map (Figure out how to make this more responsive to screen resizing, possibly using js since css seems to not work too well)-->
<div style="height:750px">
	<iframe title="Embedded Google Maps" style="border:none; width:100%; height:100%; margin:0; padding:0;" align="center"
	src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d6216.191630719143!2d-77.30680390030386!3d38.83026643606803!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1696535802736!5m2!1sen!2sus">
	</iframe>
</div>
