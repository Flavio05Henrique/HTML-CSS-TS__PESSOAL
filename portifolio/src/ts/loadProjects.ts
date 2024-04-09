import { projects } from "./projects.js";

const projectsContainer = document.querySelector('[data="projects"]') as HTMLDivElement

export const loadProjects = () => {

    projectsContainer.innerHTML = projects.map(project => {
        return `
            <li>
                <h3>${project.name}</h3>
                <div class="secProjects__itemProject">
                    <div class="secProjects__imgProject">
                        <img src="${project.bgImgDirectory}" alt="Imagem do site ${project.name}">
                    </div>
                    <div class="secProjects__itemTechnologies">
                        <div class="secProjects__mask"></div>
                        <div class="secProjects__bgGradiente"></div>
                        <div class="secProjects__technologiesContainer">
                            ${project.projectTechnologies.map(technology => {
                                return `
                                    <div>
                                        <img src="assets/img/skillIcons/${technology}_icon.png" alt="ícone do html">
                                        <h4>${technology.toUpperCase()}</h3>
                                    </div>
                                `
                            }).join("")}
                        </div>
                    </div>
                </div>
            </li>       
        `
    }).join("")
}
