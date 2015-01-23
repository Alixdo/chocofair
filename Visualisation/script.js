"use strict";

/* 
Sets the margin and size properties for the title div and the left side divs.
Is called onload in main.html.
*/
function checkProp() {
	// Sets the title div width to be as long as the map.
	var titleLength = document.getElementById("mapContainer").clientWidth - 30;
	document.getElementById("title").style.width = titleLength.toString() + "px";

	// Sets the top maring of the map so as to leave room for the title above the map.
	var mapTopMargin = document.getElementById("title").offsetHeight + 10;
	document.getElementById("mapContainer").style.marginTop = mapTopMargin.toString() + "px";

		// Sets the margin of the left column so as to leave space for the map in the right column.
	var marginLeft = document.getElementById("mapContainer").offsetWidth + 20;
	// var checkWidth = document.getElementById("body").offsetWidth - margin_left - 14;	
	document.getElementById("rightColumn").style.marginLeft = marginLeft.toString() + "px";
	// document.getElementById("rightColumn").style.width = checkWidth.toString() + "px";
}

var titleString = ["", "of", "", "", "", "", "", "in", ""];
// Makes sure two checkboxes are not checked at the same time if they encode different data.
// Globally encodes which strings are to be used in the title of the visualisation.
function cocoaCheck() {
	document.getElementById("checkboxChoco").checked = false;
	titleString[2] = "chocolate products";
}
function chocoCheck() {
	document.getElementById("checkboxCocoa").checked = false;
	titleString[2] = "cocoa beans";
}
function importCheck() {
	document.getElementById("checkboxExport").checked = false;
	document.getElementById("checkboxPrice").checked = false;
	document.getElementById("checkboxProduction").checked = false;
	titleString[0] = "Import";
}
function exportCheck() {
	document.getElementById("checkboxImport").checked = false;
	document.getElementById("checkboxPrice").checked = false;
	document.getElementById("checkboxProduction").checked = false;
	titleString[0] = "Export";
}
function priceCheck() {
	document.getElementById("checkboxImport").checked = false;
	document.getElementById("checkboxExport").checked = false;
	document.getElementById("checkboxProduction").checked = false;
	titleString[0] = "Earnings";
	titleString[3] = "farmers";
	titleString[7] = "US dollars per tonne";
}
function productionCheck() {
	document.getElementById("checkboxImport").checked = false;
	document.getElementById("checkboxExport").checked = false;
	document.getElementById("checkboxPrice").checked = false;
	titleString[0] = "Production";
	titleString[7] = "tonnes per year";

}
function fractionCheck() {
	document.getElementById("checkboxQuantiles").checked = false;
}
function quantileCheck() {
	document.getElementById("checkboxFractions").checked = false;
}
function valCheck() {
	document.getElementById("checkboxQuan").checked = false;
	titleString[7] = "thousand US dollars";
}
function quanCheck() {
	document.getElementById("checkboxVal").checked = false;
	titleString[7] = "tonnes per year";
}
function strokeCheck() {
}
// <input type="checkbox" id="checkboxTrade" onchange="importCheck()"> Import <br>
//         <input type="checkbox" id="checkboxTrade" onchange="exportCheck()"> Export <br>
//         <input type="checkbox" id="checkboxTrade" onchange="priceCheck()"> Wage/Price <br>
//         <input type="checkbox" id="checkboxTrade" onchange="productionCheck()"> Production <br>
//         <input type="checkbox" id="checkboxTrade" onchange="fractionCheck()"> Fraction <br>
//         <input type="checkbox" id="checkboxTrade" onchange="quantileCheck()"> Quantile <br>

// checkboxCocoa
// checkboxChoco
// checkboxImport
// checkboxExport
// checkboxPrice
// checkboxProduction
// checkboxFractions
// checkboxQuantiles
// checkboxVal
// checkboxQuan

// cocoaCheck()
// chocoCheck()
// importCheck()
// exportCheck()
// priceCheck()
// productionCheck()
// fractionCheck()
// quantileCheck()
// valCheck()
// quanCheck()

/*
Checks boxes after page is loaded, so that data is shown immediatly when the page 
is opened, without the user having to choose parameters.
*/

setTimeout(function(){
	var defer1 = $.Deferred();
	document.getElementById("checkboxChoco").checked = true;
	defer1.resolve();
	defer1.done(function defer2() { var defer2 = $.Deferred(); document.getElementById("checkboxExport").checked = true; defer2.resolve();});

	defer2.done( function defer3() { var defer3 = $.Deferred(); document.getElementById("checkboxFractions").checked = true; defer3.resolve();});
	
	defer3.done( function miew() {document.getElementById("checkboxVal").checked = true;});
	// dataParam();
// document.getElementById("checkboxCocoa").checked = true;
// document.getElementById("checkboxExport").checked = true;
// document.getElementById("checkboxFractions").checked = true;
// document.getElementById("checkboxVal").checked = true;
}, 1000);

/* 
Calls the right map coloring function, according to the parameters 
chosen by user.
*/
function dataParam() {
	resetVis();
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

			titleString[4] = "from";

			if (document.getElementById("checkboxVal").checked == true) {
				colorMap("data_files/_CocoaImpVal2011.json", scale);

				country.on("click", function(d,i) {
					resetVis();
					matrColorMap("data_files/_TradeMatrCocoaImpVal2011.json", d, scale);
				});
			}	
			if (document.getElementById("checkboxQuan").checked == true) {
				colorMap("data_files/_CocoaImpQuan2011.json", scale);

				country.on("click", function(d,i) {
					resetVis();
					matrColorMap("data_files/_TradeMatrCocoaImpQuan2011.json", d, scale);
				});
			}
		}
		if (document.getElementById("checkboxExport").checked == true){

			titleString[4] = "to";

			if (document.getElementById("checkboxVal").checked == true) {
				colorMap("data_files/_CocoaExpVal2011.json", scale);

				country.on("click", function(d,i) {
					resetVis();
					matrColorMap("data_files/_TradeMatrCocoaExpVal2011.json", d, scale);
				});
			}	
			if (document.getElementById("checkboxQuan").checked == true) {
				colorMap("data_files/_CocoaExpQuan2011.json", scale);

				country.on("click", function(d,i) {
					resetVis();
					matrColorMap("data_files/_TradeMatrCocoaExpQuan2011.json", d, scale);
				});
			}
		}
		if (document.getElementById("checkboxPrice").checked == true) {
			colorMap("data_files/_CocoaProdPrice2011.json", scale);
		}
		if (document.getElementById("checkboxProduction").checked == true) {
			colorMap("data_files/_CocoaProdQuan2011.json", scale);
		}
	}
	if (document.getElementById("checkboxChoco").checked == true) {
		if (document.getElementById("checkboxImport").checked == true) {

			titleString[4] = "from";

			if (document.getElementById("checkboxVal").checked == true) {
				colorMap("data_files/_ChocoImpVal2011.json", scale);

				country.on("click", function(d,i) {
					resetVis();
					matrColorMap("data_files/_TradeMatrChocoImpVal2011.json", d, scale);
				});
			}	
			if (document.getElementById("checkboxQuan").checked == true) {
				colorMap("data_files/_ChocoImpQuan2011.json", scale);

				country.on("click", function(d,i) {
					resetVis();
					matrColorMap("data_files/_TradeMatrChocoImpQuan2011.json", d, scale);
				});
			}
		}
		if (document.getElementById("checkboxExport").checked == true) {

			titleString[4] = "to";

			if (document.getElementById("checkboxVal").checked == true) {
				colorMap("data_files/_ChocoExpVal2011.json", scale);

				country.on("click", function(d,i) {
					resetVis();
					matrColorMap("data_files/_TradeMatrChocoExpVal2011.json", d, scale);
				});
			}	
			if (document.getElementById("checkboxQuan").checked == true) {
				colorMap("data_files/_ChocoExpQuan2011.json", scale);

				country.on("click", function(d,i) {
					resetVis();
					matrColorMap("data_files/_TradeMatrChocoExpQuan2011.json", d, scale);
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

	titleString[4] = "per country"; 
	document.getElementById("title").innerHTML = titleString.join(" ");

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
			var rangesList = [0, oneFifth, twoFifth, threeFifth, fourFifth, max];

			for (var keyCountry in data) {
				// d3.selectAll("." + keyCountry.replace(/\s+/g, "").replace("'", "").replace(",","")).style("stroke", "pink");
			}

			for (var keyCountry in data) {

				// Removes the spaces of the country string, in order to correspond
				// with the classes of the map.
				var keyCountryClass = "." + keyCountry.replace(/[ ,.]{1,}/g, "");//.replace("'", "").replace(",","");

				// console.log(keyCountry, keyCountryClass);

				if (data[keyCountry] < oneFifth) {
					// console.log("miew"+keyCountry);
					d3.selectAll(keyCountryClass).style("fill", "blue");
				}
				else if ((data[keyCountry] > oneFifth) && (data[keyCountry] < twoFifth)) {
					d3.selectAll(keyCountryClass).style("fill", "green");
				}
				else if ((data[keyCountry] > twoFifth) && (data[keyCountry] < threeFifth)) {
					d3.selectAll(keyCountryClass).style("fill", "yellow");
				}
				else if ((data[keyCountry] > threeFifth) && (data[keyCountry] < fourFifth)) {
					d3.selectAll(keyCountryClass).style("fill", "orange");
				}
				else if (data[keyCountry] > fourFifth) {
					d3.selectAll(keyCountryClass).style("fill", "red");
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
			var rangesList = [0, firstQuant,secQuant, thirdQuant, fourthQuant, fifthQuant];

			for (var keyCountry in data) {

				// Removes the spaces of the country string, in order to correspond
				// with the classes of the map.
				var keyCountryClass = "." + keyCountry.replace(/\s+/g, "").replace("'", "").replace(",","");

				if (data[keyCountry] < firstQuant) {
					d3.selectAll(keyCountryClass).style("fill", "blue");
				}
				else if ((data[keyCountry] > firstQuant) && (data[keyCountry] < secQuant)) {
					d3.selectAll(keyCountryClass).style("fill", "green");
									}
				else if ((data[keyCountry] > secQuant) && (data[keyCountry] < thirdQuant)) {
					d3.selectAll(keyCountryClass).style("fill", "yellow");

				}
				else if ((data[keyCountry] > thirdQuant) && (data[keyCountry] < fourthQuant)) {
					d3.selectAll(keyCountryClass).style("fill", "orange");

				}
				else if (data[keyCountry] > fourthQuant) {
					d3.selectAll(keyCountryClass).style("fill", "red");
				}
			}	
		}

		var colorList = ["blue", "green", "yellow", "orange", "red"];
		drawLegend(rangesList, colorList);
	}
}

/*
Erase all custom fills and strokes on the map.
*/
function resetVis() {
	console.log("blanK");
	d3.selectAll(".country")
	 	.style("fill", "grey")
	 	.style("stroke", "none");

	d3.selectAll(".contry:hover")
		.style("stroke", "white")
		.style("stroke-width", "1.5px");

	d3.select("#legendContainer").select("svg > *").remove();
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
	// console.log(d.properties.name, d.properties.name.replace(",","").replace(/\s+/g, '').replace("'",""));
	// d3.selectAll("." + d.properties.name.replace(",","").replace(/\s+/g, '').replace("'","")).style("stroke", "black");
	// document.getElementById(d.properties.name).style.stroke = "black";

	titleString[5] = d.properties.name;
	document.getElementById("title").innerHTML = titleString.join(" ");

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

		var dataMap = d3.map(data);
		var dataDicVal = dataMap.values();
		var countryDic = dataMap.get(d.properties.name);
		var countryMap = d3.map(countryDic);
		var countryValUnsorted = countryMap.values();
		var countryValSorted = countryValUnsorted.sort(compareNumbers);

		var max = d3.max(countryValSorted);

		if (scale == "fraction") {
			var oneFifth = max/5;
			var twoFifth = 2*max/5;
			var threeFifth = 3*max/5;
			var fourFifth = 4*max/5;
			// console.log(oneFifth, twoFifth, threeFifth, fourFifth, max);
			var rangesList = [0, oneFifth, twoFifth, threeFifth, fourFifth, max];
			console.log("range1", rangesList);

			for (var keyCountry in countryDic) {

				// Removes the spaces of the country string, in order to correspond
				// with the classes of the map.
				var keyCountryClass = "." + keyCountry.replace(/\s+/g, "").replace("'", "").replace(",","");

				// console.log("key", keyCountry);

				if (countryDic[keyCountry] < oneFifth) {
					d3.selectAll(keyCountryClass).style("fill", "blue");
				}
				else if ((countryDic[keyCountry] > oneFifth) && (countryDic[keyCountry] < twoFifth)) {
					d3.selectAll(keyCountryClass).style("fill", "green");
				}
				else if ((countryDic[keyCountry] > twoFifth) && (countryDic[keyCountry] < threeFifth)) {
					d3.selectAll(keyCountryClass).style("fill", "yellow");
				}
				else if ((countryDic[keyCountry] > threeFifth) && (countryDic[keyCountry] < fourFifth)) {
					d3.selectAll(keyCountryClass).style("fill", "orange");
				}
				else if (countryDic[keyCountry] > fourFifth) {
					d3.selectAll(keyCountryClass).style("fill", "red");
				}
			}
		}

		if (scale == "quantile") {
			var firstQuant = d3.quantile(countryValSorted, 0.2);
			var secQuant = d3.quantile(countryValSorted, 0.4);
			var thirdQuant = d3.quantile(countryValSorted, 0.6);
			var fourthQuant = d3.quantile(countryValSorted, 0.8);
			var fifthQuant = d3.quantile(countryValSorted, 1);
			// console.log(firstQuant, secQuant, thirdQuant, fourthQuant, fifthQuant);
			var rangesList = [0, firstQuant, secQuant, thirdQuant, fourthQuant, fifthQuant];
			console.log("range2", rangesList);

			for (var keyCountry in data) {

				// Removes the spaces of the country string, in order to correspond
				// with the classes of the map.
				var keyCountryClass = "." + keyCountry.replace(/\s+/g, "").replace("'", "").replace(",","");

				if (data[keyCountry] < firstQuant) {
					d3.selectAll(keyCountryClass).style("fill", "blue");
				}
				else if ((data[keyCountry] > firstQuant) && (data[keyCountry] < secQuant)) {
					d3.selectAll(keyCountryClass).style("fill", "green");
				}
				else if ((data[keyCountry] > secQuant) && (data[keyCountry] < thirdQuant)) {
					d3.selectAll(keyCountryClass).style("fill", "yellow");
				}
				else if ((data[keyCountry] > thirdQuant) && (data[keyCountry] < fourthQuant)) {
					d3.selectAll(keyCountryClass).style("fill", "orange");
				}
				else if (data[keyCountry] > fourthQuant) {
					d3.selectAll(keyCountryClass).style("fill", "red");
				}
			}	
		}

		var colorList = ["blue", "green", "yellow", "orange", "red"];

		drawLegend(rangesList, colorList);
	}
}


function drawLegend(rangesList, colorList) {
	document.getElementById("legendContainer").style.display = "none";
	console.log("legend");
	console.log(rangesList, colorList);

	// Size of colored squares in legend
	var squareSide = 17;
	var spacing = squareSide / 3;

	var legendWidth = squareSide * 10;
	var legendHeight = 5*squareSide + 4*spacing;

	var dataScale = d3.scale.linear();

	var legend = d3.select("#legendContainer")
		.select("svg")
		.attr("width", legendWidth)
		.attr("height", legendHeight)
		.append("g")
		// .attr('transform', 'translate(10, 0)')
		.selectAll(".legend")
		.data(colorList)
		.enter()
		.append("g")
		.attr("class", "legend")
		.attr("transform", 
			function(d,i) {
				var horz = 0
			    // var vert = dataScale(rangesList[i+1]);
			    var vert = legendHeight - squareSide - i*(squareSide + spacing);
			    console.log("vert", vert);
			    return "translate(" + horz + "," + vert + ")";
		});

	// Draws colored rectangles
	legend.append("rect")
		.attr("width", squareSide)
		.attr("height", squareSide)
		.attr("fill", function(d,i) {
			return d;
		})
		.attr("stroke", "black")

	// Adds corresponding text to each rectangle (data delimitations)
	legend.append("text")
		.attr("x", squareSide + spacing)
		.attr("y", (spacing + squareSide) / 2)
		.text( function (d,i) {
			// Shows the legend only if there is data to be visualised.
			if (!(isNaN(rangesList[i]) || isNaN(rangesList[i+1]) || (rangesList[i] == 0 && rangesList[i+1] == 0))) {
				document.getElementById("legendContainer").style.display = "block";
				return rangesList[i] + " - " + rangesList[i+1]; 
			}
		})
		.attr("font-family", "sans-serif")
		.attr("font-size", ((3/5)*squareSide).toString());	
}

function lineVis(rangesList, colorList) {
	console.log("legend");
	console.log(rangesList, colorList);

	var legendHeight = 20;
	var legendWidth = document.documentElement.clientWidth - 20;

	var relHeight = rangesList[5]/legendWidth;

	var dataScale = d3.scale.linear();
	// dataScale.domain([0, rangesList[5]]);
	// dataScale.range([legendHeight, 0]);
	dataScale.domain([0, rangesList[5]]);
	dataScale.range([0, legendWidth]);

	var legend = d3.select("#lineContainer")
		.append("svg")
		.attr("width", legendWidth + 20)
		.attr("height", legendHeight + 200)
		.append("g")
		.attr('transform', 'translate(10, 0)')
		.selectAll(".legend")
		.data(colorList)
		.enter()
		.append("g")
		.attr("class", "legend")
		.attr("transform", 
			function(d,i) {
			var horz = 0
		    // var vert = dataScale(rangesList[i+1]);
		    var vert = i*40
		    console.log("vert", vert);
		    return "translate(" + horz + "," + vert + ")";
		});

	legend.append("rect")
		.attr("width", function(d,i) {
			return (rangesList[i+1] - rangesList[i]) / relHeight;
		})
		.attr("height", legendHeight)
		// .attr("width", legendWidth)
		// .attr("height", function(d,i) {
		// 	return (rangesList[i+1] - rangesList[i]) / relHeight;
		// })
		.attr("fill", function(d,i) {
			return d;
		})
		.attr("stroke", "black");
}