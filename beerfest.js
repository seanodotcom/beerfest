// console.log("JS loaded");
var App = {};
// global store object
var store = {
  state: {
      transitionName : 'bounce',
      allBeers       : []
  },
  setAllBeers: function (data) {
  	this.state.allBeers = data;
  },
  getAllBeers: function () {
  	return this.state.allBeers;
  },
  updateBeers: function() {
  	// console.log('in updateBeers()');
  	var storageBeers = JSON.parse(localStorage.getItem('myBeers')) || [];
  	var myBeerCount = 0;
	for(var i = 0, l = this.state.allBeers.length; i < l; i++) {
		this.state.allBeers[i].myBeer = false;
		if (storageBeers.length) {
		    for(var j = 0, ll = storageBeers.length; j < ll; j++) {
		        if(this.state.allBeers[i].beerName === storageBeers[j].beerName) {
		            this.state.allBeers.splice(i, 1, storageBeers[j]);
		            myBeerCount += 1;
		            break;
		        }
		    }
		}
	}
	// console.log('Completed updateBeers()', myBeerCount); //, this.state.allBeers[0].beerName, this.state.allBeers[0].myBeer);
  } // updateBeers()
};

$(document).ready(function() {
	// FastClick.attach(document.body);

	var NavBar = Vue.extend({ template: '#nav-bar' });
	var AppFooter = Vue.extend({ template: '#app-footer' });
	var AboutBeerfest = Vue.extend({ template: '#about-beerfest' });

	Vue.transition('bounce', {
		css: true,
		enterClass: '',
		leaveClass: 'bounceOutLeft',
		type: 'animation',  // required for animate.css!
	});  // SHOWTIME: hinge

	var MyBeerList = Vue.extend({
		template: '#my-beer-list',
	    // transitionName: 'expand',
		ready: function() {
			// console.log("MyBeerList.ready() ");
		},
	    data: function () {
	    	return {
				allBeers    : store.state.allBeers,
				myBeers     : JSON.parse(localStorage.getItem('myBeers')) || []
			}
	    },
	    events: {
	    	beerRemoved: function(beer) {
	    		// console.log(beer.beerName + ' has been removed.');
	    		// TODO: Conflicts with jQuery remove (double)
	    		this.$set('myBeers', JSON.parse(localStorage.getItem('myBeers')) || []);
	    		store.updateBeers();
	    		// debugger;
	    	}
	    },
	    methods: {
	    	removeLocal: function(beer) {
	    		// console.log('removeLocal()');
	    		// send dispatched remove event // console.log(beer.beerName);
	    		this.$dispatch('removeFromMyBeersEvent', beer);
	    		// this.myBeers.$remove(beer);
	    		// debugger;
	    		// this.$nextTick(function() {
	    		// 	localStorage.setItem('myBeers', JSON.stringify(this.myBeers));
	    		// 	store.updateBeers();
		    		// debugger;
	    		// });
	    		// debugger;
	    	},
	    	like: function(beer) {
	    		// TODO: API '/like' call, set .like prop, etc.
	    		$.notify('Glad you liked ' + beer.beerName, 'info');
	    	},
	    	dislike: function(beer) {
	    		// TODO: API '/dislike' call, set .like prop, etc.
	    		$.notify('Sorry you didn\'t like ' + beer.beerName, 'info');
	    	}
	    }
	});

	var App = Vue.extend({
		components: {
			'NavBar': { template: '#nav-bar' },
			'AppFooter': { template: '#app-footer' }
		},
		ready: function() {
			// console.log("App.ready() ", store.state.allBeers.length);
			var myBeers = JSON.parse(localStorage.getItem('myBeers')) || [];
			// console.log("Getting myBeers from localStorage & setting. ", myBeers.length);
			// store.state.setMyBeers(myBeers);
			// console.log('Fetching all beers data...');
			this.$http({
				url: '/beerfest/beerfest-FLAT-2015.js',
				method: 'GET'
			}).then(function(response) {
				// console.log('Done Fetching all beers.');
				this.$dispatch('setAllBeers', response.data);
			}, function(response) {  // handle error
				console.log('ERROR: ' + response);
			});
		},
		events: {
	    	setAllBeers: function(data) {
	    		// console.log('Dispatched! Setting all beers.', data.length, store.state.allBeers.length);
	    		store.setAllBeers(data);
	    	},
	    	/**
	    		ADD
	    	**/
	    	addToMyBeersEvent: function(beer) {
	    		// console.log('Dispatched! Adding ' + beer.beerName);
	    		beer.myBeer = true;
				var myBeers = JSON.parse(localStorage.getItem('myBeers')) || [];
				myBeers.push(beer);
				// remove duplicates, based on beer name (NOTE: Beer names should be unique!)
				myBeers = _.uniq(myBeers, function(beer) { return beer.beerName; });
				localStorage.setItem('myBeers', JSON.stringify(myBeers));
				// store.state.setMyBeers(myBeers);
	    		$.notify(beer.beerName + ' added!', 'success');
	    	},
	    	/**
	    		REMOVE
	    	**/
	    	removeFromMyBeersEvent: function(beer) {
	    		// remove `myBeer` flag, remove from myBeers
	    		// console.log('Dispatched! Removing ' + beer.beerName);
	    		beer.myBeer = false;
	    		var myBeers = JSON.parse(localStorage.getItem('myBeers')) || [];
	    		if (!myBeers.length) return;  // nothing to remove
	    		var thisName = beer.beerName;
	    		myBeers = _.without(myBeers, _.findWhere(myBeers, {beerName: thisName}));
	    		localStorage.setItem('myBeers', JSON.stringify(myBeers));
	    		$.notify(beer.beerName + ' removed');
	    		// debugger;
	    		this.$broadcast('beerRemoved', beer);
	    		// debugger;
	    	}
		}
		// watch: {
		//     allBeers: function () {
		//         console.log('App store.state.allBeers changed!', store.state.allBeers.length);
		//     }
		// }
	});


	var BeerList = Vue.extend({
		template: '#beer-list',
		data: function () {
			return {
				allBeers    : store.state.allBeers,
				beersFilter : "",
				tentFilter  : "",
				styleFilter : "",
				vipFilter   : ""
				//animateMe   : false
			}
		},
		ready: function() {
			// console.log("BeerList.ready() ", store.state.allBeers.length);
			store.updateBeers();
			// HACK: If no data loaded yet, grab from store after 1s
    		var self = this;
    		// if (!store.state.allBeers.length) {
    		if (1==1) {
	    		setTimeout(function () {
	    			// console.log('After 1s: ' + store.state.allBeers.length);
					store.updateBeers();
					// console.log("Updated allBeers against myBeers. ", store.state.allBeers.length);
					// self.$set('myBeers', store.state.getMyBeers());
					self.$set('allBeers', store.state.allBeers);
	    		}, 1000);
    		}
    		// this.$on('beer-removed', function () {
			// console.log('I understand a beer has been removed.');
    		// });
			console.log("BeerList.ready() End ", store.state.allBeers.length);
		},
	    events: {
	    	beerRemoved: function(beer) {
	    		// console.log(beer.beerName + ' has been removed.');
	    		store.updateBeers();
	    	}
	    },
		methods: {
			refreshAllBeers: function() {
				this.$set('allBeers', store.state.allBeers);
			},
			removeLocal: function(beer) {
				// console.log('removeLocal()');
				// send dispatched remove event // console.log(beer.beerName);
				this.$dispatch('removeFromMyBeersEvent', beer);
				// return;
			},
			addLocal: function(beer) {
				// console.log(this.myBeers);
				this.$dispatch('addToMyBeersEvent', beer);
				// $(this).addClass('animated rubberBand');
	    		// var self = this;
	    		// setTimeout(function () {
	    			// console.log('After .5s: ' + store.state.myBeers.length);
					// self.$set('myBeers', store.state.getMyBeers());
	    		// }, 500);
				// animate
				// $(event.target).closest('li.beer').slideUp("slow");
			},
			getBeerID: function(beer) {
				// strip non-alphanumerics
				return beer.beerName.replace(/[^a-zA-Z0-9]/g, '').substr(0,3).toUpperCase() +
					beer.beerStyle.substr(0,3).toUpperCase() +
					// pad with leading 0
					("0" + parseInt(beer.beerABV)).substr(-2, 2);
			},
			isInMyBeers: function(beer) {
				// return index;
				// console.log(beer.beerName);
				// var myBeerNames = _.find(this.myBeers, function(myBeer){
				var myBeerNames = _.find(store.state.myBeers, function(myBeer){
					return myBeer.beerName == beer.beerName;
				});
				// return _.contains(this.myBeers, this.allBeers[index]);
				return _.contains(myBeerNames, beer.beerName);
			}
			// animateMe: function(pos) {
			// 	// console.log(className, pos);
			// 	console.log( $(this.$el) );
			// 	$(this.$el).addClass('animated rubberBand');
			//     // var el = document.getElementsByClassName('beer')[pos]
			//     // el.classList.toggle(className)
			// }
		}
		// watch: {
		    // allBeers: function () {
		    //     console.log('BeerList store.state.allBeers changed!', store.state.allBeers.length);
		    // },
		    // myBeers: function () {
		    //     console.log('BeerList store.state.myBeers changed!');
		    // }
		// }
	});



	// configure router
	var router = new VueRouter();
	router.map({
		'/beerlist': {
			name: 'beerlist',
			component: BeerList
		},
		'/mybeers': {
			name: 'mybeers',
			component: MyBeerList
		},
		'/about': {
			name: 'about',
			component: AboutBeerfest
		}
	});
	router.redirect({ '*': '/beerlist' });
	router.alias({ '/': '/beerlist' });
	router.start(App, '#app');
	Vue.config.debug = true;


	// Vue.transition('stagger', {
	//   stagger: function (index) {
	//     // increase delay by 50ms for each transitioned item, but limit max delay to 300ms
	//     return Math.min(600, index * 50);
	//   }
	// });
}); // end DocReady