"use strict";

function checkProp() {
	var margin_left = document.getElementById("mapContainer").offsetWidth + 20;
	var checkWidth = document.getElementById("header").offsetWidth - margin_left - 14;	
	document.getElementById("checkboxContainer").style.marginLeft = margin_left.toString() + "px";
	document.getElementById("checkboxContainer").style.width = checkWidth.toString() + "px";
}

function cocoaCheck() {
	console.log("cocoa_check");
	blankMap();
    colorMap("data_files/_CocoaExpVal2000_2011.json");
	// colorMap("data_files/_CocoaExpVal2000_2011.json", "quantile");
}

function chocoCheck() {

}

function tradeCheck() {
	var country = d3.selectAll(".country");
	console.log("t", country);

	country.on("click", function(d,i) {
			blankMap();
			matrColorMap("data_files/_TradeMatrCocoaExpVal2011.json", d);
	});
}

/*Colors the map according to the data stored in a JSON file.
The data must be a dictionnary, with country names as keys and data
values as values. One data value only per country.
@ param dataFile: JSON file containing a dictionnary of the data.
@ param scale: String that determines along which lines the color 
scale is divided. Can be either "fraction" or "quantile".
*/ 
function colorMap(dataFile, scale="quantile") {
	d3.json(dataFile, color);

	function color(error, data) {
		// console.log(data);

		for (var keyCountry in data) {
			if (data[keyCountry] == 0) {
				delete data[keyCountry];
			}
		}

		function compareNumbers(a, b) {
  			return a - b;
		}

		var dataMap = d3.map(data);
		var dataValUnsorted = dataMap.values();
		var dataValues = dataValUnsorted.sort(compareNumbers);
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

/*
Erase all custom fills and strokes on the map.
*/
function blankMap() {
	console.log("blanK");
	d3.selectAll(".country")
	 	.style("fill", "grey")
	 	.style("stroke", "none");
}


/*
Colors the map according to the matrix data stored in a JSON
file, representing the connection between countries. The data 
must be a dictionnary, with country names as keys and 
dictionnaries as values. The value dictionnaries must have 
countries as keys and data values as values. 
@ param dataFile: JSON file containing a dictionnary of the 
data.
@ param scale: String that determines along which lines the color 
scale is divided. Can be either "fraction" or "quantile".
*/ 
function matrColorMap(dataFile, d, scale="fraction") {
	document.getElementById(d.properties.name).style.stroke = "black";

	d3.json(dataFile, color);
	function color(error, data) {

		for (var keyDic in data) {
			for (var keyCountry in keyDic) {
				if (data[keyCountry] == 0) {
					delete data[keyCountry];
				}
			}
		}

		function compareNumbers(a, b) {
  			return a - b;
		}

		// console.log("data", data);
		var dataMap = d3.map(data);
		var dataDicVal = dataMap.values();
		// console.log(dataDicVal);
		var countryDic = dataMap.get(d.properties.name);
		// console.log("B", countryDic);
		var countryMap = d3.map(countryDic);
		// console.log("Bmap", countryMap);
		var countryValUnsorted = countryMap.values();
		// console.log(countryValUnsorted);
		var countryValSorted = countryValUnsorted.sort(compareNumbers);

		var max = d3.max(countryValSorted);

		if (scale == "fraction") {
			var oneFifth = max/5;
			var twoFifth = 2*max/5;
			var threeFifth = 3*max/5;
			var fourFifth = 4*max/5;
			// console.log(oneFifth, twoFifth, threeFifth, fourFifth, max);

			for (var keyCountry in countryDic) {
				console.log("key", keyCountry);
				if (countryDic[keyCountry] < oneFifth) {
					document.getElementById(keyCountry).style.fill = "blue";
				}
				else if ((countryDic[keyCountry] > oneFifth) && (countryDic[keyCountry] < twoFifth)) {
					document.getElementById(keyCountry).style.fill = "green";
				}
				else if ((countryDic[keyCountry] > twoFifth) && (countryDic[keyCountry] < threeFifth)) {
					document.getElementById(keyCountry).style.fill = "yellow";
				}
				else if ((countryDic[keyCountry] > threeFifth) && (countryDic[keyCountry] < fourFifth)) {
					document.getElementById(keyCountry).style.fill = "orange";
				}
				else if (countryDic[keyCountry] > fourFifth) {
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