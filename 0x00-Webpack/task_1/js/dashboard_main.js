import $ from "jquery";
import _ from "lodash";

let counter = 0;

$("<p>Holberton Dashboard</p>").appendTo('body');
$("<p>Dashboard data for the students</p>").appendTo('body');
$("<button>Click here to get started</button>").appendTo('body');
$("<p id='count'></p>").appendTo('body');
$("<p>Copyright - Holberton School</p>").appendTo('body');

function updateCounter() {
  counter ++;
  document.getElementById('count').innerText = `${counter}  clicks on the button`;
}

document.querySelector("button").addEventListener("click", _.debounce(updateCounter))
