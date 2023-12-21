/**
 * Cette fonction génère les projets sur le DOM à partir de la réponse de l'API
 *
*/
export async function worksGeneration(){
    const response = await fetch('http://localhost:5678/api/works');
    let works = await response.json();

    for (let i = 0; i < works.length; i++) {
        
        const project = works[i];
        // Récupération de l'élément du DOM qui accueillera les fiches projet
        const divGallert = document.querySelector(".gallery");

        // Création d’une balise dédiée à une fiche projet
        const projectFigure = document.createElement("figure");
        projectFigure.dataset.id = project.id;
        divGallert.appendChild(projectFigure);

        // Création des balises contenue dans la balise figure
        const imageProject = document.createElement("img");
        imageProject.src = project.imageUrl;
        imageProject.alt = project.title;
        projectFigure.appendChild(imageProject);

        const descriptionProject = document.createElement("figcaption");
        descriptionProject.innerText = `${project.title}`;
        projectFigure.appendChild(descriptionProject);
    }
}

/**
 * Cette fonction gère le changement de filtre
 *
*/
export function filterProject(value){
    let filterBtn = document.querySelectorAll(".filterBtn");
    filterBtn.forEach(button => {
        if(value.toUpperCase() == button.innerText.toUpperCase()){
            button.classList.add("active");
        }else{
            button.classList.remove("active");
        };
    });
};

// Déclaration de filterProject dans le contexte global
window.filterProject = filterProject;




async function getWorksFromApi(){
    const response = await fetch('http://localhost:5678/api/works');
    let works = await response.json();
    return works;
}

const projectList = getWorksFromApi();
console.log(projectList);
console.log(projectList[1].title);