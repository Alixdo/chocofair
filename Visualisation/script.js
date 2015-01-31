"use strict";

/* 
Sets the margin and size properties for the title div and the left side divs.
Is called onload in main.html.
*/
function leftDivSize() {
	// Sets the title div width to be as long as the map.
	var titleLength = document.getElementById("mapContainer").clientWidth - 30;
	document.getElementById("title").style.width = titleLength.toString() + "px";

	// Sets the top maring of the map so as to leave room for the title above the map.
	var mapTopMargin = document.getElementById("title").offsetHeight + 10;
	document.getElementById("mapContainer").style.marginTop = mapTopMargin.toString() + "px";

	// Sets the margin of the left column so as to leave space for the map in the right column.
	var marginLeft = document.getElementById("mapContainer").offsetWidth + 20;
	document.getElementById("rightColumn").style.marginLeft = marginLeft.toString() + "px";
}

// Loads in all the datasets
queue(1)
	.defer(d3.json, "data_files/_CocoaImpVal2011.json")
	.defer(d3.json,	"data_files/_CocoaImpQuan2011.json")
	.defer(d3.json, "data_files/_CocoaExpVal2011.json")
	.defer(d3.json, "data_files/_CocoaExpQuan2011.json")
	.defer(d3.json,	"data_files/_TradeMatrCocoaImpVal2011.json")
	.defer(d3.json,	"data_files/_TradeMatrCocoaImpQuan2011.json")
	.defer(d3.json,	"data_files/_TradeMatrCocoaExpVal2011.json")
	.defer(d3.json,	"data_files/_TradeMatrCocoaExpQuan2011.json")
	.defer(d3.json, "data_files/_CocoaProdPrice2011.json")
	.defer(d3.json, "data_files/_CocoaProdQuan2011.json")
	.defer(d3.json, "data_files/_ChocoImpVal2011.json")
	.defer(d3.json, "data_files/_ChocoImpQuan2011.json")
	.defer(d3.json, "data_files/_ChocoExpVal2011.json")
	.defer(d3.json, "data_files/_ChocoExpQuan2011.json")
	.defer(d3.json, "data_files/_TradeMatrChocoImpVal2011.json")
	.defer(d3.json, "data_files/_TradeMatrChocoImpQuan2011.json")
	.defer(d3.json, "data_files/_TradeMatrChocoExpVal2011.json")
	.defer(d3.json, "data_files/_TradeMatrChocoExpQuan2011.json")
	.await(scriptCode);

/*
Contains all the code of script.js, except the code that calculates the size of the left <div>, and the code that loads the data.
*/
function scriptCode (error, CocoaImpVal2011, CocoaImpQuan2011, CocoaExpVal2011, CocoaExpQuan2011, TradeMatrCocoaImpVal2011, TradeMatrCocoaImpQuan2011,
	TradeMatrCocoaExpVal2011, TradeMatrCocoaExpQuan2011, CocoaProdPrice2011, CocoaProdQuan2011, ChocoImpVal2011, ChocoImpQuan2011,
	ChocoExpVal2011, ChocoExpQuan2011, TradeMatrChocoImpVal2011, TradeMatrChocoImpQuan2011, TradeMatrChocoExpVal2011, 
	TradeMatrChocoExpQuan2011) {

	/*
	Returns a JSON dictionnary of the loaded data stored in a JSON file, cleaned from entries with uninterestig data.
	The data must be in the form of a dictionnary.
	*/
	function cleanMondialData(jsonDict, callback) {
		// Deletes entries for which the data value is 0.
		// (For example, a country that imports 0 cocoa will not be
		// visualised.)
		for (var keyCountry in jsonDict) {
			if (jsonDict[keyCountry] == 0) {
				delete jsonDict[keyCountry];
			}
		}
		var error = null;
		var data = jsonDict;
		callback(error, data);
	}

	/*
	Returns a JSON dict of the loaded data stored in a JSON file, cleaned from entries with uninteresting data.
	The data must be in the form of a dictionnary of dictionnaries.
	*/
	function cleanMatrixTradeData(jsonDictOfDict, callback) {
		// Deletes entries for which the data value is 0.
		for (var keyDict in jsonDictOfDict) {
				for (var keyCountry in jsonDictOfDict[keyDict]) {
						if (jsonDictOfDict[keyDict][keyCountry] == 0) {
							delete jsonDictOfDict[keyDict][keyCountry];
						}
					}
		}
		var error = null;
		var data = jsonDictOfDict;
		callback(error, data);
	}


	// Cleans all the loaded datasets
	queue()
		.defer(cleanMondialData, CocoaImpVal2011)
		.defer(cleanMondialData, CocoaImpQuan2011)
		.defer(cleanMondialData, CocoaExpVal2011)
		.defer(cleanMondialData, CocoaExpQuan2011)
		.defer(cleanMatrixTradeData, TradeMatrCocoaImpVal2011)
		.defer(cleanMatrixTradeData, TradeMatrCocoaImpQuan2011)
		.defer(cleanMatrixTradeData, TradeMatrCocoaExpVal2011)
		.defer(cleanMatrixTradeData, TradeMatrCocoaExpQuan2011)
		.defer(cleanMondialData, CocoaProdPrice2011)
		.defer(cleanMondialData, CocoaProdQuan2011)
		.defer(cleanMondialData, ChocoImpVal2011)
		.defer(cleanMondialData, ChocoImpQuan2011)
		.defer(cleanMondialData, ChocoExpVal2011)
		.defer(cleanMondialData, ChocoExpQuan2011)
		.defer(cleanMatrixTradeData, TradeMatrChocoImpVal2011)
		.defer(cleanMatrixTradeData, TradeMatrChocoImpQuan2011)
		.defer(cleanMatrixTradeData, TradeMatrChocoExpVal2011)
		.defer(cleanMatrixTradeData, TradeMatrChocoExpQuan2011)
		.await( function(error, cocoaImpVal2011, cocoaImpQuan2011, cocoaExpVal2011, cocoaExpQuan2011, 
			tradeMatrCocoaImpVal2011, tradeMatrCocoaImpQuan2011, tradeMatrCocoaExpVal2011, 
			tradeMatrCocoaExpQuan2011, cocoaProdPrice2011, cocoaProdQuan2011, chocoImpVal2011, 
			chocoImpQuan2011, chocoExpVal2011, chocoExpQuan2011, tradeMatrChocoImpVal2011, 
			tradeMatrChocoImpQuan2011, tradeMatrChocoExpVal2011, tradeMatrChocoExpQuan2011) {

			// Removes the "Loading..." div once the data is loaded and cleaned.
			d3.select("#loadDiv").remove();

			/*
			Draws the legend for the current visualisation.
			*/
			function drawLegend(rangesList, colorList) {
				document.getElementById("legendContainer").style.display = "none";
				
				// Rounds the numbers in rangesList, to avoid non-ending decimal numbers in the legend.
				for (var i = 0; i < rangesList.length; i ++) {
					rangesList[i] = Math.round(rangesList[i]);
				}

				// Size of colored squares in legend
				var squareSide = 17;
				var spacing = squareSide / 3;

				var legendWidth = squareSide * 10;
				var legendHeight = 5*squareSide + 4*spacing;

				var dataScale = d3.scale.linear();

				// Makes the svg for the legend.
				var legend = d3.select("#legendContainer")
					.select("svg")
					.attr("width", legendWidth)
					.attr("height", legendHeight)
					.append("g")
					.selectAll(".legend")
					.data(colorList)
					.enter()
					.append("g")
					.attr("class", "legend")
					.attr("transform", 
						function(d,i) {
							var horz = 0
						    var vert = legendHeight - squareSide - i*(squareSide + spacing);
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

			// Array used to make the title of the visualisation, according to the chosen parameters/the data
			// that is shown.
			// titleString is a global variable.
			var titleString = ["", "of", "", "", "", "", "", "in", ""];

			/*
			Colors the map according to the json data returned by clean MondialData().
			The data must be a json dictionnary, with country names as keys and data
			values as values. One data value only per country.
			@ param data: JSON dictionnary of the data.
			@ param scale: String that determines along which lines the color 
			scale is divided. Can be either "fraction" or "quantile".
			*/ 
			function colorMap(data, scale) {
				// List determining the colors used for visualisation.
				var colorList = ["#E6C76A", "#DD6F00", "#BB5E00", "#994D00", "#552B00"];

				// Changes the title according to what is now beeing visualised: mondial data per country.
				titleString[4] = "per country"; 
				titleString[5] = "";
				document.getElementById("title").innerHTML = titleString.join(" ");

				// Makes a map of the json data, so that the maximum value can be found easily.
				var dataMap = d3.map(data);
				var dataValUnsorted = dataMap.values();
				var max = d3.max(dataValUnsorted);

				// Colors the map according to data, when fraction is chosen as scale. 
				if (scale == "fraction") {
					// Determines the scale ranges to divide the data
					var oneFifth = max/5;
					var twoFifth = 2*max/5;
					var threeFifth = 3*max/5;
					var fourFifth = 4*max/5;

					// RangeList is used later to make the legend.
					var rangeList = [0, oneFifth, twoFifth, threeFifth, fourFifth, max];

					// Iterates over the data keys and colors the country according to the value of the corresponding data
					for (var keyCountry in data) {
						// Removes the spaces of the country string, in order to correspond
						// with the classes of the map. This is used to select the svg groups representing countries.
						var keyCountryClass = "." + keyCountry.replace(/[ ,']{1,}/g, "");

						if (data[keyCountry] < oneFifth) {
							d3.selectAll(keyCountryClass).style("fill", colorList[0]);
						}
						else if ((data[keyCountry] > oneFifth) && (data[keyCountry] < twoFifth)) {
							d3.selectAll(keyCountryClass).style("fill", colorList[1]);
						}
						else if ((data[keyCountry] > twoFifth) && (data[keyCountry] < threeFifth)) {
							d3.selectAll(keyCountryClass).style("fill", colorList[2]);
						}
						else if ((data[keyCountry] > threeFifth) && (data[keyCountry] < fourFifth)) {
							d3.selectAll(keyCountryClass).style("fill", colorList[3]);
						}
						else if (data[keyCountry] > fourFifth) {
							d3.selectAll(keyCountryClass).style("fill", colorList[4]);
						}
					}
				}

				// Function used to sort the data.
				function compareNumbers(a, b) {
						return a - b;
				}
				// Sorts the data so that quantiles can be made unsing d3.quantile
				var dataValues = dataValUnsorted.sort(compareNumbers);

				// Colors the map according to data, when quantile is chosen as scale. 
				if (scale == "quantile") {
					var firstQuant = d3.quantile(dataValues, 0.2);
					var secQuant = d3.quantile(dataValues, 0.4);
					var thirdQuant = d3.quantile(dataValues, 0.6);
					var fourthQuant = d3.quantile(dataValues, 0.8);
					var fifthQuant = d3.quantile(dataValues, 1); 

					// RangeList is used later to make the legend.
					var rangeList = [0, firstQuant,secQuant, thirdQuant, fourthQuant, fifthQuant];

					// Iterates over the data keys and colors the country according to the value of the corresponding data
					for (var keyCountry in data) {
						// Removes the spaces of the country string, in order to correspond
						// with the classes of the map. This is used to select the svg groups representing countries.
						var keyCountryClass = "." + keyCountry.replace(/[ ,']{1,}/g, "");

						if (data[keyCountry] < firstQuant) {
							d3.selectAll(keyCountryClass).style("fill", colorList[0]);
						}
						else if ((data[keyCountry] > firstQuant) && (data[keyCountry] < secQuant)) {
							d3.selectAll(keyCountryClass).style("fill", colorList[1]);
											}
						else if ((data[keyCountry] > secQuant) && (data[keyCountry] < thirdQuant)) {
							d3.selectAll(keyCountryClass).style("fill", colorList[2]);

						}
						else if ((data[keyCountry] > thirdQuant) && (data[keyCountry] < fourthQuant)) {
							d3.selectAll(keyCountryClass).style("fill", colorList[3]);

						}
						else if (data[keyCountry] > fourthQuant) {
							d3.selectAll(keyCountryClass).style("fill", colorList[4]);
						}
					}
				}

				// Draws legend.
				drawLegend(rangeList, colorList);

				// Adds data value to tooltip
				// (was for the most part copy-pasted from map_script.js)
				d3.selectAll(".country").on("mousemove", function (d,i) {
					if ((typeof data[d.properties.name] === "undefined") || (d.properties.name.replace(/[ ,']{1,}/g, "") == 0)) {
						var value = " ";
					} else {
						var value = data[d.properties.name];
					}
		      		
					var offsetL = document.getElementById('mapContainer').offsetLeft+20;
					var offsetT = document.getElementById('mapContainer').offsetTop+10;
					var mouse = d3.mouse(svg.node()).map( function(d) { return parseInt(d); } );

				    tooltip
				    	.classed("hidden", false)
				    	.attr("style", "left:"+(mouse[0]+offsetL)+"px;top:"+(mouse[1]+offsetT)+"px")
				        .html(d.properties.name + "<br>" + value);
				});

		    	d3.selectAll(".country").on("mouseout", function(d,i) {
		        		tooltip.classed("hidden", true);
		    	});
			    
			}

			/*
			Colors the map representing the trade relation between a selected country and its trade partners.
			This is done according to the matrix data map returned by 
			mapMatrixTradeData(dataFile), representing the connection between 
			countries. The data must be a json dictionnary, with country names as keys and 
			dictionnaries as values. The value dictionnaries must have 
			countries as keys and data values as values. 
			@ param dataMap: json data of the dictionnary of the 
			data.
			@ param scale: String that determines along which lines the color 
			scale is divided. Can be either "fraction" or "quantile".
			*/ 
			function matrColorMap(data, country, scale) {
				// List determining the colors used for the visualisation.
				var colorList = ["#E6C76A", "#DD6F00", "#BB5E00", "#994D00", "#552B00"];

				// Stores the dictionnary corresponding to the selected country in the variable 'coutryDict'.
				var dataMap = d3.map(data);
				var dataDictVal = dataMap.values();
				var countryDict = dataMap.get(country.properties.name);

				// Makes a js map of the coutry data and finds the max value.
				var countryMap = d3.map(countryDict);
				var countryValUnsorted = countryMap.values();
				var max = d3.max(countryValUnsorted);

				// Colors the map according to data, when fraction is chosen as scale.
				if (scale == "fraction") {
					var oneFifth = max/5;
					var twoFifth = 2*max/5;
					var threeFifth = 3*max/5;
					var fourFifth = 4*max/5;

					// RangeList is used later to make the legend.
					var rangeList = [0, oneFifth, twoFifth, threeFifth, fourFifth, max];

					// Colors the world map according to data and scale.
					for (var keyCountry in countryDict) {
						// Removes the spaces of the country string, in order to correspond
						// with the classes of the map. This is used to select the svg groups representing countries.
						var keyCountryClass = "." + keyCountry.replace(/[ ,']{1,}/g, "");

						if (countryDict[keyCountry] < oneFifth) {
							d3.selectAll(keyCountryClass).style("fill", colorList[0]);
						}
						else if ((countryDict[keyCountry] > oneFifth) && (countryDict[keyCountry] < twoFifth)) {
							d3.selectAll(keyCountryClass).style("fill", colorList[1]);
						}
						else if ((countryDict[keyCountry] > twoFifth) && (countryDict[keyCountry] < threeFifth)) {
							d3.selectAll(keyCountryClass).style("fill", colorList[2]);
						}
						else if ((countryDict[keyCountry] > threeFifth) && (countryDict[keyCountry] < fourFifth)) {
							d3.selectAll(keyCountryClass).style("fill", colorList[3]);
						}
						else if (countryDict[keyCountry] > fourFifth) {
							d3.selectAll(keyCountryClass).style("fill", colorList[4]);
						}
					}
				}

				// Function used to sort the data, so that quantiles can be made using d3.quantile.
				function compareNumbers(a, b) {
						return a - b;
				}

				// Sorts the data so that d3.quantile can be used.
				var countryValSorted = countryValUnsorted.sort(compareNumbers);

				// Colors the map according to data, when quantile is chosen as scale.
				if (scale == "quantile") {
					var firstQuant = d3.quantile(countryValSorted, 0.2);
					var secQuant = d3.quantile(countryValSorted, 0.4);
					var thirdQuant = d3.quantile(countryValSorted, 0.6);
					var fourthQuant = d3.quantile(countryValSorted, 0.8);
					var fifthQuant = d3.quantile(countryValSorted, 1);

					// RangeList is used later to make the legend.
					var rangeList = [0, firstQuant, secQuant, thirdQuant, fourthQuant, fifthQuant];

					// Colors the world map according to data and scale.
					for (var keyCountry in data) {
						// Removes the spaces of the country string, in order to correspond
						// with the classes of the map. This is used to select the svg groups representing countries.
						var keyCountryClass = "." + keyCountry.replace(/[ ,']{1,}/g, "");

						if (countryDict[keyCountry] < firstQuant) {
							d3.selectAll(keyCountryClass).style("fill", colorList[0]);
						}
						else if ((countryDict[keyCountry] > firstQuant) && (countryDict[keyCountry] < secQuant)) {
							d3.selectAll(keyCountryClass).style("fill", colorList[1]);
						}
						else if ((countryDict[keyCountry] > secQuant) && (countryDict[keyCountry] < thirdQuant)) {
							d3.selectAll(keyCountryClass).style("fill", colorList[2]);
						}
						else if ((countryDict[keyCountry] > thirdQuant) && (countryDict[keyCountry] < fourthQuant)) {
							d3.selectAll(keyCountryClass).style("fill", colorList[3]);
						}
						else if (countryDict[keyCountry] > fourthQuant) {
							d3.selectAll(keyCountryClass).style("fill", colorList[4]);
						}
					}	
				}

				// Draws the legend.
				drawLegend(rangeList, colorList);

				// Add data value to tooltip
				d3.selectAll(".country")
					.on("mousemove", function (d,i) {
						if ((typeof countryDict[d.properties.name] === "undefined") ||
														(d.properties.name.replace(/[ ,']{1,}/g, "") == 0)) {
							var value = " ";
						} else {
							var value = countryDict[d.properties.name];
						}
									      		
						var offsetL = document.getElementById('mapContainer').offsetLeft+20;
						var offsetT = document.getElementById('mapContainer').offsetTop+10;
						var mouse = d3.mouse(svg.node()).map( function(d) { return parseInt(d); } );
						
				      	tooltip.classed("hidden", false)
				             .attr("style", "left:"+(mouse[0]+offsetL)+"px;top:"+(mouse[1]+offsetT)+"px")
				             .html(d.properties.name + "<br>" + value);
				    })

			    	.on("mouseout",  function(d,i) {
			        	tooltip.classed("hidden", true);
			    	});
			}

			/*
			Erase all custom fills and strokes on the map.
			*/
			function resetVis() {
				d3.selectAll(".country")
				 	.style("fill", "grey")
				 	.style("stroke", "none");

				d3.selectAll(".contry:hover")
					.style("stroke", "white")
					.style("stroke-width","1.5px");

				d3.select("#legendContainer").select("svg > *").remove();
			}

			// Selected country is a global variable that stores if a country is selected by the user, and, if so, which country is selected.
			var selectedCountry = null;

			/*
			Does miscellaneous little tasks that need to be done when the user clicks on a country.
			@ param country: d3 selection of a country
			*/
			function selectCountry(country) {
				// Modifies the global variable selectedCountry
				selectedCountry = country

				// Encircles the selected country
				d3.selectAll("." + country.properties.name.replace(/[ ,']{1,}/g, "")).style("stroke", "black");

				// Changes the title of the visualisation, based on the name of the selected country
				if (document.getElementById("radioExport").checked == true) {
					titleString[4] = "from";
				} else { if (document.getElementById("radioImport").checked == true) {
					titleString[4] = "to";
				}}
				titleString[5] = country.properties.name;

				document.getElementById("title").innerHTML = titleString.join(" ");

				// Makes a button to go back to the mondial representation of the data
				d3.select("#title").append("input").attr("type","button").attr("class","button")
				.attr("value", "<-    Go back to mondial")
				.on("click", function () {
					selectedCountry = null;
					dataParam();
				});
			}

			/*
			Writes the content of the div with information about the country that is selected by user.
			Writes a standard text if no country is selected. 
			*/
			function fillCountryInfo(d) {
				var tabs = "&nbsp;&nbsp;&nbsp"

				d3.select("#countryInfoContainer").html(
					"<span class='italic smallText'>Information about selected country:</span>"
					+ "<br><span id='bold'>" + d.properties.name + "</span><br>"
					+ "<br>" + tabs + "Cocoa farmer earnings: <br>"  + tabs + tabs + cocoaProdPrice2011[d.properties.name] + " US dollars/year"
					+ "<br>" + tabs + "Production of cocoa: <br>" + tabs + tabs + cocoaProdQuan2011[d.properties.name] + " tonnes/year"
					+ "<br>" + tabs + "Import Quantity of Cocoa: <br>" + tabs + tabs + cocoaImpQuan2011[d.properties.name] + " tonnes/year"
					+ "<br>" + tabs + "Import Value of Cocoa: <br>" + tabs + tabs + cocoaImpVal2011[d.properties.name] + " US dollars/year"
					+ "<br>" + tabs + "Export Quantity of Cocoa: <br>" + tabs + tabs + cocoaExpQuan2011[d.properties.name] + " tonnes/year"
					+ "<br>" + tabs + "Export Value of Cocoa: <br>" + tabs + tabs + cocoaExpVal2011[d.properties.name] + " US dollars/year"
					+ "<br>" + tabs + "Import Quantity of Chocolate: <br>" + tabs + tabs + chocoImpQuan2011[d.properties.name] + " tonnes/year"
					+ "<br>" + tabs + "Import Value of Chocolate: <br>" + tabs + tabs + chocoImpVal2011[d.properties.name] + " US Dollars/year"
					+ "<br>" + tabs + "Export Quantity of Chocolate: <br>" + tabs + tabs + chocoExpQuan2011[d.properties.name] + " tonnes/year"
					+ "<br>" + tabs + "Export Value of Chocolate: <br>" + tabs + tabs + chocoExpVal2011[d.properties.name] + " US dollars/year"
				);
			}

			/* 
			Calls the right map coloring function, according to the parameters 
			chosen by user.
			*/
			function dataParam() {
				resetVis();
				var country = d3.selectAll(".country");

				var scale = "fraction";

				if (document.getElementById("radioFractions").checked == true){
					scale = "fraction";	
				}			
				if (document.getElementById("radioQuantiles").checked == true){
					scale = "quantile";
				}

				// If no country is selected, colors the map according to mondial data.
				// selectedCountry is a global variable
				if (selectedCountry === null) {
					// Empties the div possibly showing information about previously selected country.
					d3.select("#countryInfoContainer").html("<span class='italic smallText'>Information about selected country:</span>"
						+"<br><br> No country is selected <br> (Counries can only be selected, when the parameter 'Export' or 'Import'"
						+ " is chosen.)");

					// Checks which parameters are chosen by user, and calls the right coloring functions.
					// Also sets the right onClick events if clicking on countries should result in showing other data.
					if (document.getElementById("radioCocoa").checked == true){
						if (document.getElementById("radioImport").checked == true){
							if (document.getElementById("radioVal").checked == true) {

								colorMap(cocoaImpVal2011, scale);

								country.on("click", function(d,i) {
									resetVis(); 
									selectCountry(d);
									fillCountryInfo(d);
									matrColorMap(tradeMatrCocoaImpVal2011, d, scale);
								});
							}	
							if (document.getElementById("radioQuan").checked == true) {
								colorMap(cocoaImpQuan2011, scale);

								country.on("click", function(d,i) {
									resetVis(); 
									selectCountry(d);
									fillCountryInfo(d);
									matrColorMap(tradeMatrCocoaImpQuan2011, d, scale);
								});
							}
						}
						if (document.getElementById("radioExport").checked == true){
							if (document.getElementById("radioVal").checked == true) {
								colorMap(cocoaExpVal2011, scale);

								country.on("click", function(d,i) {
									resetVis(); 
									selectCountry(d);
									fillCountryInfo(d);
									matrColorMap(tradeMatrCocoaExpVal2011, d, scale);
								});
							}	
							if (document.getElementById("radioQuan").checked == true) {
								colorMap(cocoaExpQuan2011, scale);

								country.on("click", function(d,i) {
									resetVis(); 
									selectCountry(d);
									fillCountryInfo(d);
									matrColorMap(tradeMatrCocoaExpQuan2011, d, scale);
								});
							}
						}
						if (document.getElementById("radioPrice").checked == true) {
							colorMap(cocoaProdPrice2011, scale);

							country.on("click", function(d,i) { 
								// do nothing
							});
						}
						if (document.getElementById("radioProduction").checked == true) {
							colorMap(cocoaProdQuan2011, scale);

							country.on("click", function(d,i) { 
								// do nothing
							});
						}
					}

					if (document.getElementById("radioChoco").checked == true) {
						if (document.getElementById("radioImport").checked == true) {
							if (document.getElementById("radioVal").checked == true) {
								colorMap(chocoImpVal2011, scale);

								country.on("click", function(d,i) {
									resetVis(); 
									selectCountry(d);
									fillCountryInfo(d);
									matrColorMap(tradeMatrChocoImpVal2011, d, scale);
								});
							}	
							if (document.getElementById("radioQuan").checked == true) {
								colorMap(chocoImpQuan2011, scale);

								country.on("click", function(d,i) {
									resetVis(); 
									selectCountry(d);
									fillCountryInfo(d);
									matrColorMap(tradeMatrChocoImpQuan2011, d, scale);
								});
							}
						}
						if (document.getElementById("radioExport").checked == true) {
							if (document.getElementById("radioVal").checked == true) {
								colorMap(chocoExpVal2011, scale);

								country.on("click", function(d,i) {
									resetVis(); 
									selectCountry(d);
									fillCountryInfo(d);
									matrColorMap(tradeMatrChocoExpVal2011, d, scale);
								});
							}	
							if (document.getElementById("radioQuan").checked == true) {
								colorMap(chocoExpQuan2011, scale);

								country.on("click", function(d,i) {
									resetVis(); 
									selectCountry(d);
									fillCountryInfo(d);
									matrColorMap(tradeMatrChocoExpQuan2011, d, scale);
								});
							}	
						}
						if (document.getElementById("radioPrice").checked == true) {
							country.on("click", function(d,i) { 
								// do nothing
							});

						}
						if (document.getElementById("radioProduction").checked == true) {
							country.on("click", function(d,i) { 
								// do nothing
							});

						}
					}
				} 

				// If a parameter is changed while a country is selected, colors the map according to the parameter data
				// for that country. selectedCountry is a global variable.
				else {
					if (document.getElementById("radioCocoa").checked == true){
						if (document.getElementById("radioImport").checked == true){
							if (document.getElementById("radioVal").checked == true) {
								resetVis(); 
								selectCountry(selectedCountry);
								matrColorMap(tradeMatrCocoaImpVal2011,  selectedCountry, scale);
							}	
							if (document.getElementById("radioQuan").checked == true) {
								resetVis(); 
								selectCountry(selectedCountry);
								matrColorMap(tradeMatrCocoaImpQuan2011, selectedCountry, scale);
							}
						}
						if (document.getElementById("radioExport").checked == true){
							if (document.getElementById("radioVal").checked == true) {
								resetVis(); 
								selectCountry(selectedCountry);
								matrColorMap(tradeMatrCocoaExpVal2011, selectedCountry, scale);
							}	
							if (document.getElementById("radioQuan").checked == true) {
								resetVis(); 
								selectCountry(selectedCountry);
								matrColorMap(tradeMatrCocoaExpQuan2011, selectedCountry, scale);
							}
						}
						if (document.getElementById("radioPrice").checked == true) {
							resetVis(); 
							selectCountry(selectedCountry);
						}
						if (document.getElementById("radioProduction").checked == true) {
							resetVis(); 
							selectCountry(selectedCountry);
						}
					}
					if (document.getElementById("radioChoco").checked == true) {
						if (document.getElementById("radioImport").checked == true) {
							if (document.getElementById("radioVal").checked == true) {
								resetVis(); 
								selectCountry(selectedCountry);
								matrColorMap(tradeMatrChocoImpVal2011, selectedCountry, scale);
							}	
							if (document.getElementById("radioQuan").checked == true) {
								resetVis(); 
								selectCountry(selectedCountry);
								matrColorMap(tradeMatrChocoImpQuan2011, selectedCountry, scale);
							}
						}
						if (document.getElementById("radioExport").checked == true) {
							if (document.getElementById("radioVal").checked == true) {
								resetVis(); 
								selectCountry(selectedCountry);
								matrColorMap(tradeMatrChocoExpVal2011, selectedCountry, scale);
							}	
							if (document.getElementById("radioQuan").checked == true) {
								resetVis(); 
								selectCountry(selectedCountry);
								matrColorMap(tradeMatrChocoExpQuan2011, selectedCountry, scale);
							}	
						}
						if (document.getElementById("radioPrice").checked == true) {
							resetVis(); 
							selectCountry(selectedCountry);
						}
						if (document.getElementById("radioProduction").checked == true) {
							resetVis(); 
							selectCountry(selectedCountry);
						}
					}
				} 
			}

			// The functions below make sure two radio buttons are not checked at the same time if they encode different data.
			// They also globally encode which strings are to be used in the title of the visualisation.
			// The also hide and show the radio buttons that are not always active.
			function cocoaCheck() {
				document.getElementById("radioChoco").checked = false;
				titleString[2] = "cocoa beans";

				document.getElementById("radioProduction").disabled = false;
				document.getElementById("textProduction").style.color = "black";
				document.getElementById("radioPrice").disabled = false;
				document.getElementById("textPrice").style.color = "black";
			}
			function chocoCheck() {
				document.getElementById("radioCocoa").checked = false;
				titleString[2] = "chocolate products";

				document.getElementById("radioProduction").disabled = true;
				document.getElementById("textProduction").style.color = "grey"
				document.getElementById("radioPrice").disabled = true;
				document.getElementById("textPrice").style.color = "grey"
			}
			function importCheck() {
				document.getElementById("radioExport").checked = false;
				document.getElementById("radioPrice").checked = false;
				document.getElementById("radioProduction").checked = false;
				titleString[0] = "Import";
				titleString[3] = "";
				if (document.getElementById("radioVal").checked == true) {
					titleString[8] = "thousands US dollars per year";
				}
				if (document.getElementById("radioQuan").checked == true) {
					titleString[8] = "tonnes per year";
				}

				d3.select("#valAndQuan").classed("hidden", false);
				document.getElementById("textQuan").style.color = "black";
				document.getElementById("textVal").style.color = "black";
			}
			function exportCheck() {
				document.getElementById("radioImport").checked = false;
				document.getElementById("radioPrice").checked = false;
				document.getElementById("radioProduction").checked = false;
				titleString[0] = "Export";
				titleString[3] = "";
				if (document.getElementById("radioVal").checked == true) {
					titleString[8] = "thousands US dollars per year";
				}
				if (document.getElementById("radioQuan").checked == true) {
					titleString[8] = "tonnes per year";
				}

				d3.select("#valAndQuan").classed("hidden", false);
				document.getElementById("textQuan").style.color = "black";
				document.getElementById("textVal").style.color = "black";
			}
			function priceCheck() {
				document.getElementById("radioImport").checked = false;
				document.getElementById("radioExport").checked = false;
				document.getElementById("radioProduction").checked = false;
				titleString[0] = "Earnings";
				titleString[3] = "farmers";
				titleString[8] = "US dollars per tonne cacao";

				d3.select("#valAndQuan").classed("hidden", true);
				document.getElementById("textQuan").style.color = "grey";
				document.getElementById("textVal").style.color = "grey";
			}
			function productionCheck() {
				document.getElementById("radioImport").checked = false;
				document.getElementById("radioExport").checked = false;
				document.getElementById("radioPrice").checked = false;
				titleString[0] = "Production";
				titleString[3] = "";
				titleString[8] = "tonnes per year";

				d3.select("#valAndQuan").classed("hidden", true);
				document.getElementById("textQuan").style.color = "grey";
				document.getElementById("textVal").style.color = "grey";
			}
			function valCheck() {
				document.getElementById("radioQuan").checked = false;
				titleString[8] = "thousand US dollars per year";
			}
			function quanCheck() {
				document.getElementById("radioVal").checked = false;
				titleString[8] = "tonnes per year";
			}
			function fractionCheck() {
				document.getElementById("radioQuantiles").checked = false;
			}
			function quantileCheck() {
				document.getElementById("radioFractions").checked = false;
			}

			/*
			Sets the functions that are executed when the user checks or unchecks a radio button.
			*/
			function setRadioButtonsBehaviour() {
				d3.select("#radioCocoa").on("change", function(d,i) {cocoaCheck(); dataParam();} );
				d3.select("#radioChoco").on("change", function(d,i) {chocoCheck(); dataParam();} );
				d3.select("#radioImport").on("change", function(d,i) {importCheck(); dataParam();} );
				d3.select("#radioExport").on("change", function(d,i) {exportCheck(); dataParam();} );
				d3.select("#radioPrice").on("change", function(d,i) {priceCheck(); dataParam();} );
				d3.select("#radioProduction").on("change", function(d,i) {productionCheck(); dataParam();} );
				d3.select("#radioFractions").on("change", function(d,i) {fractionCheck(); dataParam();} );
				d3.select("#radioQuantiles").on("change", function(d,i) {quantileCheck(); dataParam();} );
				d3.select("#radioVal").on("change", function(d,i) {valCheck(); dataParam();} );
				d3.select("#radioQuan").on("change", function(d,i) {quanCheck(); dataParam();} );
			}

			setRadioButtonsBehaviour();

			// Redraws and recolors the visualisation when the window is resized. 
			// Most of this code was copy-pasted from map_script.js, the original can be found at 
			// http://techslides.com/demos/d3/worldmap-template.html
			d3.select(window).on("resize", throttle);

			var throttleTimer;
			function throttle() {
			  window.clearTimeout(throttleTimer);
			    throttleTimer = window.setTimeout(function() {
			      redraw();
			    }, 200);
			}

			function redraw() {
			  width = document.getElementById('mapContainer').offsetWidth;
			  height = width / 2;
			  d3.select('#svgMap').remove();
			  setup(width,height);
			  draw(topo);
			  dataParam();
			}

			/*
			Sets parameters in the menu, so that data is visualised when opening the page, without the user having to make choices yet.
			Is called right after the data loads.
			*/
			function initVis() {
				document.getElementById("radioCocoa").checked = true;
				document.getElementById("radioImport").checked = true;
				document.getElementById("radioFractions").checked = true;
				document.getElementById("radioQuan").checked = true;

				cocoaCheck(); 
				importCheck(); 
				fractionCheck(); 
				quanCheck(); 

				dataParam();
			}

			initVis();

		// This bracket closes the function called by await in the second queue.
		});
// This bracket closes scriptCode(), which is called by await in the first queue, and which contains almost all the code of script.js
}