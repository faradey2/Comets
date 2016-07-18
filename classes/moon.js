function Moon(){
	this.pos = new vector(0,0);
	this.speed = 0.07;
	this.radius = 10;
	this.a = 100;
	this.b = 80;
	this.t = 0;
	
	this.power = 10;
	this.health = 10;

	this.createBody = function(){
		this.body = document.createElement('div');
		this.body.className = 'moon';
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
		this.t += this.speed;
		this.pos.x = this.a * Math.cos(this.t)+30;
		this.pos.y = this.b * Math.sin(this.t);
		console.log(this.t);
	}

	this.createBody();
}