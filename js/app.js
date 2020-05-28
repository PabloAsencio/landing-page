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
const sections = document.getElementsByTagName('section');
const navbarList = document.getElementById('navbar__list');

/**
 * End Global Variables
 * Start Helper Functions
 *
 */
const createAnchor = (section) => {
    const id = section.getAttribute('id');
    const content = section.getAttribute('data-nav');
    const anchor = document.createElement('A');
    anchor.setAttribute('href', `#${id}`);
    anchor.textContent = content;
    return anchor;
};

const populateNavbarList = () => {
    const newList = document.createDocumentFragment();
    for (const section of sections) {
        const li = document.createElement('LI');
        const anchor = createAnchor(section);
        li.appendChild(anchor);
        newList.appendChild(li);
    }
    navbarList.innerHTML = '';
    navbarList.appendChild(newList);
};

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
populateNavbarList();
// Add class 'active' to section when near top of viewport

// Scroll to anchor ID using scrollTO event

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu

// Scroll to section on link click

// Set sections as active
