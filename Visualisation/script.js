"use strict";



function checkProp() {
  var margin_left = document.getElementById("map_container").offsetWidth + 20;
  var checkWidth = document.getElementById("header").offsetWidth - margin_left - 14;
  document.getElementById("checkbox_container").style.marginLeft = margin_left.toString() + "px";
  document.getElementById("checkbox_container").style.width = checkWidth.toString() + "px";
}

function cocoa_check() {
  console.log("cocoa_check");
}

function choco_check() {

}

function color_map(dataFile) {
// dataFile is a string of the filename with the data used to 
// color the map.

	d3.json(dataFile, color);

	function color(error, data){
		console.log(data);

		for (var keyCountry in data) {
			if (data[keyCountry] == 0) {
				delete data[keyCountry];
			}
		}

		function compareNumbers(a, b) {
  			return a - b;
		}

		var dataMap = d3.map(data);
		var dataValues1 = dataMap.values()
		var dataValues = dataValues1.sort(compareNumbers)
		console.log(dataValues)

		var max = d3.max(dataValues);
		var oneFifth = max/5;
		var twoFifth = 2*max/5;
		var threeFifth = 3*max/5;
		var fourFifth = 4*max/5;

		console.log(oneFifth, twoFifth, threeFifth, fourFifth, max);

		var firstQuant = d3.quantile(dataValues, 0.2);
		var secQuant = d3.quantile(dataValues, 0.4);
		var thirdQuant = d3.quantile(dataValues, 0.6);
		var fourthQuant = d3.quantile(dataValues, 0.8);
		var fifthQuant = d3.quantile(dataValues, 1);

		console.log(firstQuant, secQuant, thirdQuant, fourthQuant, fifthQuant);

// # map.forEach(function)
// Calls the specified function for each entry in this map, passing the entry's key and value as two arguments. The this context of the function is this map. Returns undefined. The iteration order is arbitrary.

		for (var keyCountry in data) {
			// console.log(keyCountry);
			// console.log(data[keyCountry]);
			document.getElementById(keyCountry).style.fill = "red";

			if (data[keyCountry] < firstQuant) {
				document.getElementById(keyCountry).style.fill = "blue";
			}
			if ((data[keyCountry] > firstQuant) && (data[keyCountry] < secQuant)) {
				document.getElementById(keyCountry).style.fill = "green";
			}
			if ((data[keyCountry] > secQuant) && (data[keyCountry] < thirdQuant)) {
				document.getElementById(keyCountry).style.fill = "yellow";
			}
			if ((data[keyCountry] > thirdQuant) && (data[keyCountry] < fourthQuant)) {
				document.getElementById(keyCountry).style.fill = "orange";
			}
		}
	}
//d3.map om lijst te maken van dic
}

// color_map("data_files/_CocoaExpVal2000_2011.json");
color_map("data_files/_CocoaExpVal2000_2011.json");