
const cartes = document.querySelectorAll(".carte");
const section = document.querySelector("section");
const paragraphe = document.querySelector("#selection");
const position = document.querySelector("#position");

const zoneCouleur = document.querySelector("#zone-couleur");
const panneau = document.querySelector("#panneau");
const bouton = document.querySelector("#monBouton");

const conteneur = document.querySelector("#conteneur");
const compteur = document.querySelector("#compteur");

let numeroNotification = 0;


// Mettre à jour le compteur
function actualiserCompteur() {
    compteur.textContent = `Joueurs présents : ${conteneur.children.length}`;
}

// Animer l'arrivée d'une sélection
function afficherNotification(notification) {
    const style = window.getComputedStyle(notification);

    notification.animate(
        [
            { height: "0px", margin: "0px", padding: "0px", opacity: 0 },
            { height: style.height, margin: style.margin, padding: style.padding, opacity: 1 },
        ],
        { duration: 500, easing: "ease-out" }
    );
}

// Retirer la sélection à la fin de l'animation
function supprimerNotification(notification) {
    notification.dataset.suppression = "en-cours";

    const style = window.getComputedStyle(notification);

    notification.animate(
        [
            { height: style.height, margin: style.margin, padding: style.padding, opacity: style.opacity },
            { height: "0px", margin: "0px", padding: "0px", opacity: 0 },
        ],
        { duration: 500, easing: "ease-in", fill: "forwards" }
    ).finished.then(() => {
        notification.remove();
        actualiserCompteur();
    });
}


// Créer une notification
function creerNotification(joueur) {
    numeroNotification++;

    const notification = document.createElement("article");
    notification.classList.add("notification");
    notification.dataset.numero = numeroNotification;
    notification.dataset.joueur = joueur;

    const texte = document.createElement("p");
    texte.textContent = `Top n° ${numeroNotification} : ${joueur}`;

    // Bouton modifier
    const modifier = document.createElement("button");
    modifier.classList.add("btn-modifier");
    modifier.textContent = "Modifier";

    // Bouton supprimer
    const supprimer = document.createElement("button");
    supprimer.classList.add("btn-supprimer");
    supprimer.textContent = "Supprimer";

    const monter = document.createElement("button");
    monter.classList.add("btn-monter");
    monter.textContent = "Monter";

    const descendre = document.createElement("button");
    descendre.classList.add("btn-descendre");
    descendre.textContent = "Descendre";

    notification.append(texte, modifier, supprimer, monter, descendre);

    return notification;
}


// Clic sur les cartes
cartes.forEach((carte) => {
    carte.addEventListener("click", (event) => {

        const idCurrent = event.currentTarget.id;
        const idTarget = event.target.id;

        paragraphe.textContent = `Joueur sélectionné : ${idCurrent}`;

        console.log("Carte :", idCurrent);
        console.log("Élément cliqué :", idTarget);

        // Changer le style de la carte
        carte.classList.toggle("selectionnee");


        // Ajouter une sélection
        const notification = creerNotification(idCurrent);
        conteneur.append(notification);
        afficherNotification(notification);

        actualiserCompteur();
    });
});





// Gérer les boutons de l'historique
conteneur.addEventListener("click", (event) => {
    const notification = event.target.closest(".notification");
    if (!notification || notification.dataset.suppression) return;

    if (event.target.closest(".btn-modifier")) {
        notification.querySelector("p").textContent =
            `Top n° ${notification.dataset.numero} : ${notification.dataset.joueur} modifiée !`;
        notification.animate(
            [
                { transform: "translateX(0)", opacity: 1, offset: 0 },
                { transform: "translateX(20px)", opacity: 1, offset: 0.4 },
                { transform: "translateX(20px)", opacity: 0.3, offset: 0.7 },
                { transform: "translateX(0)", opacity: 1, offset: 1 },
            ],
            { duration: 500 }
        );
    }

    if (event.target.closest(".btn-supprimer")) {
        supprimerNotification(notification);
    }

    if (event.target.closest(".btn-monter")) {
        const precedente = notification.previousElementSibling;
        if (precedente) conteneur.insertBefore(notification, precedente);
    }

    if (event.target.closest(".btn-descendre")) {
        const suivante = notification.nextElementSibling;
        if (suivante) conteneur.insertBefore(suivante, notification);
    }
});

const formulaire = document.querySelector("#form-contact");
const champNom = document.querySelector("#nom");
const compteurInput = document.querySelector(".cpt-input strong");
const compteurChange = document.querySelector(".cpt-change strong");
const messageFormulaire = document.querySelector("#message-formulaire");

formulaire.addEventListener("submit", (event) => {
    event.preventDefault();

    if (champNom.value.trim() === "") {
        champNom.classList.add("shake-error");
        champNom.focus();
        messageFormulaire.textContent = "Entre ton nom.";
    } else {
        messageFormulaire.textContent = `Nom validé : ${champNom.value.trim()}`;
    }
});

champNom.addEventListener("animationend", () => {
    champNom.classList.remove("shake-error");
});

champNom.addEventListener("input", () => {
    compteurInput.textContent = champNom.value.length;
    messageFormulaire.textContent = "";
});

champNom.addEventListener("change", () => {
    compteurChange.textContent = champNom.value.length;
});

// Afficher ou masquer l'historique
bouton.addEventListener("click", (event) => {
    console.log("Composant écouté :", event.currentTarget);
});
