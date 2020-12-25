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
let activeSection = sections[0];


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
    // adding the inner text
    newElement.innerText = sections[i].querySelector("h2").textContent;
    // adding the class
    newElement.classList.add("menu__link");
    // adding an onclick event listener
    newElement.addEventListener('click', function(){
        const currentSection = document.getElementById("section"+(i+1));
        // Add class 'active' to section when near top of viewport
        
        // remove 'active' class from activeSection
        activeSection.classList.remove("active");
        // add 'active' class to the currentSection
        currentSection.classList.add("active");
        activeSection = currentSection;

        // Scroll to anchor ID using scrollTo event
        const navListHeight = navList.offsetHeight;
        const boundingRect = currentSection.getBoundingClientRect();
        window.scrollTo({
            left: boundingRect.left + window.scrollX,
            top: boundingRect.top + window.scrollY-navListHeight,
            behavior: 'smooth',
        });
    });
    fragment.appendChild(newElement);
}
navList.appendChild(fragment);


/**
 * End Main Functions
 * 
*/
