// create variable to get elements from HTML file
const hole = document.getElementById("hole");
const bird = document.getElementById("bird");
const minHolePosition = 200;  // Set min value of hole in block
const maxHolePosition = 450;  // Set max value of hole in block
let isBirdJumping = 0;  // Flag to determine if the bird is isBirdJumping
let score = 0; // Initialize the score

// Changing the position of hole after every animations
hole.addEventListener('animationiteration' , () => {
    // Process: Generate a random position for the hole's top between minHolePosition and maxHolePosition 
    let random = (Math.random()*(maxHolePosition-minHolePosition))+minHolePosition;  // random value between min - max Hole Position (200-450)
    
    // Output: Set the hole's top position to the random value
    hole.style.top = random + "px";
    
    // increase score by 1 after each hurdle passed
    score++;      
});

// Function checkOver to detect collision for the game over
// Process: Check for game over conditions
// Condition 1: Bird goes out of bounds (falls below 700px)
// Condition 2: Bird hits the hole (if the hole is within 300px to 190px horizontally and the bird is outside the hole's vertical range)
function checkGameOver(birdTopValue, holeLeftValue, holeTopValue){
    if(birdTopValue > 700 || // Condition 1
      ( (holeLeftValue < 300  && holeLeftValue > 190 ) &&                      // Condition 2
        (birdTopValue < holeTopValue || birdTopValue > holeTopValue + 120) )   // Condition 2
     ){
        // Output: Alert the game over message and display the score
        alert(`game over score: ${score }`)

        // Output: Reset bird position and score
        bird.style.top = 200 + "px";   // Reset bird position to initial height
        score = -1;    // Reset score to -1
        hole.style.right = 0;  // Reset position of hole
    }
}

// Gravity function to simualate falling 
setInterval( () => {
    // Input: Get the current top distance of the bird (in px)
    let birdTopValue = 
    parseInt(window.getComputedStyle(bird).getPropertyValue("top")); // the value of top is a string so should change to interger

    // Input: Get the current top and left distances of the hole
    let holeTopValue = 
    parseInt(window.getComputedStyle(hole).getPropertyValue("top"));   
    let holeLeftValue = 
    parseInt(window.getComputedStyle(hole).getPropertyValue("left")) ;

    // Process: Apply gravity if the bird is not isBirdJumping
    if(isBirdJumping == 0){
        bird.style.top = (birdTopValue + 3) + "px";  // Increase the bird's top distance to simulate gravity
    }

    // Check game over
    checkGameOver(birdTopValue, holeLeftValue, holeTopValue)
    
}, 10) // repeat each 10 milisecond

// Jump function to make the bird jump
function jump(){
    // Set isBirdJumping flag to 1 to temporarily disable gravity
    isBirdJumping = 1; 

    // count iterations
    let jumpCount = 0; 

    // create the jump interval function
    let jumpInterval = setInterval( () =>{ 
        // Increse by 1 for each iteration
        jumpCount++;
        
        // Get the current top distance of the bird
        let birdTopValue = 
        parseInt(window.getComputedStyle(bird).getPropertyValue("top")); 
        
        // Make the bird jump upwards by 5px
        if(birdTopValue > 12){  // Ensure the bird doesn't jump too high (beyond 18px from the top)
            bird.style.top = (birdTopValue - 5) + "px";
        }

        // Stop the jump after a certain point (after 20 iterations, or 0.2s)
        if(jumpCount > 20){ // 0.2s
            clearInterval(jumpInterval) // Stop the isBirdJumping interval
            isBirdJumping = 0; // Re-enable gravity
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
