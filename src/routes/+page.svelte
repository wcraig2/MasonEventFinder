<!--Site Name-->
<title>GMU Entertainment Finder</title>

<!--Top Bar-->
<div style= "margin: 10px">
    <!--GMU Logo-->
    <img alt="mason logo" style="width:100px; display:inline-block; margin-right:10px;" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/George_Mason_University_logo.svg/1024px-George_Mason_University_logo.svg.png"/>
    <!--Site Header-->
    <h1 style="color:#006233; font-family:Verdana; text-align:center; display:inline-block;">Entertainment Finder</h1>
    <!--Search Bar-->
    <div style="display:inline-block; overflow:hidden; border:none; margin-top:40px; margin-right:16px; float:right;">
        <input type="text" style="font-size:17px; font-family:Sans-Serif; width:300px; height:30px;" placeholder="Search for events...">
    </div>
</div>

<div style = "display: flex; flex-direction: row;">
    <!--Options Bar-->
    <div style="float:left; width:25%; text-align:center; margin-bottom:10px; justify-content: left; display: flex; flex-direction: column; flex-wrap: wrap; white-space: nowrap;">
        <button class="tablink" style="font-family:Sans-Serif; padding:8px; font-size:15px; border:none; background-color:#006233; color:white; border: 1px solid green;">Nearby Events</button>
        <button class="tablink" style="font-family:Sans-Serif; padding:8px; font-size:15px; border:none; background-color:#006233; color:white; border: 1px solid green;">Nearby Places</button>
        <button class="tablink" style="font-family:Sans-Serif; padding:8px; font-size:15px; border:none; background-color:#006233; color:white; border: 1px solid green;">Favorites</button>
        <button class="tablink" style="font-family:Sans-Serif; padding:8px; font-size:15px; border:none; background-color:#006233; color:white; border: 1px solid green;">Popular Events</button>
        <button class="tablink" style="font-family:Sans-Serif; padding:8px; font-size:15px; border:none; background-color:#006233; color:white; border: 1px solid green;">Suggestions</button>
        <button class="tablink" style="font-family:Sans-Serif; padding:8px; font-size:15px; border:none; background-color:#006233; color:white; border: 1px solid green;">My Profile</button>
    </div>

    <!--Map-->
    <div style="; width:75%; height:750px; border:none; padding:none;">
        <iframe title = "Map" src="https://storage.googleapis.com/maps-solutions-q9m38c7ts5/neighborhood-discovery/snel/neighborhood-discovery.html"
        width="100%" height="100%"
       style="border:0;"
       loading="lazy">
  </iframe>
    </div>
</div>