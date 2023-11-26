<script>
    let searchterms = new URLSearchParams(window.location.search).get("s");
</script>


<title>Search Results</title>
<body style="background-color:rgb(205, 223, 243);">
    <div style="text-align:center; padding:30px" >
        <h2>You searched for: "<span id="searchterms"></span>"</h2>
    </div>
    
    <script>
        document.getElementById('searchterms').innerHTML = searchterms;
    </script>
</body>