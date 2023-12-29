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
            const errorMessage = document.querySelector(".errorMessage").style.display = "flex";
        }
        return response.json();
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

    try {
        const responseData = await login(userCredentials);
        handleLoginResponse(responseData);
    } catch (error) {
        console.error("Erreur lors de la requête :", error);
    }
});