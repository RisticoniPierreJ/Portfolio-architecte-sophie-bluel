// /**
//  * Avec modules
// */

/**
 * Cette fonction génère les projets sur le DOM à partir de la réponse de l'API
 *
*/
// export async function worksGeneration(){
//     const response = await fetch('http://localhost:5678/api/works');
//     let works = await response.json();

//     for (let i = 0; i < works.length; i++) {
        
//         const project = works[i];
//         // Récupération de l'élément du DOM qui accueillera les fiches projet
//         const divGallert = document.querySelector(".gallery");

//         // Création d’une balise dédiée à une fiche projet
//         const projectFigure = document.createElement("figure");
//         projectFigure.dataset.id = project.id;
//         divGallert.appendChild(projectFigure);

//         // Création des balises contenue dans la balise figure
//         const imageProject = document.createElement("img");
//         imageProject.src = project.imageUrl;
//         imageProject.alt = project.title;
//         projectFigure.appendChild(imageProject);

//         const descriptionProject = document.createElement("figcaption");
//         descriptionProject.innerText = `${project.title}`;
//         projectFigure.appendChild(descriptionProject);
//     }
// }

// /**
//  * Cette fonction gère le changement de filtre
//  *
// */
// export function filterProject(value){
//     let filterBtn = document.querySelectorAll(".filterBtn");
//     filterBtn.forEach(button => {
//         if(value.toUpperCase() == button.innerText.toUpperCase()){
//             button.classList.add("active");
//         }else{
//             button.classList.remove("active");
//         };
//     });
// };

// // Déclaration de filterProject dans le contexte global
// window.filterProject = filterProject;

// async function getWorksFromApi(){
//     const response = await fetch('http://localhost:5678/api/works');
//     let works = await response.json();
//     return works;
// }

// const projectList = getWorksFromApi();
// console.log(projectList);
// console.log(projectList[1].title);

// /**
//  * Avec modules
// */


// /**
//  * Sans modules
// */

const form = document.querySelector("form");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const userCredentials = {
        email: event.target.querySelector("[name=email]").value,
        password: event.target.querySelector("[name=password]").value,
    };

    async function login(userCredentials) {
        const response = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userCredentials),
        });
    
        if (!response.ok) {
            // throw new Error(`HTTP error! Status: ${response.status}`);
            const errorMessage = document.querySelector(".errorMessage").style.display = "flex";
        }
        return response.json();
    }

    try {
        const responseData = await login(userCredentials);
        handleLoginResponse(responseData);
    } catch (error) {
        console.error("Erreur lors de la requête :", error);
    }


    function handleLoginResponse(responseData) {
        if (responseData.token) {
            // Stocke le token dans le stockage local (localStorage)
            localStorage.setItem('userToken', responseData.token);

            // Stocke l'information de connexion
            localStorage.setItem('isLoggedIn', 'true');
    
            // Redirige l'utilisateur vers la page d'accueil
            window.location.href = 'index.html';
        } else {
            // Gère le cas où le token n'est pas présent dans la réponse
            console.error('Le token n\'est pas présent dans la réponse de connexion.');
        }
    }
});

// /**
//  * Sans modules
// */