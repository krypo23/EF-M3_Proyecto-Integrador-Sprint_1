const input = document.querySelector('input[aria-label="Buscar receta"]');
const boton = document.getElementById("botonBuscar");
const contenedor = document.getElementById("resultsContainer");
let myModal;

class Receta {
  constructor(mealData) {
    this.nombre = mealData.strMeal;
    this.imagen = mealData.strMealThumb;
    this.id = mealData.idMeal;
  }

// Cambiamos el nombre a algo más descriptivo
  crearElementoDOM() {
    // 1. Crear el contenedor principal (la columna)
    const colDiv = document.createElement('div');
    colDiv.className = 'col-12 col-md-6 col-lg-4 mb-4';

    // 2. Crear la tarjeta
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card h-100 shadow-sm';

    // 3. Crear la imagen
    const img = document.createElement('img');
    img.src = this.imagen;
    img.className = 'card-img-top';
    img.alt = this.nombre;

    // 4. Crear el cuerpo de la tarjeta
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    // 5. El Título
    const h5 = document.createElement('h5');
    h5.className = 'card-title';
    h5.textContent = this.nombre; // Usamos textContent en lugar de innerText (más rápido)

    // 6. El Botón (LA PARTE MÁS IMPORTANTE)
    const btn = document.createElement('button');
    btn.className = 'btn btn-primary w-100';
    btn.textContent = 'Ver Ingredientes';
    

    btn.addEventListener('click', () => {
        verDetalles(this.id);
    });


    cardBody.appendChild(h5);
    cardBody.appendChild(btn);

    cardDiv.appendChild(img);
    cardDiv.appendChild(cardBody);

    colDiv.appendChild(cardDiv);

    return colDiv;
  }
}

const buscarRecetas = async () => {
  const ingrediente = input.value.trim();
  if (ingrediente === "") {
    alert("ALERTA : Por favor, ingresa un ingrediente para buscar recetas.");
    return;
  }
  try {
    const respuesta = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`
    );
    const datos = await respuesta.json();
    contenedor.innerHTML = "";
    if (datos.meals) {
        const fragmento = document.createDocumentFragment();
      datos.meals.forEach((mealData) => {
        const receta = new Receta(mealData);
        fragmento.appendChild(receta.crearElementoDOM());
      });
        contenedor.appendChild(fragmento);
    } else {
      contenedor.innerHTML =
        '<p class="text-center">No se encontraron recetas para el ingrediente proporcionado.</p>';
    }
  } catch (error) {
    console.error("Error al buscar recetas:", error);
    alert(
      "Hubo un error al buscar las recetas. Por favor, intenta nuevamente más tarde."
    );
  }
};
const verDetalles = async (id) => {
  try {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const res = await fetch(url);
    const data = await res.json();
    const recetaDetalle = data.meals[0];

    const modalElement = document.getElementById('recetaModal');
    const modalInstance = new bootstrap.Modal(modalElement);
    // -----------------------

    // Lógica de ingredientes...
    let listaIngredientes = '<ul class="list-group">';
    for (let i = 1; i <= 20; i++) {
      const ingrediente = recetaDetalle[`strIngredient${i}`];
      const medida = recetaDetalle[`strMeasure${i}`];

      if (ingrediente && ingrediente.trim() !== "") {
        listaIngredientes += `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                ${ingrediente}
                <span class="badge bg-primary rounded-pill">${medida}</span>
            </li>
        `;
      }
    }
    listaIngredientes += "</ul>";

    // Pintar el modal
    document.getElementById("modalTitulo").innerText = recetaDetalle.strMeal;
    document.getElementById("modalCuerpo").innerHTML = `
        <img src="${recetaDetalle.strMealThumb}" class="img-fluid mb-3 rounded" />
        <h6>Instrucciones:</h6>
        <p>${recetaDetalle.strInstructions}</p> <hr>
        <h6>Ingredientes:</h6>
        ${listaIngredientes}
    `;

    // 3. AHORA SÍ: Usamos la instancia (el motor) para mostrarlo
    modalInstance.show();

  } catch (error) {
    console.error("Error obteniendo detalles", error);
  }
};
boton.addEventListener("click", (e) => {
  e.preventDefault();
  buscarRecetas();
});
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault(); 
    buscarRecetas();    
  }
});
