const mediaContainer = document.getElementById('mediaContainer');
const currentPageSpan = document.getElementById('currentPage');
const prevPageBtn = document.getElementById('prevPage');
const nextPageBtn = document.getElementById('nextPage');
prevPageBtn.innerHTML = '\u25C0'; // Flecha hacia la izquierda
nextPageBtn.innerHTML = '\u25B6';
prevPageBtn.style.display = 'none';
let currentPage = 1;
let startIndex = 0; // Definir startIndex en el ámbito global
let mediasPerPage = 12; // Define mediasPerPage fuera del ámbito de la promesa fetch
let allMedias = null; // Variable para almacenar todas las medias del JSON

fetch('medias.json')
.then(response => response.json())
.then(data =>{
  console.log(data);
  allMedias = data; // Almacena todas las medias en la variable allMedias
  displayMedias(allMedias, mediasPerPage); // Pasa mediasPerPage como argumento
  
  // Oculta el botón "Anterior" si estamos en la primera página después de cargar los datos
  if (currentPage === 1) {
    prevPageBtn.style.display = 'none';
  }
});



function displayMedias(medias, mediasPerPage) {
  startIndex = (currentPage - 1) * mediasPerPage; // Utilizar startIndex global
  const endIndex = Math.min(startIndex + mediasPerPage, medias.length);
  const currentMedias = medias.slice(startIndex, endIndex);
  
  mediaContainer.innerHTML = '';

  currentMedias.forEach(media => {
    const mediaItem = document.createElement('div');
    mediaItem.classList.add('media-item');

    mediaItem.innerHTML = `
    <img src="${media.imageUrl}">
    <p>${media.name}</p>
    <p>$${media.price}</p>`;
    mediaContainer.appendChild(mediaItem); 
  });

  currentPageSpan.textContent = currentPage;
}

prevPageBtn.addEventListener('click', ()=>{
  if(currentPage > 1) {
    currentPage--;
    displayMedias(allMedias, mediasPerPage); // Pasa allMedias y mediasPerPage como argumentos
    nextPageBtn.style.display = 'block'; // Muestra el botón "Siguiente" cuando retrocedes de página
  }
  // Oculta el botón "Anterior" si estamos en la primera página
  if (currentPage === 1) {
    prevPageBtn.style.display = 'none';
  }
});

nextPageBtn.addEventListener('click', () => {
  const totalPages = Math.ceil(allMedias.length / mediasPerPage);
  if (startIndex + mediasPerPage < allMedias.length) {
    currentPage++;
    displayMedias(allMedias, mediasPerPage); // Pasa allMedias y mediasPerPage como argumentos
    prevPageBtn.style.display = 'block'; // Muestra el botón "Anterior" cuando avanzas de página
  }
  // Oculta el botón "Siguiente" si estamos en la última página
  if (currentPage === totalPages) {
    nextPageBtn.style.display = 'none';
  }
});

// Esta función mostrará u ocultará el menú desplegable cuando se haga clic en el enlace de "CONTACTO"
function toggleDropdown() {
  var menu = document.getElementById("dropdown-content");
  menu.classList.toggle("show");
}



