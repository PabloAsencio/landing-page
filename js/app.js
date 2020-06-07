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
const navbarLinks = navbarList.getElementsByTagName('li');

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
    anchor.setAttribute('id', `${section.getAttribute('id')}-link`);
    return anchor;
};

// The active state is defined as:
//   * the element is at least partially visible,
//   * its top is in the upper half of the viewport or higher,
//   *  its bottom is lower than the upper 10% of the viewport
const isActive = (element) => {
    const rect = element.getBoundingClientRect();
    return (
        rect.top < 0.5 * window.innerHeight &&
        rect.bottom > 0.1 * window.innerHeight
    );
};

const isCloserToTop = (oneElement, anotherElement) => {
    return (
        !anotherElement ||
        oneElement.getBoundingClientRect().bottom <
            anotherElement.getBoundingClientRect().bottom
    );
};

const setActiveLink = (section) => {
    for (const link of navbarLinks) {
        if (
            section &&
            `${section.getAttribute('id')}-link` ===
                link.firstElementChild.getAttribute('id')
        ) {
            link.firstElementChild.classList.add('link--active');
        } else {
            link.firstElementChild.classList.remove('link--active');
        }
    }
};

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
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

// Add class 'active' to section when near top of viewport
const setActiveSection = () => {
    let activeSection = null;
    for (const section of sections) {
        section.classList.remove('your-active-class');
        if (isActive(section) && isCloserToTop(section, activeSection)) {
            activeSection = section;
        }
    }
    if (activeSection) {
        activeSection.classList.add('your-active-class');
    }
    setActiveLink(activeSection);
};

// Scroll to anchor ID using scrollTO event
const scrollToSection = (event, link) => {
    event.preventDefault();
    const target = link.getAttribute('href').substring(1);
    const section = document.getElementById(target);
    const rect = section.getBoundingClientRect();
    const scrollOptions = {
        left: rect.x,
        top: rect.y,
        behavior: 'smooth',
    };
    window.scrollBy(scrollOptions);
};

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
populateNavbarList();
// Scroll to section on link click
for (const link of navbarLinks) {
    link.addEventListener('click', (event) =>
        scrollToSection(event, link.firstElementChild)
    );
}

// Set sections as active
window.addEventListener('scroll', setActiveSection);
