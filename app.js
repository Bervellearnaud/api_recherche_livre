// Attendez que la page soit complètement chargée
document.addEventListener("DOMContentLoaded", function () {
  // Sélectionnez les éléments HTML pertinents
  const searchForm = document.getElementById("search-form");
  const searchInput = document.getElementById("search-input");
  const searchResults = document.getElementById("search-results");

  // Écoutez l'événement de soumission du formulaire de recherche
  searchForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Empêche le rechargement de la page

    // Effacez les résultats de recherche précédents
    searchResults.innerHTML = "";

    // Récupérez la valeur de recherche saisie par l'utilisateur
    const searchTerm = searchInput.value.trim();

    // Vérifiez si un terme de recherche a été saisi
    if (searchTerm !== "") {
      // Effectuez une requête à l'API Open Library
      fetch(
        `http://openlibrary.org/search.json?q=${encodeURIComponent(searchTerm)}`
      )
        .then((response) => response.json())
        .then((data) => {
          // Traitez les données de réponse
          displayResults(data);
        })
        .catch((error) => {
          console.error(
            "Une erreur s'est produite lors de la recherche :",
            error
          );
        });
    }
  });

  // Fonction pour afficher les résultats de recherche
  function displayResults(data) {
    const docs = data.docs;

    if (docs.length === 0) {
      searchResults.innerHTML = "Aucun résultat trouvé.";
    } else {
      const fragment = document.createDocumentFragment();

      docs.forEach((doc) => {
        const title = doc.title ? doc.title : "Titre inconnu";
        const author = doc.author_name
          ? doc.author_name.join(", ")
          : "Auteur inconnu";
        const coverUrl = `http://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`;

        const resultItem = document.createElement("div");
        resultItem.classList.add("result-item");
        resultItem.innerHTML = `<img src="${coverUrl}" alt="${title}"/><h3>${title}</h3><p>${author}</p>`;

        fragment.appendChild(resultItem);
      });

      searchResults.appendChild(fragment);
    }
  }
});
