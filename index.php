<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">

  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
  <link rel="apple-touch-icon" href="./images/hops-logo.png">
  <meta name="apple-mobile-web-app-capable" content="yes">

  <title>Beerfest 2016</title>
  <script src="/js/jquery/jquery-2.1.4.min.js"></script>
  <script src="/js/moment/moment.min.js"></script>
  <script src="/lib/vuejs/vue-1024.js"></script>
  <script src="/lib/vuejs/vue-utils.js"></script>
  <script src="/lib/vuejs/vue-moment.min.js"></script>
  <script src="/lib/vuejs/vue-resource.min.js"></script>
  <script src="/lib/vuejs/vue-router.min.js"></script>
  <!-- <script src="/lib/vuejs/vue-animated-list.js"></script> -->
  <link href="/lib/bootstrap335/css/bootstrap.min.css" rel="stylesheet">
  <link href="/lib/fontawesome/css/font-awesome.min.css" rel="stylesheet">
  <link href="animate.min.css" rel="stylesheet">
  <link href="beerfest.css?456" rel="stylesheet">
  <script src="/lib/bootstrap335/js/bootstrap.min.js"></script>
  <script src="/lib/fastclick/lib/fastclick.js"></script>
  <script src="/js/underscore/underscore-183.min.js"></script>
  <script src="/js/notify/notify.min.js"></script>
  <script src="beerfest.js"></script>
  <script src="beerfest-utils.js"></script>
</head>

<body>
  <template id="nav-bar"><?php include("templates/nav-bar.html") ?></template>
  <template id="beer-list"><?php include("templates/beer-list.html") ?></template>
  <template id="my-beer-list"><?php include("templates/my-beer-list.html") ?></template>
  <template id="app-footer"><?php include("templates/app-footer.html") ?></template>
  <template id="about-beerfest"><?php include("templates/about-beerfest.html") ?></template>

  <div id="app" class="container-fluid">
    <nav-bar></nav-bar>
    <router-view></router-view>
    <app-footer></app-footer>
  </div>

  <!--
  <script src="https://www.gstatic.com/firebasejs/live/3.0/firebase.js"></script>
  <script>
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyAfI0uUMcePv5wHEUdFqR86JIzAa6Bu4FU",
      authDomain: "beerfest-3cfdf.firebaseapp.com",
      databaseURL: "https://beerfest-3cfdf.firebaseio.com",
      storageBucket: "beerfest-3cfdf.appspot.com",
    };
    firebase.initializeApp(config);
  </script>
  -->

</body>
</html>
      <!-- <template id="search-beers"><?php // include("templates/search-beers.html") ?></template> -->
      <!-- <beer-list :beers-data="beersData" :my-beers="myBeers"></beer-list> -->
      <!-- <my-beer-list :my-beers="myBeers"></my-beer-list> -->