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