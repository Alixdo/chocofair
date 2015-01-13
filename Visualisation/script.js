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
			console.log(keyCountry);
			console.log(data[keyCountry]);
			document.getElementById(keyCountry).style.fill = "red"
		}
	}
//d3.map om lijst te maken van dic
}

color_map("data_files/_CocoaExpVal2000_2011.json");