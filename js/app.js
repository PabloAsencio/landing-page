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
const menuLinks = navbarList.getElementsByClassName('menu__link');

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
    anchor.classList.add('menu__link');
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

// Compares and Element to another Element and returns true if the
// first one is closer to the top of the viewport than the second one
const isCloserToTop = (oneElement, anotherElement) => {
    return (
        !anotherElement ||
        oneElement.getBoundingClientRect().bottom <
            anotherElement.getBoundingClientRect().bottom
    );
};

const isCloserToCenter = (oneElement, anotherElement) => {
    return (
        !anotherElement ||
        getDistanceToViewportCenter(oneElement) <
            getDistanceToViewportCenter(anotherElement)
    );
};

const getDistanceToViewportCenter = (element) => {
    const rect = element.getBoundingClientRect();
    return Math.abs(window.innerHeight / 2 - (rect.top + rect.bottom) / 2);
};

const setActiveLink = (section) => {
    for (const link of menuLinks) {
        if (
            section &&
            section.getAttribute('id') ===
                link.getAttribute('href').substring(1)
        ) {
            link.classList.add('link--active');
        } else {
            link.classList.remove('link--active');
        }
    }
};

const scrollToSection = (event, section) => {
    event.preventDefault();
    const rect = section.getBoundingClientRect();
    const scrollOptions = {
        left: rect.x,
        top: rect.y,
        behavior: 'smooth',
    };
    window.scrollBy(scrollOptions);
};

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
const populateMenuList = (navbarList, sections) => {
    const menuList = document.createDocumentFragment();
    for (const section of sections) {
        const li = document.createElement('LI');
        const anchor = createAnchor(section);
        li.appendChild(anchor);
        menuList.appendChild(li);
    }
    navbarList.innerHTML = '';
    navbarList.appendChild(menuList);
};

// Add class 'active' to section when near top of viewport
const setActiveSection = (sections) => {
    let activeSection = null;
    let sectionHeading = null;
    for (const section of sections) {
        section.classList.remove('your-active-class');
        sectionHeading = section.querySelector('.section__heading');
        sectionHeading.classList.remove('underline');
        if (isActive(section) && isCloserToCenter(section, activeSection)) {
            activeSection = section;
        }
    }
    if (activeSection) {
        activeSection.classList.add('your-active-class');
        const heading = activeSection.querySelector('.section__heading');
        heading.classList.add('underline');
    }
    setActiveLink(activeSection);
};

// Scroll to anchor ID using scrollTO event
function addLinkListeners(menuLinks, sections) {
    for (let i = 0; i < menuLinks.length; i++) {
        menuLinks[i].addEventListener('click', (event) =>
            scrollToSection(event, sections[i])
        );
    }
}

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
populateMenuList(navbarList, sections);

// Scroll to section on link click
addLinkListeners(menuLinks, sections);

// Set sections as active
window.addEventListener('scroll', () => {
    setActiveSection(sections);
});
