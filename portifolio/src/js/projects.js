const projects = [
    {
        'id': 0,
        'name': "Minha galeria de obras",
        'bgImgDirectory': "assets/img/proj/projMinhaGaleriaDeObras.jpg",
        'projectTechnologies': ["html", "css", "javaScript", "typeScript", "sass"],
        'link': "https://flavio05henrique.github.io/MinhaGaleriaDeObras/"
    },
    {
        'id': 1,
        'name': "Geek Word",
        'bgImgDirectory': "assets/img/proj/projGeekWord.jpg",
        'projectTechnologies': ["html", "css", "javaScript", "typeScript", "sass"],
        'link': "https://flavio05henrique.github.io/GeekWorld/"
    },
    {
        'id': 2,
        'name': "Pinterest--Copia",
        'bgImgDirectory': "assets/img/proj/projCopiaDoPinterest.jpg",
        'projectTechnologies': ["html", "css", "javaScript"],
        'link': "https://flavio05henrique.github.io/Pinterest---copia/"
    },
];
export const getAllProjects = () => projects;
export const getProject = (id) => projects[id];
