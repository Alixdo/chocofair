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
	// var checkWidth = document.getElementById("body").offsetWidth - margin_left - 14;	
	document.getElementById("rightColumn").style.marginLeft = marginLeft.toString() + "px";
	// document.getElementById("rightColumn").style.width = checkWidth.toString() + "px";
}

/*
Returns a js map of the loaded data stored in a JSON file. The data
must be in the form of a dictionnary.
*/
function mapMondialData(jsonDict, callback) {
	console.log(jsonDict);
	// Deletes entries for which the data value is 0.
	// (For example, a country that imports 0 cocoa will not be
	// visualised.)
	for (var keyCountry in jsonDict) {
		if (jsonDict[keyCountry] == 0) {
			delete jsonDict[keyCountry];
		}
	}
	var error = null;
	var data = d3.map(jsonDict);
	callback(error, data);
}

/*
Returns a js map of the loaded data stored in a JSON file. The data
must be in the form of a dictionnary of dictionnaries.
*/
function mapNationalData(jsonDictOfDict, callback) {
	console.log(jsonDictOfDict);

	// Deletes entries for which the data value is 0.
	for (var keyDict in jsonDictOfDict) {
		// console.log(keyDict);
		// if (jsonDictOfDict.hasOwnProperty(keyDict)) {
			// console.log("key1", keyDict);
			// console.log(jsonDictOfDict[keyDict]);

			for (var keyCountry in jsonDictOfDict[keyDict]) {
				// if (keyDict.hasOwnProperty(keyCountry)) {
					// console.log("key2", keyCountry);
					if (jsonDictOfDict[keyDict][keyCountry] == 0) {
						// console.log("oh", jsonDictOfDict[keyDict][keyCountry]);
						delete jsonDictOfDict[keyDict][keyCountry];
					}
				}
			// }
		// }
	}
	var error = null;
	var data = d3.map(jsonDictOfDict);
	callback(error, data);
}

// Global variables:

	// Array used to make the title of the visualisation, according to the chosen parameters/the data
	// that is shown.
	// titleString is a global variable.
	var titleString = ["", "of", "", "", "", "", "", "in", ""];

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
	
	console.log( CocoaImpVal2011);
	console.log( CocoaImpQuan2011, CocoaExpVal2011, CocoaExpQuan2011, TradeMatrCocoaImpVal2011, TradeMatrCocoaImpQuan2011,
	TradeMatrCocoaExpVal2011, TradeMatrCocoaExpQuan2011, CocoaProdPrice2011, CocoaProdQuan2011, ChocoImpVal2011, ChocoImpQuan2011,
	ChocoExpVal2011, ChocoExpQuan2011, TradeMatrChocoImpVal2011, TradeMatrChocoImpQuan2011, TradeMatrChocoExpVal2011, 
	TradeMatrChocoExpQuan2011);
	// // Maps all loaded data. The maps ares stored in global variables.
	// var cocoaImpVal2011DataMap = null
	// var cocoaImpQuan2011DataMap = null
	// var cocoaExpVal2011DataMap = null
	// var cocoaExpQuan2011DataMap = null

	// var tradeMatrCocoaImpVal2011DataMap = null
	// var tradeMatrCocoaImpQuan2011DataMap = null
	// var tradeMatrCocoaExpVal2011DataMap = null
	// var tradeMatrCocoaExpQuan2011DataMap = null

	// var cocoaProdPrice2011DataMap = null
	// var cocoaProdQuan2011DataMap = null

	// var chocoImpVal2011DataMap = null
	// var chocoImpQuan2011DataMap = null
	// var chocoExpVal2011DataMap = null
	// var chocoExpQuan2011DataMap = null

	// var tradeMatrChocoImpVal2011DataMap = null
	// var tradeMatrChocoImpQuan2011DataMap = null
	// var tradeMatrChocoExpVal2011DataMap = null
	// var tradeMatrChocoExpQuan2011DataMap = null

	// function mapAllData() {
	// 	cocoaImpVal2011DataMap = mapMondialData(CocoaImpVal2011);
	// 	cocoaImpQuan2011DataMap = mapMondialData(CocoaImpQuan2011);
	// 	cocoaExpVal2011DataMap = mapMondialData(CocoaExpVal2011);
	// 	cocoaExpQuan2011DataMap = mapMondialData(CocoaExpQuan2011);

	// 	tradeMatrCocoaImpVal2011DataMap = mapNationalData(TradeMatrCocoaImpVal2011);
	// 	tradeMatrCocoaImpQuan2011DataMap = mapNationalData(TradeMatrCocoaImpQuan2011);
	// 	tradeMatrCocoaExpVal2011DataMap = mapNationalData(TradeMatrCocoaExpVal2011);
	// 	tradeMatrCocoaExpQuan2011DataMap = mapNationalData(TradeMatrCocoaExpQuan2011);

	// 	cocoaProdPrice2011DataMap = mapMondialData(CocoaProdPrice2011);
	// 	cocoaProdQuan2011DataMap = mapMondialData(CocoaProdQuan2011);

	// 	chocoImpVal2011DataMap = mapMondialData(ChocoImpVal2011);
	// 	chocoImpQuan2011DataMap = mapMondialData(ChocoImpQuan2011);
	// 	chocoExpVal2011DataMap = mapMondialData(ChocoExpVal2011);
	// 	chocoExpQuan2011DataMap = mapMondialData(ChocoExpQuan2011);

	// 	tradeMatrChocoImpVal2011DataMap = mapNationalData(TradeMatrChocoImpVal2011);
	// 	tradeMatrChocoImpQuan2011DataMap = mapNationalData(TradeMatrChocoImpQuan2011);
	// 	tradeMatrChocoExpVal2011DataMap = mapNationalData(TradeMatrChocoExpVal2011);
	// 	tradeMatrChocoExpQuan2011DataMap = mapNationalData(TradeMatrChocoExpQuan2011);

	// }

	queue()
		.defer(mapMondialData, CocoaImpVal2011)
		.defer(mapMondialData, CocoaImpQuan2011)
		.defer(mapMondialData, CocoaExpVal2011)
		.defer(mapMondialData, CocoaExpQuan2011)
		.defer(mapNationalData, TradeMatrCocoaImpVal2011)
		.defer(mapNationalData, TradeMatrCocoaImpQuan2011)
		.defer(mapNationalData, TradeMatrCocoaExpVal2011)
		.defer(mapNationalData, TradeMatrCocoaExpQuan2011)
		.defer(mapMondialData, CocoaProdPrice2011)
		.defer(mapMondialData, CocoaProdQuan2011)
		.defer(mapMondialData, ChocoImpVal2011)
		.defer(mapMondialData, ChocoImpQuan2011)
		.defer(mapMondialData, ChocoExpVal2011)
		.defer(mapMondialData, ChocoExpQuan2011)
		.defer(mapNationalData, TradeMatrChocoImpVal2011)
		.defer(mapNationalData, TradeMatrChocoImpQuan2011)
		.defer(mapNationalData, TradeMatrChocoExpVal2011)
		.defer(mapNationalData, TradeMatrChocoExpQuan2011)
		.await( function(error, cocoaImpVal2011DataMap, cocoaImpQuan2011DataMap, cocoaExpVal2011DataMap, cocoaExpQuan2011DataMap, 
			tradeMatrCocoaImpVal2011DataMap, tradeMatrCocoaImpQuan2011DataMap, tradeMatrCocoaExpVal2011DataMap, 
			tradeMatrCocoaExpQuan2011DataMap, cocoaProdPrice2011DataMap, cocoaProdQuan2011DataMap, chocoImpVal2011DataMap, 
			chocoImpQuan2011DataMap, chocoExpVal2011DataMap, chocoExpQuan2011DataMap, tradeMatrChocoImpVal2011DataMap, 
			tradeMatrChocoImpQuan2011DataMap, tradeMatrChocoExpVal2011DataMap, tradeMatrChocoExpQuan2011DataMap) {

			d3.select("#loadDiv").remove();
			console.log(cocoaImpVal2011DataMap);
			/*
			Sets the standard parameters, shown when the page loads.
			initVis is called on load in index.html.
			*/
			function initVis() {
				document.getElementById("checkboxCocoa").checked = true;
				document.getElementById("checkboxImport").checked = true;
				document.getElementById("checkboxFractions").checked = true;
				document.getElementById("checkboxQuan").checked = true;

				cocoaCheck(); 
				importCheck(); 
				fractionCheck(); 
				quanCheck(); 

				dataParam();
			}

			setCheckboxBehaviour();

			/*
			Sets the functions that are executed when the user checks or unchecks a checkbox.
			*/
			function setCheckboxBehaviour() {
				d3.select("#checkboxCocoa").on("change", function(d,i) {cocoaCheck(); dataParam();} );
				d3.select("#checkboxChoco").on("change", function(d,i) {chocoCheck(); dataParam();} );
				d3.select("#checkboxImport").on("change", function(d,i) {importCheck(); dataParam();} );
				d3.select("#checkboxExport").on("change", function(d,i) {exportCheck(); dataParam();} );
				d3.select("#checkboxPrice").on("change", function(d,i) {priceCheck(); dataParam();} );
				d3.select("#checkboxProduction").on("change", function(d,i) {productionCheck(); dataParam();} );
				d3.select("#checkboxFractions").on("change", function(d,i) {fractionCheck(); dataParam();} );
				d3.select("#checkboxQuantiles").on("change", function(d,i) {quantileCheck(); dataParam();} );
				d3.select("#checkboxVal").on("change", function(d,i) {valCheck(); dataParam();} );
				d3.select("#checkboxQuan").on("change", function(d,i) {quanCheck(); dataParam();} );
			}

			// Makes sure two checkboxes are not checked at the same time if they encode different data.
			// Globally encodes which strings are to be used in the title of the visualisation.
			function cocoaCheck() {
				document.getElementById("checkboxChoco").checked = false;
				titleString[2] = "cocoa beans";

				document.getElementById("checkboxProduction").disabled = false;
				document.getElementById("textProduction").style.color = "black";
				document.getElementById("checkboxPrice").disabled = false;
				document.getElementById("textPrice").style.color = "black";
			}
			function chocoCheck() {
				document.getElementById("checkboxCocoa").checked = false;
				titleString[2] = "chocolate products";

				document.getElementById("checkboxProduction").disabled = true;
				document.getElementById("textProduction").style.color = "grey"
				document.getElementById("checkboxPrice").disabled = true;
				document.getElementById("textPrice").style.color = "grey"
			}
			function importCheck() {
				document.getElementById("checkboxExport").checked = false;
				document.getElementById("checkboxPrice").checked = false;
				document.getElementById("checkboxProduction").checked = false;
				titleString[0] = "Import";
				titleString[3] = "";
				if (document.getElementById("checkboxVal").checked == true) {
					titleString[8] = "thousands US dollars per year";
				}
				if (document.getElementById("checkboxQuan").checked == true) {
					titleString[8] = "tonnes per year";
				}

				document.getElementById("checkboxQuan").disabled = false;
				document.getElementById("textQuan").style.color = "black";
				document.getElementById("checkboxVal").disabled = false;
				document.getElementById("textVal").style.color = "black";
			}
			function exportCheck() {
				document.getElementById("checkboxImport").checked = false;
				document.getElementById("checkboxPrice").checked = false;
				document.getElementById("checkboxProduction").checked = false;
				titleString[0] = "Export";
				titleString[3] = "";
				if (document.getElementById("checkboxVal").checked == true) {
					titleString[8] = "thousands US dollars per year";
				}
				if (document.getElementById("checkboxQuan").checked == true) {
					titleString[8] = "tonnes per year";
				}

				document.getElementById("checkboxQuan").disabled = false;
				document.getElementById("textQuan").style.color = "black";
				document.getElementById("checkboxVal").disabled = false;
				document.getElementById("textVal").style.color = "black";
			}
			function priceCheck() {
				document.getElementById("checkboxImport").checked = false;
				document.getElementById("checkboxExport").checked = false;
				document.getElementById("checkboxProduction").checked = false;
				titleString[0] = "Earnings";
				titleString[3] = "farmers";
				titleString[8] = "US dollars per tonne cacao";

				document.getElementById("checkboxQuan").disabled = true;
				document.getElementById("textQuan").style.color = "grey";
				document.getElementById("checkboxVal").disabled = true;
				document.getElementById("textVal").style.color = "grey";
			}
			function productionCheck() {
				document.getElementById("checkboxImport").checked = false;
				document.getElementById("checkboxExport").checked = false;
				document.getElementById("checkboxPrice").checked = false;
				titleString[0] = "Production";
				titleString[3] = "";
				titleString[8] = "tonnes per year";

				document.getElementById("checkboxQuan").disabled = true;
				document.getElementById("textQuan").style.color = "grey";
				document.getElementById("checkboxVal").disabled = true;
				document.getElementById("textVal").style.color = "grey";
			}
			function fractionCheck() {
				document.getElementById("checkboxQuantiles").checked = false;
			}
			function quantileCheck() {
				document.getElementById("checkboxFractions").checked = false;
			}
			function valCheck() {
				document.getElementById("checkboxQuan").checked = false;
				titleString[8] = "thousand US dollars per year";
			}
			function quanCheck() {
				document.getElementById("checkboxVal").checked = false;
				titleString[8] = "tonnes per year";
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

			// setTimeout(function(){
			// 	var defer1 = $.Deferred();
			// 	document.getElementById("checkboxChoco").checked = true;
			// 	defer1.resolve();
			// 	defer1.done(function defer2() { var defer2 = $.Deferred(); document.getElementById("checkboxExport").checked = true; defer2.resolve();});

			// 	defer2.done( function defer3() { var defer3 = $.Deferred(); document.getElementById("checkboxFractions").checked = true; defer3.resolve();});
				
			// 	defer3.done( function miew() {document.getElementById("checkboxVal").checked = true;});
			// 	// dataParam();
			// // document.getElementById("checkboxCocoa").checked = true;
			// // document.getElementById("checkboxExport").checked = true;
			// // document.getElementById("checkboxFractions").checked = true;
			// // document.getElementById("checkboxVal").checked = true;
			// }, 1000);

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

				// If no country is selected, colors the map according to mondial data.
				// selectedCountry is a global variable.
				if (selectedCountry === null) {
					if (document.getElementById("checkboxCocoa").checked == true){
						if (document.getElementById("checkboxImport").checked == true){
							if (document.getElementById("checkboxVal").checked == true) {

								colorMap(cocoaImpVal2011DataMap, scale);

								country.on("click", function(d,i) {
									resetVis();
									matrColorMap(tradeMatrCocoaImpVal2011DataMap, d, scale);
								});
							}	
							if (document.getElementById("checkboxQuan").checked == true) {
								colorMap(cocoaImpQuan2011DataMap, scale);

								country.on("click", function(d,i) {
									resetVis();
									matrColorMap(tradeMatrCocoaImpQuan2011DataMap, d, scale);
								});
							}
						}
						if (document.getElementById("checkboxExport").checked == true){
							if (document.getElementById("checkboxVal").checked == true) {
								colorMap(_CocoaExpVal2011DataMap, scale);

								country.on("click", function(d,i) {
									resetVis();
									matrColorMap(tradeMatrCocoaExpVal2011DataMap, d, scale);
								});
							}	
							if (document.getElementById("checkboxQuan").checked == true) {
								colorMap(_CocoaExpQuan2011DataMap, scale);

								country.on("click", function(d,i) {
									resetVis();
									matrColorMap(tradeMatrCocoaExpQuan2011DataMap, d, scale);
								});
							}
						}
						if (document.getElementById("checkboxPrice").checked == true) {
							colorMap(cocoaProdPrice2011DataMap, scale);

							country.on("click", function(d,i) { 
								// do nothing
							});
						}
						if (document.getElementById("checkboxProduction").checked == true) {
							colorMap(cocoaProdQuan2011DataMap, scale);

							country.on("click", function(d,i) { 
								// do nothing
							});
						}
					}
					if (document.getElementById("checkboxChoco").checked == true) {
						if (document.getElementById("checkboxImport").checked == true) {
							if (document.getElementById("checkboxVal").checked == true) {
								colorMap(chocoImpVal2011DataMap, scale);

								country.on("click", function(d,i) {
									resetVis();
									matrColorMap(tradeMatrChocoImpVal2011DataMap, d, scale);
								});
							}	
							if (document.getElementById("checkboxQuan").checked == true) {
								colorMap(chocoImpQuan2011DataMap, scale);

								country.on("click", function(d,i) {
									resetVis();
									matrColorMap(tradeMatrChocoImpQuan2011DataMap, d, scale);
								});
							}
						}
						if (document.getElementById("checkboxExport").checked == true) {
							if (document.getElementById("checkboxVal").checked == true) {
								colorMap(chocoExpVal2011DataMap, scale);

								country.on("click", function(d,i) {
									resetVis();
									matrColorMap(tradeMatrChocoExpVal2011DataMap, d, scale);
								});
							}	
							if (document.getElementById("checkboxQuan").checked == true) {
								colorMap(chocoExpQuan2011DataMap, scale);

								country.on("click", function(d,i) {
									resetVis();
									matrColorMap(tradeMatrChocoExpQuan2011DataMap, d, scale);
								});
							}	
						}
						if (document.getElementById("checkboxPrice").checked == true) {
							country.on("click", function(d,i) { 
								// do nothing
							});

						}
						if (document.getElementById("checkboxProduction").checked == true) {
							country.on("click", function(d,i) { 
								// do nothing
							});

						}
					}
				} 

				// If a parameter is changed while a country is selected, colors the map according to the parameter data
				// for that country. selectedCountry is a global variable.
				else {
					if (document.getElementById("checkboxCocoa").checked == true){
						if (document.getElementById("checkboxImport").checked == true){
							if (document.getElementById("checkboxVal").checked == true) {
								resetVis();
								matrColorMap(tradeMatrCocoaImpVal2011DataMap,  selectedCountry, scale);
							}	
							if (document.getElementById("checkboxQuan").checked == true) {
									resetVis();
									matrColorMap(tradeMatrCocoaImpQuan2011DataMap, selectedCountry, scale);
							}
						}
						if (document.getElementById("checkboxExport").checked == true){
							if (document.getElementById("checkboxVal").checked == true) {
									resetVis();
									matrColorMap(tradeMatrCocoaExpVal2011DataMap, selectedCountry, scale);
							}	
							if (document.getElementById("checkboxQuan").checked == true) {
									resetVis();
									matrColorMap(tradeMatrCocoaExpQuan2011DataMap, selectedCountry, scale);
							}
						}
						if (document.getElementById("checkboxPrice").checked == true) {
							resetVis();
						}
						if (document.getElementById("checkboxProduction").checked == true) {
							resetVis();
						}
					}
					if (document.getElementById("checkboxChoco").checked == true) {
						if (document.getElementById("checkboxImport").checked == true) {
							if (document.getElementById("checkboxVal").checked == true) {
									resetVis();
									matrColorMap(tradeMatrChocoImpVal2011DataMap, selectedCountry, scale);
							}	
							if (document.getElementById("checkboxQuan").checked == true) {
									resetVis();
									matrColorMap(tradeMatrChocoImpQuan2011DataMap, selectedCountry, scale);
							}
						}
						if (document.getElementById("checkboxExport").checked == true) {
							if (document.getElementById("checkboxVal").checked == true) {
									resetVis();
									matrColorMap(tradeMatrChocoExpVal2011DataMap, selectedCountry, scale);
							}	
							if (document.getElementById("checkboxQuan").checked == true) {
									resetVis();
									matrColorMap(tradeMatrChocoExpQuan2011DataMap, selectedCountry, scale);
							}	
						}
						if (document.getElementById("checkboxPrice").checked == true) {
							resetVis();
						}
						if (document.getElementById("checkboxProduction").checked == true) {
							resetVis();
						}
					}
				} 
			}

			/*Colors the map according to the data map returned by mapMondialData(dataFile).
			The data must be a map of a dictionnary, with country names as keys and data
			values as values. One data value only per country.
			@ param data: JSON dictionnary of the data.
			@ param scale: String that determines along which lines the color 
			scale is divided. Can be either "fraction" or "quantile".
			*/ 
			function colorMap(data, scale="quantile") {
				console.log("data", data);

				titleString[4] = "per country"; 
				titleString[5] = "";
				document.getElementById("title").innerHTML = titleString.join(" ");


				function compareNumbers(a, b) {
						return a - b;
				}


				var dataValUnsorted = data.values();
				var dataValues = dataValUnsorted.sort(compareNumbers);
				// console.log(dataValues)

				var max = d3.max(dataValues);

				if (scale == "fraction") {
					var oneFifth = max/5;
					var twoFifth = 2*max/5;
					var threeFifth = 3*max/5;
					var fourFifth = 4*max/5;

					var rangesList = [0, oneFifth, twoFifth, threeFifth, fourFifth, max];


					for (var keyCountry in data) {
						// console.log(keyCountry);

						// Removes the spaces of the country string, in order to correspond
						// with the classes of the map.
						var keyCountryClass = "." + keyCountry.replace(/[ ,']{1,}/g, "");//.replace("'", "").replace(",","");

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
						var keyCountryClass = "." + keyCountry.replace(/[ ,']{1,}/g, "");

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

					// Add data value to tooltip
					
						d3.selectAll(".country").on("mousemove", function (d,i) {
				      		
							if ((typeof data[d.properties.name] === "undefined") ||
								 (d.properties.name.replace(/[ ,']{1,}/g, "") == 0)) {
								var value = " ";
							} else {
								var value = data[d.properties.name];
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
				console.log("blanK");
				d3.selectAll(".country")
				 	.style("fill", "grey")
				 	.style("stroke", "none");

				d3.selectAll(".contry:hover")
					.style("stroke", "white")
					.style("stroke-width", "1.5px");

				d3.select("#legendContainer").select("svg > *").remove();
			}


			// The global variable selectedCountry keeps track of which country is selected by the user. 
			// It is used to avoid going back between mondial and national data when the user wants to
			// view different datasets about the same country.
			var selectedCountry = null;

			/*
			Does miscellaneous little tasks that need to be done when the user clicks on a country that there is data to show for.
			@ param country: d3 selection of a country
			*/
			function selectCountry(country) {
				// Modifies the global variable selectedCountry
				selectedCountry = country

				// Encircles the selected country
				// console.log(d.properties.name, d.properties.name.replace(",","").replace(/\s+/g, '').replace("'",""));
				d3.selectAll("." + country.properties.name.replace(",","").replace(/\s+/g, '').replace("'","")).style("stroke", "black");

				// Changes the title of the visualisation, based on the name of the selected country
				if (document.getElementById("checkboxExport").checked == true) {
					titleString[4] = "from";
				} else { if (document.getElementById("checkboxImport").checked == true) {
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
			Colors the map according to the matrix data map returned by 
			mapNationalData(dataFile), representing the connection between 
			countries. The data must be a map of a dictionnary, with country names as keys and 
			dictionnaries as values. The value dictionnaries must have 
			countries as keys and data values as values. 
			@ param dataMap: js map of the dictionnary of the 
			data.
			@ param scale: String that determines along which lines the color 
			scale is divided. Can be either "fraction" or "quantile".
			*/ 
			function matrColorMap(dataMap, country, scale="fraction") {
				selectCountry(country);

				for (var keyDict in data) {
					for (var keyCountry in keyDict) {
						if (data[keyCountry] == 0) {
							delete data[keyCountry];
						}
					}
				}

				function compareNumbers(a, b) {
						return a - b;
				}

				var dataDictVal = dataMap.values();
				var countryDict = dataMap.get(country.properties.name);
				var countryMap = d3.map(countryDict);
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
					// console.log("range1", rangesList);

					for (var keyCountry in countryDict) {

						// Removes the spaces of the country string, in order to correspond
						// with the classes of the map.
						var keyCountryClass = "." + keyCountry.replace(/[ ,']{1,}/g, "");

						// console.log("key", keyCountry);

						if (countryDict[keyCountry] < oneFifth) {
							d3.selectAll(keyCountryClass).style("fill", "blue");
						}
						else if ((countryDict[keyCountry] > oneFifth) && (countryDict[keyCountry] < twoFifth)) {
							d3.selectAll(keyCountryClass).style("fill", "green");
						}
						else if ((countryDict[keyCountry] > twoFifth) && (countryDict[keyCountry] < threeFifth)) {
							d3.selectAll(keyCountryClass).style("fill", "yellow");
						}
						else if ((countryDict[keyCountry] > threeFifth) && (countryDict[keyCountry] < fourFifth)) {
							d3.selectAll(keyCountryClass).style("fill", "orange");
						}
						else if (countryDict[keyCountry] > fourFifth) {
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
					// console.log("range2", rangesList);

					for (var keyCountry in data) {

						// Removes the spaces of the country string, in order to correspond
						// with the classes of the map.
						var keyCountryClass = "." + keyCountry.replace(/[ ,']{1,}/g, "");

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

				// Add data value to tooltip
				d3.selectAll(".country")
					.on("mousemove", function (d,i) {
						if ((typeof countryD{ict[d.properties.name] === "undefined") ||
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
				             .html(d.properties.name + "<br>}" + value);
				    })

			    	.on("mouseout",  function(d,i) {
			        	tooltip.classed("hidden", true);
			    	});
			}

			/*
			Draws the legend for the current visualisation.
			*/
			function drawLegend(rangesList, colorList) {
				document.getElementById("legendContainer").style.display = "none";
				
				// Rounds the numbers in rangesList, to avoid non-ending decimal numbers in the legend.
				for (i = 0; i <= rangesList.length; i += 1) {
					rangesList[i] = round(rangesList[i]);
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
						    // console.log("vert", vert);
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
				// console.log("legend");
				// console.log(rangesList, colorList);

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
					    // console.log("vert", vert);
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
	});
// This bracket closes scriptCode(), which contains almost all the code of script.js
}