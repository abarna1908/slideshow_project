
$(document).ready(function(){
window.onload = function(){
	
	var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("slideshow");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
 
  slides[slideIndex-1].style.display = "block"; 
  setTimeout(showSlides, 5000); // Change image every 2 seconds
}
	//setInterval(function(){ background() }, 3000);
	//canvas init
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	
	//canvas dimensions
	var W = window.innerWidth;
	var H = window.innerHeight;
	canvas.width = W;
	canvas.height = H;
	
	//snowflake particles
	var mp = 200; //max particles
	var particles = [];
	for(var i = 0; i < mp; i++)
	{
		console.log(Math.random());
		particles.push({
			x: Math.random()*W, //x-coordinate
			y: Math.random()*H, //y-coordinate
			r: Math.random()*5+2, //radius
		})
		
		if(parseFloat(particles[i].r)<parseFloat(3)){
			console.log(particles[i].r)
		}
		else{
			console.log("gotcha")
		}
		
	}
	
	//Lets draw the flakes
	function draw()
	{
		ctx.clearRect(0, 0, W, H);
		
		
		
		ctx.beginPath();
		for(var i = 0; i < mp; i++)
		{
			var p = particles[i];
			ctx.moveTo(p.x, p.y);
			ctx.ellipse(p.x, p.y, p.r, p.r+(Math.random()*4), 0, 0, 2 * Math.PI);
			ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
			ctx.lineWidth=2;
  // draw shape
		}
		
		ctx.fill();
		update();
	}
	
	//Function to move the snowflakes
	//angle will be an ongoing incremental flag. Sin and Cos functions will be applied to it to create vertical and horizontal movements of the flakes
	var angle = 0;
	function update()
	{
		angle = Math.random();
		for(var i = 0; i < mp; i++)
		{
			var p = particles[i];
			//Updating X and Y coordinates
			//We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
			//Every particle has its own density which can be used to make the downward movement different for each flake
			//Lets make it more random by adding in the radius
			p.y += (angle) + 1 + p.r/2;
			p.x = p.x+(angle);
			
			
			
			//Sending flakes back from the top when it exits
			//Lets make it a bit more organic and let flakes enter from the left and right also.
			if(p.x > W+5 || p.x<5|| p.y > H)
			{
				particles[i] = {x: Math.random()*W, y: -10, r: p.r};
				
			}
		}
	}
	
	//animation loop
	setInterval(draw, 20);
}

})
