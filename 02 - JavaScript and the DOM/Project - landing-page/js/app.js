/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const sections = document.querySelectorAll("section");
const navList = document.querySelector("#navbar__list");
let activeSectionID = sections[0].textContent;


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
const fragment = document.createDocumentFragment();

for (let i = 0; i < sections.length; i++) {
    const newElement = document.createElement('li');
    const heading = sections[i].querySelector("h2").textContent;
    // adding the inner text
    newElement.innerText = heading;
    // adding the class
    newElement.classList.add("menu__link");
    // adding an onclick event listener
    newElement.addEventListener('click', function(event){
        const currentSection = event.target;
        // Add class 'active' to section when near top of viewport
        
        // remove 'active' class from activeSection
        const activeSection = document.querySelector("#"+activeSectionID);
        activeSection.classList.remove("active");
        // add 'active' class to the currentSection
        currentSection.classList.add("active");
        activeSection = currentSection;

        // scroll to currentSection
        currentSection.scrollIntoView();
        
        // Scroll to anchor ID using scrollTO event
        // const boundingRect = currentSection.getBoundingClientRect();
        // currentSection.scrollTo({
        //     top: boundingRect.top,
        //     left: boundingRect.left,
        //     behavior: 'smooth'
        // });
    });
    fragment.appendChild(newElement);
}
navList.appendChild(fragment);


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click

// Set sections as active


