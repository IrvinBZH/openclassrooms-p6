'use strict'
const containerGallery = document.querySelector("#portfolio .gallery");
const containerFiltres = document.querySelector(".filtres");
let works = [];
let categories = [];

// Récupération de l'API Méthode GET 
// Avec Async, quand j'éxecute ma fonction, elle n'est pas bloquante, comme elle est asynchrone elle continue à éxécuter les autres scripts
const getWorks = async () => {
        await fetch("http://localhost:5678/api/works")
          .then((response) => response.json())
          .then(data => createWorks(data))
          .catch((error) => {
                console.log(error);
              });
};

// Apparition des travaux sur le DOM // 
    
const createWorks = (works) => {
  console.log(works);
const containerGallery = document.querySelector("#portfolio .gallery");
  works.forEach ((work) => {
        const figureItem = `
        <figure data-id="${work.id}">
				<img src="${work.imageUrl}" alt="${work.title}">
				<figcaption>${work.title}</figcaption>
			  </figure>
        `;
        containerGallery.insertAdjacentHTML("beforeend", figureItem);
  });
};

getWorks();

// boucle for of

// funtion avec message derrière (display error) au lieu de mettre dans la funtion getWorks


// mettre en session mes data
// je recupere mes datas et je les met en session en sessionStorage
// tout debut fichier, tester dabord si ya quelque chose dans ma sessions si elle existe, si elle existe je les recupere, si elle existe pas j'appelle la fonction getWorks
// A chaque fois qu'on repasse par page d'acceuil je n'aurais pas a recharger les données
// stringify

// devoir les parse apres, il s sont en text transformer en objet json pour les utilser

// Création des boutons filtres par catégorie //

const getCategories = () => {
  fetch('http://localhost:5678/api/categories')
  .then((response) => response.json())
  .then((data) => {
    data.forEach(category => {
      const btn = document.createElement('button')
      btn.innerHTML = category.name

      btn.addEventListener('click', () => {
        const workToDisplay = works.filter((work) => {
          return work.category.id == category.id;
        });
        createWorks(workToDisplay);
      })
      document.querySelector('.filters-container').appendChild(btn)
    });
  })
  .catch((error) => {
    console.log(error);
  });
};

getCategories()

document.getElementById('filterst').addEventListener('click', () => {
  createWorks(works);
});