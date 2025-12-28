📥 EF- M4 Proyecto Integrador Sprint 2
Sprint 2: Desarrollo de Funcionalidad y Conexión a API

(Entregable al final del Módulo 4)

Briefing del Cliente: "Gourmet Go" - Fase 2

¡El equipo está muy satisfecho con el prototipo visual del Sprint 1! El diseño ha sido aprobado y ahora es el momento de darle vida a la aplicación.

Para este segundo y último sprint, el objetivo es transformar la maqueta estática en una aplicación web completamente funcional. Esto implica conectar la interfaz con una API de recetas real, gestionar las búsquedas del usuario de forma asíncrona y mostrar los resultados dinámicamente en la página.

Información Clave sobre la API de TheMealDB:

Antes de comenzar, es fundamental entender cómo obtendremos los datos. Para saber qué ingredientes se pueden buscar, la API nos proporciona un endpoint que lista todas las opciones disponibles:

    Endpoint para listar todos los ingredientes: https://www.themealdb.com/api/json/v1/1/list.php?i=list

Al consultar esta dirección, obtendrán un objeto JSON que contiene un array. Cada elemento de ese array es un objeto que representa un ingrediente. La propiedad clave que nos interesa de cada objeto es strIngredient. Este es el dato que luego utilizaremos en el endpoint de filtrado para buscar las recetas.

Por ejemplo, un segmento del JSON que devuelve la API se ve así:

{
      "idIngredient": "47",
      "strIngredient": "Cardamom",
      "strDescription": null,
      "strType": null
    }

Conocer este listado les permitirá entender qué datos son válidos para las búsquedas que implementarán a continuación. Al finalizar este sprint, tendremos un producto mínimo viable (MVP) listo para ser presentado.

Historias de Usuario a Implementar

HU-04: Búsqueda Funcional de Recetas

    Como usuario,

    Quiero poder escribir un ingrediente en la barra de búsqueda y presionar "Buscar",

    Para obtener una lista de recetas que contengan ese ingrediente.

Criterios de Aceptación:

    ✅ Al enviar el formulario de búsqueda (haciendo clic en el botón o presionando Enter), se debe prevenir el comportamiento por defecto de recarga de la página.

    ✅ Se debe capturar el texto ingresado por el usuario en el campo de búsqueda.

    ✅ Se debe realizar una llamada asíncrona a la API de TheMealDB usando el ingrediente capturado. El endpoint a utilizar es: https://www.themealdb.com/api/json/v1/1/filter.php?i=[ingrediente_del_usuario].

    ✅ La llamada a la API debe realizarse utilizando la sintaxis moderna fetch con async/await.

HU-05: Renderizado Dinámico de Resultados

    Como usuario,

    Quiero que los resultados de mi búsqueda aparezcan en la galería sin que la página se recargue,

    Para tener una experiencia de usuario fluida y rápida.

Criterios de Aceptación:

    ✅ Las tarjetas de recetas "hard-codeadas" del index.html deben ser eliminadas. El contenedor de resultados debe estar vacío por defecto.

    ✅ Por cada receta devuelta por la API, se debe generar dinámicamente una tarjeta HTML y añadirla al DOM.

    ✅ La estructura HTML de cada tarjeta debe ser generada utilizando template literals de ES6+ y debe replicar exactamente el diseño de las tarjetas del Sprint 1 (usando las mismas clases de Bootstrap).

    ✅ Los datos de la receta (nombre, imagen) deben ser extraídos del objeto de respuesta de la API, preferiblemente usando desestructuración.

    ✅ Al realizar una nueva búsqueda, los resultados anteriores deben ser eliminados del contenedor antes de mostrar los nuevos.

HU-06: Manejo de Búsquedas sin Resultados

    Como usuario,

    Quiero recibir un mensaje claro si mi búsqueda no encuentra ninguna receta,

    Para saber que la búsqueda se completó y que debo intentar con otro ingrediente.

Criterios de Aceptación:

    ✅ Si la respuesta de la API indica que no se encontraron recetas para un ingrediente (meals es null), el contenedor de resultados debe mostrar un único mensaje informativo, como por ejemplo: "Lo sentimos, no se encontraron recetas. Intenta con otro ingrediente."

Requisitos Técnicos y Entregables

    Código Fuente: Todo el código JavaScript debe ser escrito en el archivo app.js.

    Sintaxis Moderna (ES6+): Es mandatorio el uso de let y const para la declaración de variables, arrow functions, template literals y destructuring.

    Asincronía: La gestión de las llamadas a la API debe realizarse con fetch y la sintaxis async/await para un manejo de código limpio y legible.

    Manipulación del DOM: Toda la interacción con el HTML (lectura de inputs, limpieza y renderizado de resultados) debe hacerse a través de los métodos del DOM.

    Buenas Prácticas (Opcional pero recomendado): Considerar el uso de Programación Orientada a Objetos (POO) creando una clase Receta para modelar y estandarizar los datos recibidos de la API antes de renderizarlos.

    Entregable: Un repositorio público de GitHub con el proyecto finalizado y completamente funcional. El enlace al repositorio es el único entregable requerido.

aqui dejare la card original
<div class="col-12 col-md-6 col-lg-4">
                <div class="card h-100 shadow-sm">
                    <img src="https://dummyimage.com/600x400/e67e22/ffffff&text=Pizza+Casera" class="card-img-top" alt="Pizza">
                    <div class="card-body">
                        <h5 class="card-title">Pizza Casera</h5>
                        <p class="card-text">Una deliciosa pizza con masa madre y salsa de tomate fresca.</p>
                        <a href="#" class="btn btn-primary w-100">Ver Receta</a>
                    </div>
                </div>
            </div>

            <div class="col-12 col-md-6 col-lg-4">
                <div class="card h-100 shadow-sm">
                    <img src="https://dummyimage.com/600x400/2ecc71/ffffff&text=Ensalada+Cesar" class="card-img-top" alt="Ensalada">
                    <div class="card-body">
                        <h5 class="card-title">Ensalada César</h5>
                        <p class="card-text">Clásica, ligera y con el aderezo original.</p>
                        <a href="#" class="btn btn-primary w-100">Ver Receta</a>
                    </div>
                </div>
            </div>

            <div class="col-12 col-md-6 col-lg-4">
                <div class="card h-100 shadow-sm">
                    <img src="https://dummyimage.com/600x400/5d4037/ffffff&text=Brownie" class="card-img-top" alt="Postre">
                    <div class="card-body">
                        <h5 class="card-title">Brownie de Chocolate</h5>
                        <p class="card-text">El postre perfecto para los amantes del cacao.</p>
                        <a href="#" class="btn btn-primary w-100">Ver Receta</a>
                    </div>
                </div>
            </div>

             <div class="col-12 col-md-6 col-lg-4">
                <div class="card h-100 shadow-sm">
                    <img src="https://dummyimage.com/600x400/c0392b/ffffff&text=Spaghetti" class="card-img-top" alt="Pasta">
                    <div class="card-body">
                        <h5 class="card-title">Spaghetti Bolognese</h5>
                        <p class="card-text">Pasta fresca con salsa de carne italiana.</p>
                        <a href="#" class="btn btn-primary w-100">Ver Receta</a>
                    </div>
                </div>
            </div>

             <div class="col-12 col-md-6 col-lg-4">
                <div class="card h-100 shadow-sm">
                    <img src="https://dummyimage.com/600x400/f1c40f/000000&text=Tacos" class="card-img-top" alt="Tacos">
                    <div class="card-body">
                        <h5 class="card-title">Tacos al Pastor</h5>
                        <p class="card-text">Sabor mexicano auténtico con piña y cilantro.</p>
                        <a href="#" class="btn btn-primary w-100">Ver Receta</a>
                    </div>
                </div>
            </div>

             <div class="col-12 col-md-6 col-lg-4">
                <div class="card h-100 shadow-sm">
                    <img src="https://dummyimage.com/600x400/3498db/ffffff&text=Sushi+Roll" class="card-img-top" alt="Sushi">
                    <div class="card-body">
                        <h5 class="card-title">Sushi Roll</h5>
                        <p class="card-text">Roll de salmón y palta, fresco y saludable.</p>
                        <a href="#" class="btn btn-primary w-100">Ver Receta</a>
                    </div>
                </div>
            </div>
