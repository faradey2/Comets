function Oops(x,y,t){
	if(isNaN(x+y)) this.pos = new vector(2000,0);
	else this.pos = new vector(x,y);
	if(isNaN(t))	this.lifetime = 2000;
	else this.lifetime = t;

	this.createBody = function(){
		this.body = document.createElement('div');
		this.body.className = 'oops';
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

	this.createBody();
}