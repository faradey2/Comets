var field = {
	width: 2000,
	height:2000,
}

var earth = document.querySelector('#earth');
earth.pos = new vector(0,0);
earth.radius = 25;
earth.health = 100;

var comets = [];
var rockets = [];

const ROCKET_ATTACK_RANGE = 2000;
const COMMET_VISIBILITY = 2500;

		var c = new Comet();
function Process(){
	if(comets.length < 1){
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
		if (comet.pos.length > COMMET_VISIBILITY)
		{	
			comet.remove();
			commets.splice(i--,1);
		}	
		comet.draw();
	}

	a1:for(var i = 0;i < comets.length; i++){
		var comet = comets[i];
		for(var j = 0;j < rockets.length; j++){
			var rckt = rockets[j];
			if(intersection(comet,rckt))
			{
				comet.health -= rckt.power;
				rckt.health -= comet.power;
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
			comet.remove();
			comets.splice(i--,1);
		}
	}

	if(earth.health < 1)
		gameOver();
}

function gameOver(){
	console.log('GameOver');
	clearInterval(intervalId);
}

function intersection(a,b){
	if(a.pos.minusVector(b.pos).length()< b.radius + a.radius)
		return true;
	return false;
}

var intervalId = setInterval(Process,50);

addEventListener("click",function(e){
	var dx = e.pageX - earth.offsetLeft;
	var dy = e.pageY - earth.offsetTop;
	var r = new Rocket();
	r.dir = new vector(dx,dy);
	r.speed = 4;

	rockets.push(r)
})
