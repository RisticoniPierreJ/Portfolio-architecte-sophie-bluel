

// /**
//  * Avec modules
// */

// import { worksGeneration, filterProject } from "./script.js";

// worksGeneration();

// let value = "Tous";
// filterProject(value);

// /**
//  * Avec modules
// */


// /**
//  * Sans modules
// */

/**
 * Cette fonction récupère les projets depuis l'API
 * @returns {Promise<Array>} - Une promesse contenant les projets
 */
async function fetchWorks() {
    const response = await fetch('http://localhost:5678/api/works');
    const works = await response.json();
    return works;
}

/**
 * Cette fonction génère les projets sur le DOM à partir des données de l'API
 * @param {Array} works - Les projets à afficher
 */
function worksGeneration(works) {
    for (let i = 0; i < works.length; i++) {
        const project = works[i];
        // Récupération de l'élément du DOM qui accueillera les fiches projet
        const divGallery = document.querySelector(".gallery");

        // Création d’une balise dédiée à une fiche projet
        const projectFigure = document.createElement("figure");
        projectFigure.dataset.id = project.id;
        divGallery.appendChild(projectFigure);

        // Création des balises contenues dans la balise figure
        const imageProject = document.createElement("img");
        imageProject.src = project.imageUrl;
        imageProject.alt = project.title;
        projectFigure.appendChild(imageProject);

        const descriptionProject = document.createElement("figcaption");
        descriptionProject.innerText = `${project.title}`;
        projectFigure.appendChild(descriptionProject);
    };
};

fetchWorks().then(works => {
    worksGeneration(works);
});

/**
 * Cette fonction gère le changement de filtre
 * @param {string} value - La valeur du filtre
 */
function filterProjectBtn(value) {
    let filterBtn = document.querySelectorAll(".filterBtn");
    filterBtn.forEach(button => {
        if (value.toUpperCase() == button.innerText.toUpperCase()) {
            button.classList.add("active");
        } else {
            button.classList.remove("active");
        };
    });
};

// Affichage de tous les projets au chargement initial de la page
window.onload = () => {
    filterProjectBtn("Tous");
};

/**
 * Cette fonction modifie l'affichage des projets en fonction du filtre 
 */
function filterPoject (works){
    const filterBtn = document.querySelectorAll(".filterBtn");
    for (let i = 0; i < filterBtn.length; i++) {
        filterBtn[i].addEventListener("click", function(){
            const projectFilter = works.filter(function(works){
                return works.categoryId === i;
            })
            document.querySelector(".gallery").innerHTML = "";
            worksGeneration(projectFilter);
            if (i === 0){
                document.querySelector(".gallery").innerHTML = "";
                worksGeneration(works);
            } ;
        });
        
    };
};

fetchWorks().then(works => {
    filterPoject(works);
});

// /**
//  * Sans modules
// */