var field = {
	width: 2000,
	height:2000,
}

var earth;
var moon;

var comets = [];
var rockets = [];

const ROCKET_ATTACK_RANGE = 1000;
const COMET_VISIBILITY = 2500;
const MAX_HELATH = 100;
var maxCommetsCount = 20;

var score = 0;
var canShoot = true;
var intervalId;

function startGame(){
	earth = document.querySelector('#earth');
	earth.pos = new vector(0,0);
	earth.radius = 25;
	earth.health = MAX_HELATH;
	
	score = 0;
	
	comets = [];
	rockets = [];
	//moon = new Moon();


	intervalId = setInterval(Process,50);

	addEventListener("click",addRocket);
}


function gameOver(){
	console.log('GameOver');
	clearInterval(intervalId);
	document.querySelector('#GameOver').style.display = 'inline-block';
	removeEventListener("click",addRocket);
	var f = function(){
		for(var i=0;i<comets.length;i++)
			comets[i].remove();
		for(var i=0;i<rockets.length;i++)
			rockets[i].remove();
		document.querySelector('#GameOver').style.display = 'none';
		removeEventListener("click",f);
		startGame();
	}
	addEventListener("click",f)
}

function Process(){
	if(comets.length < maxCommetsCount){
		comets.push(new Comet());
	}


	for(var i = 0;i < rockets.length; i++){
		var rckt = rockets[i];
		rckt.move();
		if (rckt.pos.length > ROCKET_ATTACK_RANGE)
		{	
			rckt.remove();
			rockets.splice(i--,1);
		}	
		rckt.draw();
	}

	for(var i = 0;i < comets.length; i++){
		var comet = comets[i];
		comet.move();
		if (comet.pos.length > COMET_VISIBILITY)
		{	
			comet.remove();
			comets.splice(i--,1);
		}	
		comet.draw();
	}

	if(moon != null){
		moon.move();
		moon.draw();
	}
	a1:for(var i = 0;i < comets.length; i++){
		var comet = comets[i];
		for(var j = 0;j < rockets.length; j++){
			var rckt = rockets[j];
			if(intersection(comet,rckt))
			{
				comet.health -= rckt.power;
				rckt.health -= comet.power;
				var b = new Boom(comet.pos.x,comet.pos.y,1000);
				b.draw();
				setTimeout(function(){
					b.remove();
				},b.lifetime);
				if(rckt.health < 1){
					rckt.remove();
					rockets.splice(j--,1);
				}
				if(comet.health < 1){
					comet.remove();
					comets.splice(i--,1);
					continue a1;
				}
			}
		}
		if(intersection(comet,earth)){
			earth.health -= comet.power;
			var o = new Oops(comet.pos.x,comet.pos.y,1000);
			o.draw();
			setTimeout(function(){
				o.remove();
			},o.lifetime);
			comet.remove();
			comets.splice(i--,1);
		}
	}

	if(earth.health < 1)
		gameOver();
}

function intersection(a,b){
	if(a.pos.minusVector(b.pos).length()< b.radius + a.radius)
		return true;
	return false;
}

var addRocket = function(e){
		if(!canShoot)
			return;
		var dx = e.pageX - earth.offsetLeft;
		var dy = e.pageY - earth.offsetTop;
		var r = new Rocket();
		r.dir = new vector(dx,dy);
		r.speed = 4;

		rockets.push(r)

		canShoot = false;
		setTimeout(function(){
			canShoot = true;
		},300)
	}

startGame();