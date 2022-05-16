const { createCanvas, loadImage } = require('canvas');
const fs = require("fs");
var maze = [];
var width = Math.floor(Math.random() * 50 + 1);
var height = Math.floor(Math.random() * 50 + 1);
width = 15 * 2 - 1;
height = 15 * 2 - 1;
var r = () => Math.random() > 1 ? 1 : 0;
for (let x = 0; x < width; x++) {
  maze.push([]);
  for (let y = 0; y < height; y++) {
    let c = r();
    if (x == 0 || x == width - 1 || y == 0 || y == height - 1) c = 1;
    if (x % 2 == 0 && y % 2 == 0) c = 1;
    maze[x].push(c);
    // maze[x].push(1);
  }
}

/*
maze = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
  [1, 1, 1, 0, 1, 0, 0, 1, 1, 1],
  [0, 1, 0, 0, 1, 0, 0, 1, 0, 0],
  [0, 1, 1, 1, 1, 0, 1, 1, 1, 0],
  [0, 1, 0, 0, 1, 0, 1, 0, 1, 0],
  [0, 0, 0, 0, 1, 1, 1, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 2],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
*/

const canvas = createCanvas(width * 4 + height * 4, (width + height - 2) * 2 + 14);
const ctx = canvas.getContext("2d");
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
function saveCanvas(name = "default.png") {
  fs.writeFileSync(name, canvas.toBuffer());
}

function imageLoaded(image) {
  for (let left = 0; left - width < height - 1; left++) {
    let tLeft = left;
    let tRight = 0;
    if (tLeft > width - 1) {
      tRight = tLeft - width + 1;
      tLeft = tLeft - tRight;
    }
    for (let i = 0; ; i++) {
      let x = tLeft - i;
      let y = tRight + i;
      if (x < 0) break;
      if (y > height - 1) break;
      let k = maze[x][y];
      if (k) ctx.drawImage(image, (maze.length - 1) * 4 + left * 4 - x * 8, left * 2);
    }
  }

  saveCanvas("output.png");
}

loadImage('unit.png').then(imageLoaded);
