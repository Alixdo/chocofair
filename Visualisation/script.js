"use strict";

function checkProp() {
	var margin_left = document.getElementById("mapContainer").offsetWidth + 20;
	var checkWidth = document.getElementById("header").offsetWidth - margin_left - 14;	
	document.getElementById("checkboxContainer").style.marginLeft = margin_left.toString() + "px";
	document.getElementById("checkboxContainer").style.width = checkWidth.toString() + "px";
}

function cocoaCheck() {
	document.getElementById("checkboxChoco").checked = false;
}
function chocoCheck() {
	document.getElementById("checkboxCocoa").checked = false;
}
function importCheck() {
	document.getElementById("checkboxExport").checked = false;
	document.getElementById("checkboxPrice").checked = false;
	document.getElementById("checkboxProduction").checked = false;
}
function exportCheck() {
	document.getElementById("checkboxImport").checked = false;
	document.getElementById("checkboxPrice").checked = false;
	document.getElementById("checkboxProduction").checked = false;
}
function priceCheck() {
	document.getElementById("checkboxImport").checked = false;
	document.getElementById("checkboxExport").checked = false;
	document.getElementById("checkboxProduction").checked = false;
}
function productionCheck() {
	document.getElementById("checkboxImport").checked = false;
	document.getElementById("checkboxExport").checked = false;
	document.getElementById("checkboxPrice").checked = false;
}
function fractionCheck() {
	document.getElementById("checkboxQuantiles").checked = false;
}
function quantileCheck() {
	document.getElementById("checkboxFractions").checked = false;
}
function valCheck() {
	document.getElementById("checkboxQuan").checked = false;
}
function quanCheck() {
	document.getElementById("checkboxVal").checked = false;
}
// <input type="checkbox" id="checkboxTrade" onchange="importCheck()"> Import <br>
//         <input type="checkbox" id="checkboxTrade" onchange="exportCheck()"> Export <br>
//         <input type="checkbox" id="checkboxTrade" onchange="priceCheck()"> Wage/Price <br>
//         <input type="checkbox" id="checkboxTrade" onchange="productionCheck()"> Production <br>
//         <input type="checkbox" id="checkboxTrade" onchange="fractionCheck()"> Fraction <br>
//         <input type="checkbox" id="checkboxTrade" onchange="quantileCheck()"> Quantile <br>

checkboxCocoa
checkboxChoco
checkboxImport
checkboxExport
checkboxPrice
checkboxProduction
checkboxFractions
checkboxQuantiles
checkboxVal
checkboxQuan

cocoaCheck()
chocoCheck()
importCheck()
exportCheck()
priceCheck()
productionCheck()
fractionCheck()
quantileCheck()
valCheck()
quanCheck()

function dataParam() {
	blankMap();
	var country = d3.selectAll(".country");
	var scale = "fraction";

	if (document.getElementById("checkboxFractions").checked == true){
		scale = "fraction";	
	}			
	if (document.getElementById("checkboxQuantiles").checked == true){
		scale = "quantile";
	}

	if (document.getElementById("checkboxCocoa").checked == true){
		if (document.getElementById("checkboxImport").checked == true){
			if (document.getElementById("checkboxVal").checked == true) {
				colorMap("data_files/_CocoaImpVal2000_2011.json", scale);

				country.on("click", function(d,i) {
					blankMap();
					matrColorMap("data_files/_TradeMatrCocoaImpVal2011.json", d);
				});
			}	
			if (document.getElementById("checkboxQuan").checked == true) {
				colorMap("data_files/_CocoaImpQuan2000_2011.json", scale);

				country.on("click", function(d,i) {
					blankMap();
					matrColorMap("data_files/_TradeMatrCocoaImpQuan2011.json", d);
				});
			}
		}
		if (document.getElementById("checkboxExport").checked == true){
			if (document.getElementById("checkboxVal").checked == true) {
				colorMap("data_files/_CocoaExpVal2000_2011.json", scale);

				country.on("click", function(d,i) {
					blankMap();
					matrColorMap("data_files/_TradeMatrCocoaExpVal2011.json", d);
				});
			}	
			if (document.getElementById("checkboxQuan").checked == true) {
				colorMap("data_files/_CocoaExpQuan2000_2011.json", scale);

				country.on("click", function(d,i) {
					blankMap();
					matrColorMap("data_files/_TradeMatrCocoaExpQuan2011.json", d);
				});
			}
		}
		if (document.getElementById("checkboxPrice").checked == true) {

		}
		if (document.getElementById("checkboxProduction").checked == true) {

		}
	}
	if (document.getElementById("checkboxChoco").checked == true) {
		if (document.getElementById("checkboxImport").checked == true) {
			if (document.getElementById("checkboxVal").checked == true) {
				colorMap("data_files/_ChocoImpVal2000_2011.json", scale);

				country.on("click", function(d,i) {
					blankMap();
					matrColorMap("data_files/_TradeMatrChocoImpVal2011.json", d);
				});
			}	
			if (document.getElementById("checkboxQuan").checked == true) {
				colorMap("data_files/_ChocoImpQuan2000_2011.json", scale);

				country.on("click", function(d,i) {
					blankMap();
					matrColorMap("data_files/_TradeMatrChocoImpQuan2011.json", d);
				});
			}
		}
		if (document.getElementById("checkboxExport").checked == true) {
			if (document.getElementById("checkboxVal").checked == true) {
				colorMap("data_files/_ChocoExpVal2000_2011.json", scale);

				country.on("click", function(d,i) {
					blankMap();
					matrColorMap("data_files/_TradeMatrChocoExpVal2011.json", d);
				});
			}	
			if (document.getElementById("checkboxQuan").checked == true) {
				colorMap("data_files/_ChocoExpQuan2000_2011.json", scale);

				country.on("click", function(d,i) {
					blankMap();
					matrColorMap("data_files/_TradeMatrChocoExpQuan2011.json", d);
				});
			}	
		}
		if (document.getElementById("checkboxPrice").checked == true) {

		}
		if (document.getElementById("checkboxProduction").checked == true) {

		}
	}
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
				console.log(keyCountry);
				if (data[keyCountry] < oneFifth) {
					// hier here ici
					console.log("miew"+keyCountry);
					d3.select("[title='"+keyCountry+"']").attr("fill", "black");
					// document.getElementById(keyCountry).style.fill = "blue";
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