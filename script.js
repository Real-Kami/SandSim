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
			if (((simulation.list[a][b] === 2) && (a !== simulation.h-1))) {
				if ((simulation.list[a+1][b] === 0)) {
					simulation.list[a][b] = 0;
					simulation.list[a+1][b] = 2;
				} else {
					if ((simulation.list[a+1][b] !== 0) && (simulation.list[a+1][b-1] === 0)) {
						simulation.list[a][b] = 0;
						simulation.list[a+1][b-1] = 2;
					}
					if ((simulation.list[a+1][b] !== 0) && (simulation.list[a+1][b-2] === 0)) {
						simulation.list[a][b] = 0;
						simulation.list[a+1][b-2] = 2;
					}	
					if ((simulation.list[a+1][b] !== 0) && (simulation.list[a+1][b-1] === 2) && (simulation.list[a+1][b-2] === 2) && (simulation.list[a+1][b+1] === 0)) {
						simulation.list[a][b] = 0;
						simulation.list[a+1][b+1] = 2;
					}	
					if ((simulation.list[a+1][b] !== 0) && (simulation.list[a+1][b-1] === 2) && (simulation.list[a+1][b-2] === 2)  && (simulation.list[a+1][b+1] === 2) && (simulation.list[a+1][b+2] === 0)) {
						simulation.list[a][b] = 0;
						simulation.list[a+1][b+2] = 2;
					}
				}
			}
			if (((simulation.list[a][b] === 4) && (a !== simulation.h-1))) {
				if (simulation.list[a+1][b] === 0) {
					simulation.list[a][b] = 0;
					simulation.list[a+1][b] = 4;
				} else {		
					if ((simulation.list[a][b-1] === 0)) {
						simulation.list[a][b] = 0;
						simulation.list[a][b-1] = 4;
					} else {
						if (simulation.list[a][b+1] === 0) {
							simulation.list[a][b] = 0;
							simulation.list[a][b+1] = 4;
						}
					}
				}
			}
			if ((simulation.list[a][b] === 5) && (simulation.list[a-1][b] === 0) && (a !== simulation.h-1)) {
				if (simulation.list[a][b+1] === 2) {
					simulation.list[a][b+1] = 5;
				}
				if (simulation.list[a][b-1] === 2) {
					simulation.list[a][b-1] = 5;
				}
				if (simulation.list[a-1][b+1] === 2) {
					simulation.list[a-1][b+1] = 5;
				}
				if (simulation.list[a-1][b-1] === 2) {
					simulation.list[a-1][b-1] = 5;
				}
				if (simulation.list[a+1][b+1] === 2) {
					simulation.list[a+1][b+1] = 5;
				}
				if (simulation.list[a+1][b-1] === 2) {
					simulation.list[a+1][b-1] = 5;
				}
			}
		}
	}
}

function render() {	

	//Draw grid and background

	c.fillStyle = "RGBA(0,112,255,0.2)";
	c.fillRect(0,0,99999,99999)

	//Draw sand

	for (a = 0;a < simulation.h;a++) {
		for (b = 0;b < simulation.w;b++) {
			switch(simulation.list[a][b]) {
				case 1:
				c.fillStyle = "wheat";
				c.fillRect(b*(canvas.width/simulation.w),a*(canvas.height/simulation.h),(canvas.width/simulation.w)+1,(canvas.height/simulation.h)+1);
				break;
				case 2:
				c.fillStyle = "sienna";
				c.fillRect(b*(canvas.width/simulation.w),a*(canvas.height/simulation.h),(canvas.width/simulation.w)+1,(canvas.height/simulation.h)+1);
				break;
				case 3:
				c.fillStyle = "gray";
				c.fillRect(b*(canvas.width/simulation.w),a*(canvas.height/simulation.h),(canvas.width/simulation.w)+1,(canvas.height/simulation.h)+1);
				break;
				case 4:
				c.fillStyle = "blue";
				c.fillRect(b*(canvas.width/simulation.w),a*(canvas.height/simulation.h),(canvas.width/simulation.w)+1,(canvas.height/simulation.h)+1);
				break;
				case 5:
				c.fillStyle = "limeGreen";
				c.fillRect(b*(canvas.width/simulation.w),a*(canvas.height/simulation.h),(canvas.width/simulation.w)+1,(canvas.height/simulation.h)+1);
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
	switch (event.keyCode) {
		case 65:simulation.list[y][x] = 0;
		break
		case 90:simulation.list[y][x] = 1;
		break
		case 69:simulation.list[y][x] = 2;
		break
		case 82:simulation.list[y][x] = 3;
		break
		case 84:simulation.list[y][x] = 4;
		break
		case 89:simulation.list[y][x] = 5;
		break
	}
}
function getMousePos() {
	y = Math.floor(event.pageY*simulation.h/canvas.height);
	x = Math.floor(event.pageX*simulation.w/canvas.width);
}

// game engine

const gameEngine = setInterval(render,10);