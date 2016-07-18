function vector(x,y){
	if(x == undefined) this.x = 0;
	else	this.x = x;
	if(y == undefined) this.y = 0;
	else	this.y = y;

	this.addVector = function(v){
		return new vector(this.x + v.x, this.y + v.y);
	}

	this.minusVector = function(v){
		return new vector(this.x - v.x, this.y - v.y);
	}

	this.normalize = function(){
		return new vector(this.x / this.length(), this.y / this.length());
	}

	this.length = function(){
		return Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y,2));
	}

	this.multiply = function(c){
		return new vector(this.x * c, this.y * c);
	}


	this.toString = function(){
			return '(' + this.x + ' ' + this.y + ')';
	}

	this.rotate = function(grad){
		var rad = grad * Math.PI / 180;
		return new vector(this.length()*Math.cos(rad),this.length()*Math.sin(rad));
	}
}