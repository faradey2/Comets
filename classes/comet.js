function Comet(){
	this.pos = new vector(Math.random()*300+000,0).rotate(Math.random()*360);
	this.dir = this.pos.multiply(-1);
	this.speed = 4;
	this.radius = 10;
	
	this.power = 10;
	this.health = 10;

	this.createBody = function(){
		this.body = document.createElement('div');
		this.body.className = 'comet';
		document.body.appendChild(this.body);
		return this.body;
	}

	this.remove = function(){
		document.body.removeChild(this.body);
	}

	this.draw = function(){
		this.body.style.left = earth.offsetLeft + this.pos.x + (earth.offsetWidth - this.body.offsetWidth)/2 + 'px';
		this.body.style.top = earth.offsetTop + this.pos.y  + 'px';
	}	

	this.move = function(){
		this.pos = this.pos.addVector(this.dir.normalize().multiply(this.speed));
	}

	this.createBody();
}