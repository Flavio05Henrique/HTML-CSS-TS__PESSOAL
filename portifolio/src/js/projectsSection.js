import { getAllProjects, getProject } from "./projects.js";
const projectsContainer = document.querySelector('[data="projects"]');
export const loadProjects = () => {
    const projects = getAllProjects();
    projectsContainer.innerHTML = projects.map(project => {
        return `
            <li>
                <h3>${project.name}</h3>
                <div class="secProjects__itemProject">
                    <div class="secProjects__imgProject">
                        <img src="${project.bgImgDirectory}" alt="Imagem do site ${project.name}">
                    </div>
                    <div class="secProjects__itemTechnologies">
                        <div class="secProjects__mask" data="interactive" id='${project.id}'></div>
                        <div class="secProjects__bgGradiente"></div>
                        <div class="secProjects__technologiesContainer">
                            ${project.projectTechnologies.map(technology => {
            return `
                                    <div>
                                        <img src="assets/img/skillIcons/${technology}_icon.png" alt="ícone do html">
                                        <h4>${technology.toUpperCase()}</h3>
                                    </div>
                                `;
        }).join("")}
                        </div>
                    </div>
                </div>
            </li>       
        `;
    }).join("");
};
export const projectsInteraction = () => {
    projectsContainer.addEventListener('click', clickEvent => {
        const elementClicked = clickEvent.target;
        if (elementClicked.getAttribute('data') != 'interactive')
            return;
        const id = parseInt(elementClicked.id);
        const linkProject = createLink(id);
        linkProject.click();
        linkProject.remove();
    });
};
const createLink = (id) => {
    const link = document.createElement('a');
    link.style.display = 'none';
    link.href = `${getProject(id).link}`;
    link.target = 'blank';
    return link;
};
