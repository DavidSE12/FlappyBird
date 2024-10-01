// create variable to get elements from HTML file
let block = document.getElementById("block");
let hole = document.getElementById("hole");
let bird = document.getElementById("bird");
let jumping = 0;  // Flag to determine if the bird is jumping
let score = 0; // Initialize the score


// Changing the position of hole after every animations
hole.addEventListener('animationiteration' , () => {
    // Process: Generate a random position for the hole's top between 200px and 450px
    let random = (Math.random()*250)+200;  // random value between 200-450px 
    
    // Output: Set the hole's top position to the random value
    hole.style.top = random + "px";
    
    // increase score by 1 after each hurdle passed
    score++;      
});

// Gravity function to simualate falling and detect collision for the game over
setInterval( () => {
    // Input: Get the current top distance of the bird (in px)
    let birdtop = 
    parseInt(window.getComputedStyle(bird).getPropertyValue("top")); // the value of top is a string so should change to interger

    // Input: Get the current top and left distances of the hole
    let holetop = 
    parseInt(window.getComputedStyle(hole).getPropertyValue("top"));   
    let holeleft = 
    parseInt(window.getComputedStyle(hole).getPropertyValue("left")) ;

    // Process: Apply gravity if the bird is not jumping
    if(jumping == 0){
        bird.style.top = (birdtop + 3) + "px";  // Increase the bird's top distance by 3px to simulate gravity
    }

    // Process: Check for game over conditions
    // Condition 1: Bird goes out of bounds (falls below 700px)
    // Condition 2: Bird hits the hole (if the hole is within 300px to 190px horizontally and the bird is outside the hole's vertical range)
    if(birdtop > 700 || (  (holeleft < 300  && holeleft > 190 ) && ( (birdtop < holetop) || (birdtop > holetop + 120)))){
        // Output: Alert the game over message and display the score
        alert("game over score " + (score - 1) )

        // Output: Reset bird position and score
        bird.style.top = 200 + "px";   // Reset bird position to initial height
        score = 0;    // Reset score to zero
    }
}, 10) // repeat each 10 milisecond

// Jump function to make the bird jump
function jump(){
    // Set jumping flag to 1 to temporarily disable gravity
    jumping = 1; 

    // count iterations
    let jumpCount = 0; 

    // create the jump interval function
    let jumpInterval = setInterval( () =>{ 
        // Increse by 1 for each iteration
        jumpCount++;
        
        // Get the current top distance of the bird
        let birdtop = 
        parseInt(window.getComputedStyle(bird).getPropertyValue("top")); 
        
        // Make the bird jump upwards by 5px
        if(birdtop > 18){  // Ensure the bird doesn't jump too high (beyond 18px from the top)
            bird.style.top = (birdtop - 5) + "px";
        }

        // Stop the jump after a certain point (after 20 iterations, or 0.2s)
        if(jumpCount > 20){ // 0.2s
            clearInterval(jumpInterval) // Stop the jumping interval
            jumping = 0; // Re-enable gravity
        }
    }, 10 ) // repeat every 10 miliseconds
}

// Add an event listener for keydown events to trigger the jump
document.addEventListener("keydown", (event) => {
    // Check if the pressed key is the spacebar
    if (event.code === "Space") {
        event.preventDefault(); // Prevent default action (like scrolling)
        jump(); // Call the function
    }
});
