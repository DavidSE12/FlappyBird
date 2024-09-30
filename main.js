// create variable to get elements from HTML file
let block = document.getElementById("block");
let hole = document.getElementById("hole");
let bird = document.getElementById("bird");
let jumping = 0;
let score = 0;


// Changing the position of hole after every animations
hole.addEventListener('animationiteration' , () => {
    let random = (Math.random()*250)+200;  // random 200-450px of top of hole
    hole.style.top = random + "px";
    score++;        // increase score by 1 for each hurle 
});

// Create a gravity of character ( bird ) and set condition for game over
setInterval( () => {
    // the top distance of bird
    let birdtop = 
    parseInt(window.getComputedStyle(bird).getPropertyValue("top")); // the value of top is a string so should change to interger

    // the top distance of hole
    let holetop = 
    parseInt(window.getComputedStyle(hole).getPropertyValue("top"));

    // the distance of hole     
    let holeleft = 
    parseInt(window.getComputedStyle(hole).getPropertyValue("left")) ;

    // only gravity when dont jump 
    if(jumping == 0){
        bird.style.top = (birdtop + 3) + "px";
    }

    // conditions for the bird to pass through the hole
    if(birdtop > 700 || (  (holeleft < 300  && holeleft > 190 ) && ( (birdtop < holetop) || (birdtop > holetop + 120)))){
        alert("game over score " + (score - 1) )
        bird.style.top = 200 + "px";   // return to original position
        score = 0;    // return score back to zero
    }
}, 10) // repeat each 10 milisecond

// Create jump function for the bird
function jump(){
    jumping = 1; // turn off gravity
    let jumpCount = 0; // count iterations

    // create function jump 
    let jumpInterval = setInterval( () =>{ 
        // Increse by 1 for each iteration
        jumpCount++;
        
        // get value "top" distance of bird
        let birdtop = 
        parseInt(window.getComputedStyle(bird).getPropertyValue("top")); 
        
        // Make the bird jump
        if(birdtop > 18){
            bird.style.top = (birdtop - 5) + "px";
        }

        // Avoid the bird jumping forever
        if(jumpCount > 20){ // 0.2s
            clearInterval(jumpInterval) // clear interval of function -> no more jumping
            jumping = 0; // turn on gravity
        }
    }, 10 ) // repeat each 10 milisecond
}

// Add an event listener for keydown events
document.addEventListener("keydown", (event) => {
    // Check if the pressed key is the spacebar
    if (event.code === "Space") {
        event.preventDefault(); // Prevent default action (like scrolling)
        jump(); // Call the function
    }
});