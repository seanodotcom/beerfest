
// find difference between 2 objects #difference #jsondiff | http://codereview.stackexchange.com/a/11580
function difference(o1, o2) {
    var k, kDiff,
        diff = {};
    for (k in o1) {
        if (!o1.hasOwnProperty(k)) {
        } else if (typeof o1[k] != 'object' || typeof o2[k] != 'object') {
            if (!(k in o2) || o1[k] !== o2[k]) {
                diff[k] = o2[k];
            }
        } else if (kDiff = difference(o1[k], o2[k])) {
            diff[k] = kDiff;
        }
    }
    for (k in o2) {
        if (o2.hasOwnProperty(k) && !(k in o1)) {
            diff[k] = o2[k];
        }
    }
    for (k in diff) {
        if (diff.hasOwnProperty(k)) {
            return diff;
        }
    }
    return false;
};

function updatedProps(obj) {
	var props = [];
	_.each(obj, function(order, i){
		_.each(order, function(k,v){
			props[homeScreen.orders[i].sonumber] = v;
		});
	});
};

jQuery.fn.highlight = function (duration, color) {  // https://gist.github.com/alanfluff/4353262 | #highlight #highlightfade
    var duration = duration || 1400;
    var color = color || "#ffd700";
    $(this).each(function () {
        var el = $(this);
        $("<div/>")
        .width(el.outerWidth())
        .height(el.outerHeight())
        .css({
            "position": "absolute",
            "left": el.offset().left,
            "top": el.offset().top,
            "background-color": color, // "#ffff99",
            "opacity": ".7",
            "z-index": "9999999"
        })
        .appendTo('body').fadeOut(duration).queue(function() {
          $(this).remove();
        });
    });
};

/* Transform JSON | http://jsbin.com/tukuvi/edit */
// NOTE: SCRUB DATA!
/*
var i = 0, len = beerList.length, item, newList = [], tree = {}, parent;
for (i; i < len; i++) {
    var vendorName = beerList[i].vendorName;
    var hometown = beerList[i].hometown;
    var tent = beerList[i].tent;
    beerList[i].beers.forEach(function(beer) {
      beer.vendorName = vendorName;
      beer.hometown = hometown;
      beer.tent = tent;
      newList.push(beer);
    });
}
*/