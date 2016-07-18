function Rocket(){
	this.dir = new vector(0,0);
	this.speed = 0;
	this.pos = new vector(0,0);
	this.radius = 10;
	
	this.power = 10;
	this.health = 10;

	this.createBody = function(){
		this.body = document.createElement('div');
		this.body.className = 'rocket';
		document.body.appendChild(this.body);
		return this.body;
	}
	
	this.remove = function(){
		document.body.removeChild(this.body);
	}

	this.draw = function(){
		this.body.style.left = earth.offsetLeft + this.pos.x + earth.offsetWidth/2 + 'px';
		this.body.style.top = earth.offsetTop + this.pos.y  + earth.offsetWidth/2 + 'px';
	}	

	this.move = function(){
		this.pos = this.pos.addVector(this.dir.normalize().multiply(this.speed));
	}

	this.createBody();
}