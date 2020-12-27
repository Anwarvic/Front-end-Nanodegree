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
let activeSectionId = sections[0].id;


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

function activateSection(currentSection){
    // remove 'active' class from activeSection
    const activeSection = document.getElementById(activeSectionId);
    activeSection.classList.remove("active");
    // remove `active` from former nav item
    let navItem = document.getElementById("navitem_"+activeSectionId);
    navItem.classList.remove("active");
    
    // add 'active' class to the currentSection
    currentSection.classList.add("active");
    activeSectionId = currentSection.id;
    // set item in the nav bar as active as well
    navItem = document.getElementById("navitem_"+activeSectionId);
    navItem.classList.add("active");
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
const fragment = document.createDocumentFragment();
for (let i = 0; i < sections.length; i++) {
    const newElement = document.createElement('li');
    newElement.id = "navitem_section"+(i+1);

    // create <a> element
    const anchor = document.createElement('a');
    anchor.href = '#section'+(i+1);
    
    // adding the `menu__link` class
    anchor.classList.add("menu__link");
    anchor.innerText = sections[i].querySelector("h2").textContent;

    // appending the link to the li element
    newElement.appendChild(anchor)

    // adding an onclick event listener
    newElement.addEventListener('click', function(event){
        event.preventDefault();

        const currentSection = document.getElementById("section"+(i+1));
        // Set current section as active
        activateSection(currentSection);

        
        
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


// building the scrolling functionality
document.addEventListener('scroll', function(){
    const navListHeight = navList.offsetHeight;
    sections.forEach(function(currentSection) {
        // check if the current position is within the section boundaries
        if(currentSection.offsetTop <= window.scrollY+navListHeight) {
            // console.log(currentSection.querySelector("h2").textContent);
            activateSection(currentSection);
        }
    });
});
/**
 * End Main Functions
 * 
*/
