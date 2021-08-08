window.addEventListener('load',function(){
  document.querySelector('.preloader').classList.add("loaded") 
})

var path = window.location.pathname;
var tokenID = path.split("/").pop();

var cat = tokenID.charAt(0) - 1 //Minus one because the catArray starts at 0 and there is no 0 cat.
var catArray = ["sakura", "anurak", "chukcha", "parvati", "gatinho", "gaston", "plezier", "yulenka", "cooter"]

document.getElementById("cat").src = "./img/cat/" + catArray[cat] + ".gif"

var n = tokenID.charAt(6)
var e = tokenID.charAt(7)
var s = tokenID.charAt(8)
var w = tokenID.charAt(9)

const north = document.getElementById("north")
const east = document.getElementById("east")
const south = document.getElementById("south")
const west = document.getElementById("west")

north.src = "./img/property/north/" + n + ".png"
east.src = "./img/property/east/" + e + ".png"
south.src = "./img/property/south/" + s + ".png"
west.src = "./img/property/west/" + w + ".png"

var frame = tokenID.charAt(11)
var frameArray = ["gold", "silver", "bronze", "common"]

const catFrame = document.getElementById("cat-frame")

catFrame.src = "./img/frame/" + frameArray[frame] + ".png"