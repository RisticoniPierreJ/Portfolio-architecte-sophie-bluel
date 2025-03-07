//Gestion du clic sur le bouton envoyer du formulaire de contact
const contactForm = document.querySelector("#contact form");
contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
})

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
    const divGallery = document.querySelector(".gallery");
    let htmlString = "";

    for (let i = 0; i < works.length; i++) {
        const project = works[i];
        htmlString += `
            <figure data-id="${project.id}">
                <img src="${project.imageUrl}" alt="${project.title}">
                <figcaption>${project.title}</figcaption>
            </figure>
        `;
    };
    divGallery.innerHTML = htmlString;
};

/**
 * Cette fonction récupère les catégories depuis l'API
 * @returns {Promise<Array>} - Une promesse contenant les catégories
 */
async function fetchCategories() {
    const response = await fetch('http://localhost:5678/api/categories');
    const categories = await response.json();
    return categories;
}

/**
 * Cette fonction gére les bouttons de filtre
 * @param {Array} categories - Les catégories à afficher
 */
function handleFilterBtn(categories) {
    // Récupération de l'élément du DOM qui accueillera les boutons de filtre
    const filterBar = document.querySelector(".filter");

    // Création du bouton de filtre "Tous"
    const firstFilterBtn = document.createElement("button");
    firstFilterBtn.classList= "filterBtn filterBtnSmall active";
    firstFilterBtn.innerText = "Tous";
    firstFilterBtn.dataset.id = 0;
    filterBar.appendChild(firstFilterBtn);

    // Génération des bouton de filtre à partir de l'API
    for (let i = 0; i < categories.length; i++) {       
        const filter = categories[i];

        // Création des balises contenues dans la balise filter
        const filterBtn = document.createElement("button");
        filterBtn.classList= "filterBtn";
        filterBtn.dataset.id = filter.id;

        // Ajustement de la la taille des boutons filtre
        if(filter.name.length < 8){
            filterBtn.classList.add("filterBtnSmall");
        }else{
            filterBtn.classList.add("filterBtnLarge");
        }

        filterBtn.innerText = filter.name;
        filterBar.appendChild(filterBtn);
    };

    // Gestion du changement d'aspect d'un bouton filtre au clic
    const filterBtn = document.querySelectorAll(".filterBtn");
    for (let i = 0; i < filterBtn.length; i++) {
        filterBtn[i].addEventListener("click", () => {

            // Réinitialisation du style des boutons
            filterBtn.forEach(button => {
                button.classList.remove("active");
            })
            // changement du style du bouton actif
            filterBtn[i].classList.add("active");
        })
    }
};
fetchCategories().then(categories => {
    handleFilterBtn(categories);
});

/**
 * Cette fonction permet de filtrer les projets   
 */
function filterProject (works){
    const filterBtn = document.querySelectorAll(".filterBtn");

    for (let i = 0; i < filterBtn.length; i++) {
        filterBtn[i].addEventListener("click", () => {
            let projectFilter;
            let categoryId = parseInt(filterBtn[i].dataset.id);

            if (categoryId === 0) {
                projectFilter = works;
            } else {
                projectFilter = works.filter(project => project.categoryId === categoryId);
            }

            document.querySelector(".gallery").innerHTML = "";
            worksGeneration(projectFilter);
        });       
    };
};

fetchWorks().then(works => {
    worksGeneration(works);
    filterProject(works);
});

//Gestion du clic sur le bouton login
const loginBtn = document.querySelector(".loginBtn")
loginBtn.addEventListener("click", () => {
    window.location.href = 'login.html';
})

/**
 * Cette Modifie des éléments du DOM si l'utilisateur est connecté
 */
function updatePageForLoggedInUser() {
    // Change le texte du bouton de "login" à "logout"
    const loginButton = document.querySelector("nav li.loginBtn");
    loginButton.textContent = "logout";
    loginButton.classList.replace("loginBtn", "logoutBtn")

     // Ajoute modifier, et un icon à côté du titre de la section portfolio
     document.querySelector(".modifyProject").style.display = "flex";

     // Ajout de la Top bar noire 
     document.querySelector(".adminTop").style.display = "flex";

     // Suppression de la filter bar 
     document.querySelector(".filter").style.display = "none";
}

/**
 * Cette fonction gère la déconnection de l'utilisateur 
 */
function handleLogout(){
    localStorage.setItem('userToken', '');
    localStorage.setItem('isLoggedIn', 'false');
    window.location.href = 'index.html';
    document.querySelector(".modifyProject").style.display = "none";
}

 //Gestion de la page au chargement après login
 window.onload = () => {
     //Gestion de la modifitacation de la page d'accueil quand l'utilisateur est connecté
     const isLoggedIn = localStorage.getItem('isLoggedIn');
 
     if (isLoggedIn === 'true') {
         // Fonction qui modifie le contenu de la page
         updatePageForLoggedInUser();
         // Fonction qui permet l'affichage de la modale
         initAddEventListenermodal();
 
         // Appel de la fonction qui gère la déconnection de l'utilisateur 
         const logOut = document.querySelector(".logoutBtn");
         logOut.addEventListener("click", () => {
             handleLogout();
         });
     }
 };