"use strict";



function checkProp() {
	var margin_left = document.getElementById("map_container").offsetWidth + 20;
	var checkWidth = document.getElementById("header").offsetWidth - margin_left - 14;	
	document.getElementById("checkbox_container").style.marginLeft = margin_left.toString() + "px";
	document.getElementById("checkbox_container").style.width = checkWidth.toString() + "px";
}

function cocoa_check() {
	console.log("cocoa_check");
    color_map("data_files/_CocoaExpVal2000_2011.json", "quantile");
	// color_map("data_files/_CocoaExpVal2000_2011.json", "quantile");
}

function choco_check() {

}

/*Colors the map according to the data stored in a JSON file.
The data must be a dictionnary, with country names as keys and data
values as values. One data value only per country.
@ param dataFile: JSON file containing a dictionnary of the data.
@ param scaleFunction: String that determines along which lines the color 
scale is divided. Can be either "fraction" or "quantile".
*/ 
function color_map(dataFile, scale="fraction") {

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
		// console.log(dataValues)

		var max = d3.max(dataValues);

		if (scale == "fraction") {
			var oneFifth = max/5;
			var twoFifth = 2*max/5;
			var threeFifth = 3*max/5;
			var fourFifth = 4*max/5;

			// console.log(oneFifth, twoFifth, threeFifth, fourFifth, max);

			for (var keyCountry in data) {
				if (data[keyCountry] < oneFifth) {
					document.getElementById(keyCountry).style.fill = "blue";
				}
				else if ((data[keyCountry] > oneFifth) && (data[keyCountry] < twoFifth)) {
					document.getElementById(keyCountry).style.fill = "green";
				}
				else if ((data[keyCountry] > twoFifth) && (data[keyCountry] < threeFifth)) {
					document.getElementById(keyCountry).style.fill = "yellow";
				}
				else if ((data[keyCountry] > threeFifth) && (data[keyCountry] < fourFifth)) {
					document.getElementById(keyCountry).style.fill = "orange";
				}
				else if (data[keyCountry] > fourFifth) {
					document.getElementById(keyCountry).style.fill = "red";
				}
			}
		}
		
		if (scale == "quantile") {
			var firstQuant = d3.quantile(dataValues, 0.2);
			var secQuant = d3.quantile(dataValues, 0.4);
			var thirdQuant = d3.quantile(dataValues, 0.6);
			var fourthQuant = d3.quantile(dataValues, 0.8);
			var fifthQuant = d3.quantile(dataValues, 1);

			// console.log(firstQuant, secQuant, thirdQuant, fourthQuant, fifthQuant);

			for (var keyCountry in data) {
				if (data[keyCountry] < firstQuant) {
					document.getElementById(keyCountry).style.fill = "blue";
				}
				else if ((data[keyCountry] > firstQuant) && (data[keyCountry] < secQuant)) {
					document.getElementById(keyCountry).style.fill = "green";
				}
				else if ((data[keyCountry] > secQuant) && (data[keyCountry] < thirdQuant)) {
					document.getElementById(keyCountry).style.fill = "yellow";
				}
				else if ((data[keyCountry] > thirdQuant) && (data[keyCountry] < fourthQuant)) {
					document.getElementById(keyCountry).style.fill = "orange";
				}
				else if (data[keyCountry] > fourthQuant) {
					document.getElementById(keyCountry).style.fill = "red";
				}
			}	
		}
	}
}


var country = g.selectAll(".country")

country.on("mousemove", function(d,i) {
	console.log("miew")
})