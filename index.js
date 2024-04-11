document.addEventListener("DOMContentLoaded", function () {
    // api per accedere ai dati di pexels
    const apiKey = "lpstch25Nl1c06640EGUkpoS7d7NP4bLXYB2KSYbUAT4GjytI3lgd46m"
    const imageContainer = document.getElementById("image-container")
    const searchButton = document.getElementById("search-images")
    const searchQueryInput = document.getElementById("search-query")
  
    // click pulsante Carica immagini
    document.getElementById("load-images").addEventListener("click", function (e) {
      e.preventDefault()
      loadImages("Cat") // load immagini di gatti quando si clicca sul bottone load images
    })
  
    // click pulsante Carica immagini secondarie
    document.getElementById("load-secondary-images").addEventListener("click", function (e) {
      e.preventDefault()
      loadImages("Dog") //  load immagini di gatti quando si clicca sul bottone load images secondarie
    })
  
    // Quando viene cliccato il pulsante search for images
    searchButton.addEventListener("click", function (e) {
      e.preventDefault()
      const query = searchQueryInput.value.trim() // ciò che fviene scritto nel campo di ricerca in .trim cosi evitiamo spaziature
      if (query) {
        loadImages(query) // Carica le immagini in base a ciò che viene inserito nel campo di ricerca
      } else {
        alert("Per favore inserisci un termine di ricerca.") 
      }
    })
  
    // fun caricare le immagini in base al termine di ricerca
    function loadImages(query) {
      fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=9`, {
        headers: { Authorization: apiKey } // add chiave api richiesta
      })
      .then(response => response.json())
      .then(data => {
        imageContainer.innerHTML = "" 
        //ogni immagine ricevuta dalla ricerca
        data.photos.forEach(photo => {
          const colDiv = document.createElement('div') 
          colDiv.className = 'col-6 col-lg-4' 
          colDiv.innerHTML = `
            <div class="card mb-4 shadow-sm" id="card-${photo.id}">
            <a href="detail.html?id=${photo.id}">
        <img src="${photo.src.medium}" class="card-img-top" alt="Image" style="cursor:pointer;">
      </a>
              <div class="card-body">
              <a href="detail.html?id=${photo.id}" style="text-decoration:none;color:inherit;">
              <h5 class="card-title">${photo.photographer}</h5>
            </a>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                    <button type="button" class="btn btn-sm btn-outline-secondary" onclick="hideCard('${photo.id}')">Hide</button>
                  </div>
                  <small class="text-muted">ID: ${photo.id}</small>
                </div>
              </div>
            </div>` 
          imageContainer.appendChild(colDiv) 
        })
      })
      .catch(error => {
        console.error("Errore nel recupero dei dati:", error) 
        
        //quando api o qualcosa non viene caricato nel modo corretto mostra:
        alert("Impossibile caricare le immagini. Verifica la tua connessione o il termine di ricerca.")
      })
    }
  
    // quando si clicca su hide rimuove l'intera card
    window.hideCard = function (photoId) {
      const card = document.getElementById(`card-${photoId}`)
      if (card) {
        card.remove()
      }
    }
  })
