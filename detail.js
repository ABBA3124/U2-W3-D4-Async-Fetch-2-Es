document.addEventListener("DOMContentLoaded", function () {
    // cerchiamo i parametri url della pagina
    const params = new URLSearchParams(window.location.search)
    // Prendiamo id immagine dai parametri url
    const imageId = params.get("id")
    // Chiave API per accedere ai dati di pexels
    const apiKey = "lpstch25Nl1c06640EGUkpoS7d7NP4bLXYB2KSYbUAT4GjytI3lgd46M"

    // richiesta per ottenere i dati immagine usando id 
    fetch(`https://api.pexels.com/v1/photos/${imageId}`, {
      headers: { Authorization: apiKey }, // includo la chiave api nelle intestazioni della richiesta
    })
      // Se la richiesta ha successo converte in JSON
      .then((response) => response.json())
      // utilizziamo i dati ottenuti per visualizzare immagine + info autore
      .then((data) => {
        const container = document.getElementById("image-detail-container")
        // add immagine + nome autore + link alla sua pagina personale
        container.innerHTML = `
      <div class="text-center">
        <img src="${data.src.large}" class="img-fluid" alt="Detailed Image"> 
        <h2>${data.photographer}</h2> 
        <p><a href="${data.photographer_url}" target="_blank">Visita la pagina dell'artista</a></p> 
      </div>`
      })
      // se ciò non avviene:
      .catch((error) => {
        console.error("Errore nel recupero dei dati:", error) 
        alert("Impossibile caricare i dati.") 
      })
  })
