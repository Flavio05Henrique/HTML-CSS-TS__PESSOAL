const sections = document.querySelectorAll('[data="section"]');
let currentSection = 0;
export const slideToSection = (sectionNum) => {
    if (sectionNum < 0 || sectionNum > sections.length - 1)
        return;
    currentSection = sectionNum;
    sections[currentSection].click();
};
export const slideOne = (direction) => {
    const sum = currentSection + direction;
    sum > sections.length - 1 ? currentSection = 0 : currentSection = sum;
    sum < 0 ? currentSection = sections.length - 1 : 0;
    slideToSection(currentSection);
};
