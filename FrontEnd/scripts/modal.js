/*********************************************************************************
 * 
 * Cette partie concerne  l'affichage et à la fermeture de la modale. 
 * 
 *********************************************************************************/
/**
 * Cette fonction affiche la modale  
 */
function displayModal() {
    const modalBackground = document.querySelector(".modalBackground").style.display = "block";
}

/**
 * Cette fonction cache la modale et réinitialise le formulaire
 */
function hideModal() {
    const modalBackground = document.querySelector(".modalBackground").style.display = "none";
    resetForm();
    displayFirstModal();
}
    
/**
 * Cette fonction initialise les écouteurs d'événements qui concernent l'affichage de la modale.
 */
function initAddEventListenermodal() {
    const modifyBtn = document.querySelector(".modifyProject");
    const modalBackground = document.querySelector(".modalBackground")
    modifyBtn.addEventListener("click", () => {
        // Quand on a cliqué sur le bouton partagé, on affiche la popup
        displayModal();
    })

    modalBackground.addEventListener("click", (event) => {
        // Si on a cliqué précisément sur la modalBackground 
        // (et pas un autre élément qui se trouve dedant)
        if (event.target === modalBackground) {
            // Alors on cache la popup
            hideModal();
        }
    })

    const modalCrossIcon = document.querySelector("#modalCrossIcon");
    modalCrossIcon.addEventListener("click", () => {
        hideModal();
    })
}

/**
 * Cette fonction génère les projets dans la modale à partir des données de l'API
 * @param {Array} works - Les projets à afficher
 */
function worksGenerationModal(works) {
    for (let i = 0; i < works.length; i++) {
        const project = works[i];

        // Récupération de l'élément de la modale qui accueillera les fiches projet
        const modalGallery = document.querySelector(".modalGallery");

        // Création d’une balise dédiée à une fiche projet
        const projectFigure = document.createElement("figure");
        projectFigure.dataset.id = project.id;
        modalGallery.appendChild(projectFigure);

        // Création des balises contenues dans la balise figure
        const imageProject = document.createElement("img");
        imageProject.src = project.imageUrl;
        imageProject.alt = project.title;
        projectFigure.appendChild(imageProject);

        // Création de l'icone poubelle
        const trashcanIconSpan = document.createElement("span");
        trashcanIconSpan.setAttribute("class","fa-stack fa-xs trashcanIcon");
        projectFigure.appendChild(trashcanIconSpan);
        trashcanIconSpan.dataset.id = project.id;

        const squareIcon = document.createElement("i");
        squareIcon.setAttribute("class","fa-solid fa-square fa-stack-2x");
        trashcanIconSpan.appendChild(squareIcon)
        const trashcanIcon = document.createElement("i");
        trashcanIcon.setAttribute("class","fa-solid fa-trash-can fa-stack-1x fa-inverse");
        trashcanIconSpan.appendChild(trashcanIcon)

        // Ajout des écouteurs sur les icones poubelle
        trashcanIcon.addEventListener("click", () => {
            const projectId = project.id;
            handleDeleteProject(projectId);
        });
    };
};
fetchWorks().then(works => {
    worksGenerationModal(works);
});

/**
 * Gestion du changement d'apparence de la modale
**/
const modalTop  = document.querySelector(".modalTop");
const modalArrowIcon  = document.querySelector("#modalArrowIcon");
const firstModal = document.querySelector(".firstModal");
const secondModal = document.querySelector(".secondModal");

function displayFirstModal(){
    firstModal.style.display = "flex";
    secondModal.style.display = "none";
    modalArrowIcon.style.display = "none";
    modalTop.style.justifyContent = "flex-end";
}

function displaySecondModal(){
    firstModal.style.display = "none";
    secondModal.style.display = "block";
    modalArrowIcon.style.display = "block";
    modalTop.style.justifyContent = "space-between";
}

modalArrowIcon.addEventListener("click", () => {
    displayFirstModal();
});

const addPhotoBtn = document.querySelector(".firstModal input");
addPhotoBtn.addEventListener("click", () => {
    displaySecondModal();		
});

/*********************************************************************************
 * 
 * Cette partie concerne le formulaire de création d'un nouveau projet. 
 * 
 *********************************************************************************/
/**
 * Cette fonction gère l'ajout de l'image à la création d'un projet
*/
function updateImageDisplay() {
    const preview = document.querySelector(".photoPreview");

    while (preview.firstChild) {
      preview.removeChild(preview.firstChild);
    }

    const curFiles = input.files;
    for (const file of curFiles) {
        if (validFileType(file)) {
            const image = document.createElement("img");
            image.src = URL.createObjectURL(file);
            image.alt = image.title = file.name;
            preview.appendChild(image);
            const photoPreview = document.querySelector(".photoPreview").style.display="block";
            const photoInputFile = document.querySelector(".photoInputFile").style.display="none";
        } else {
            const para = document.createElement("p");
            para.textContent = `Ce type de fichier n'est pas valide.`;
            preview.appendChild(para);
        }      
    }    
}

const input = document.querySelector(".addPhotoBox input");
input.addEventListener("change", updateImageDisplay);

/**
 * Cette fonction vérifie le type du fichier choisit
 */
// https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types
const fileTypes = [
    "image/jpeg",
    "image/png",
  ];
  
function validFileType(curFiles) {
    return fileTypes.includes(curFiles.type);
}

/**
 * Cette fonction place les catégories comme options dans l'input select
 * @param {Array} categories
 */
function categoriesSelection(categories){
    // Récupération de l'input select
    const inputSelect = document.querySelector("#categories");

    // Création des options
    for (let i = 0; i < categories.length; i++) {
        const selectOption = document.createElement("option");
        selectOption.value = categories[i].name;
        selectOption.dataset.id = categories[i].id;
        selectOption.innerText = categories[i].name;
        inputSelect.appendChild(selectOption);
    };
}
fetchCategories().then(categories => {
    categoriesSelection(categories);
});


/**
 * Gestion du changement d'aspect du bouton valider
*/

// Sélection des champs du formulaire
const imageInput = document.querySelector("#image_uploads");
const titleInput = document.querySelector("#title");
const categoriesInput = document.querySelector("#categories");

// Sélection du bouton "Valider"
const validateBtn = document.querySelector("#validate");

// Ajout d'écouteurs d'événements pour les champs du formulaire
imageInput.addEventListener("change", checkFormFields);
titleInput.addEventListener("input", checkFormFields);
categoriesInput.addEventListener("change", checkFormFields);

/**
 * Cette fonction vérifie l'état des champs et met à jour le bouton
 */
function checkFormFields() {
    const imageValue = imageInput.value;
    const titleValue = titleInput.value.trim();
    const categoriesValue = categoriesInput.value;

    if (titleValue && categoriesValue && imageValue) {
        validateBtn.style.backgroundColor = "#1D6154";
    } else {
        validateBtn.style.backgroundColor = "#A7A7A7";
    }
}

/**
 * Cette fonction réinitialise le formulaire dans la modale
 */
function resetForm() {
    // Réinitialise le champ de fichier (input de type "file")
    input.value="";
    const photoInputFile = document.querySelector(".photoInputFile").style.display="flex";
    const photoPreview = document.querySelector(".photoPreview").style.display="none";

    // Réinitialise la valeur des champs texte et select
    titleInput.value = "";
    categoriesInput.value = "";

    // Réinitialise la couleur du bouton Valider
    validateBtn.style.backgroundColor = "#A7A7A7";
}

/*********************************************************************************
 * 
 * Cette partie concerne la création et la suppression de projet. 
 * 
 *********************************************************************************/

/**
 * Cette fonction gère la création d'un projet
 */
async function handleCreateProject(){
    const newProjectData = new FormData();
    newProjectData.append("image", input.files[0], input.files[0].name);
    newProjectData.append("title", event.target.querySelector("[name=title]").value);
    newProjectData.append("category", event.target.querySelector("[name=categories]").options[event.target.querySelector("[name=categories]").selectedIndex].dataset.id);

    const token = localStorage.getItem('userToken');

    try {
        const response = await fetch("http://localhost:5678/api/works",{
            method: "POST",
            headers: { "Authorization": `Bearer ${token}` },
            body: newProjectData,
        });

        if (!response.ok) {
            console.error("Erreur lors de la création du projet :", response.statusText);
        } else {
            const responseData = await response.json();
            console.log("Projet créé avec succès :", responseData);

            // Mise à jour de l'affichage
            hideModal();
            updateGalleries();
        }
    } catch (error) {
        console.error("Erreur lors de la requête :", error);
    }
}

const form = document.querySelector(".modalform form");
form.addEventListener("submit", async(event) => {
    event.preventDefault();
    handleCreateProject();
});

/**
 * Cette fonction gère la suppression d'un projet
 */
async function handleDeleteProject(projectId) {
    const token = localStorage.getItem('userToken');

    try {
        const response = await fetch(`http://localhost:5678/api/works/${projectId}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` },
        });

        if (!response.ok) {
            console.error("Erreur lors de la suppression du projet :", response.statusText);
        } else {
            console.log("Projet supprimé avec succès");

            updateGalleries();
            
        }
    } catch (error) {
        console.error("Erreur lors de la requête de suppression :", error);
    }
}

/**
 * Cette fonction permet la mise à jour des galeries
 */
function updateGalleries() {
    // Mise à jour de l'affichage dans la modale
    const modalGallery = document.querySelector(".modalGallery");
    modalGallery.innerHTML = "";
    fetchWorks().then(works => {
        worksGenerationModal(works);
    });

    // Mise à jour de l'affichage dans la galerie principale
    const projectsGallery = document.querySelector(".gallery");
    projectsGallery.innerHTML = "";
    fetchWorks().then(works => {
        worksGeneration(works);
    });
}
