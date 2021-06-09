// Preparing canvas

let canvas = document.getElementById("displayer");
let c = canvas.getContext("2d");

// init. variables

let simulation = {
	w:300,
	h:150,
	size:50,
	list:[],
}
let x;
let y;
let type = 2;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

for (a = 0;a < simulation.h;a++) {
	simulation.list.push([]);
	for (b = 0;b < simulation.w;b++) {
		simulation.list[a].push(0);
	}
}

// functions 

function update() {
	for (a = simulation.h-1;a > -1;a--) {
		for (b = simulation.w-1;b > -1;b--) {
			if (((simulation.list[a][b] === 1) && (a !== simulation.h-1))) {
				if ((simulation.list[a+1][b] === 0)) {
					simulation.list[a][b] = 0;
					simulation.list[a+1][b] = 1;
				} else {
				if ((simulation.list[a+1][b] === 1) && (simulation.list[a+1][b-1] === 0)) {
					simulation.list[a][b] = 0;
					simulation.list[a+1][b-1] = 1;
				}
				
				if ((simulation.list[a+1][b] === 1) && (simulation.list[a+1][b-1] === 1) && (simulation.list[a+1][b+1] === 0)) {
					simulation.list[a][b] = 0;
					simulation.list[a+1][b+1] = 1;
				}
				}
			}
		}
	}
}

function render() {	

	//Draw grid and background

	c.fillStyle = "RGBA(0,0,0,0.1)";
	c.fillRect(0,0,99999,99999)

	//Draw sand

	for (a = 0;a < simulation.h;a++) {
		for (b = 0;b < simulation.w;b++) {
			switch(simulation.list[a][b]) {
				case 1:
				c.fillStyle = "wheat";
				c.fillRect(b*(canvas.width/simulation.w),a*(canvas.height/simulation.h),(canvas.width/simulation.w),(canvas.height/simulation.h));
				break;
				case 2:
				c.fillStyle = "blue";
				c.fillRect(b*(canvas.width/simulation.w),a*(canvas.height/simulation.h),(canvas.width/simulation.w),(canvas.height/simulation.h));
				break;
			}
		}
	}
	update()
}

// AEL

document.addEventListener("keydown",addSand);
document.addEventListener("mousemove",getMousePos);

function addSand() {
	simulation.list[y][x] = type;
}
function getMousePos() {
	y = Math.floor(event.pageY*simulation.h/canvas.height);
	x = Math.floor(event.pageX*simulation.w/canvas.width);
}

// game engine

const gameEngine = setInterval(render,10);