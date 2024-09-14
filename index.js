// To Do
// Almacenar las variables necesarias
// Crear funcion init
// enlazar el evento del form con el submit
// crear un validador para el submit de tipo numero no disponible
// crear un render para el validador de submit
// crear un validador al no ingresar un numero
// crear un render si no ingreso un numero
// crear una funcion con filter para encontar la pizza seleccionada con el input
// crear el render con la card del filter seleccionado

// Guardar en el Local Storage LA ULTIMA PIZZA RENDERIZADA, no los msj de error

const pizzas = [
  {
    id: 1,
    nombre: "pizza de Muzzarella",
    precio: 500,
    ingredientes: ["Muzzarella", "Tomate", "Aceitunas"],
    imagen: "./img/muzzarella.png",
  },

  {
    id: 2,
    nombre: "pizza de Cebolla",
    precio: 1500,
    ingredientes: ["Muzzarella", "Tomate", "Cebolla"],
    imagen: "./img/cebolla.png",
  },

  {
    id: 3,
    nombre: "pizza 4 Quesos",
    precio: 1380,
    ingredientes: [
      "Muzzarella",
      "Tomate",
      "Queso Azul",
      "Parmesano",
      "Roquefort",
    ],
    imagen: "./img/4quesos.png",
  },

  {
    id: 4,
    nombre: "pizza Especial",
    precio: 1000,
    ingredientes: ["Muzzarella", "Tomate", "Rucula", "Jamón"],
    imagen: "./img/especial.png",
  },

  {
    id: 5,
    nombre: "pizza con Anana",
    precio: 600,
    ingredientes: ["Muzzarella", "Tomate", "Anana"],
    imagen: "./img/anana.png",
  },
];

// Definir las variables de los elementos HTML necesarios
const pizzasForm = document.querySelector(".searchForm");
const pizzasInput = document.querySelector(".numberInput");
const pizzasRender = document.querySelector(".resultContainer");

const encontrarPizza = (e) => {
  e.preventDefault();
  const number = numberInput.value;

  // Verificar si se ha ingresado un número o si está vacío
  if (!number) {
    renderizarError("Por favor, ingresa un número.");
    return;
  }

  // Verificar si el número ingresado es válido
  if (!esNumeroValido(number)) {
    renderizarError("Por favor, ingresa un número válido.");
    return;
}

  buscarPizzaPorId(parseInt(number));
};


// Función para verificar si el valor ingresado es un número válido
function esNumeroValido(value) {
  return !isNaN(value) && Number(value) > 0;
}

// Función para buscar pizza por ID
function buscarPizzaPorId(id) {
  const resultContainer = document.getElementById("resultContainer");
  
  // Limpiar el contenedor antes de renderizar
  resultContainer.innerHTML = "";

  const pizza = pizzas.find(pizza => pizza.id === id);

  if (pizza) {
      renderizarPizza(pizza);
  } else {
      renderizarError(`No se encontró ninguna pizza con el ID ${id}.`);
  }
}

// Función para generar el HTML 
function generarHtmlPizza(pizza) {
  return `
      <div class="card">
          <img src="${pizza.imagen}" alt="${pizza.nombre}">
          <h3>${pizza.nombre}</h3>
          <p>Precio: <span>$${pizza.precio}</span></p>
          <h4>Ingredientes:</h4>
          <ul>
              ${pizza.ingredientes.map(ingrediente => `<li>${ingrediente}</li>`).join('')}
          </ul>
      </div>
  `;
}

// Función para renderizar la card de la pizza 
function renderizarPizza(pizza) {
  const resultContainer = document.getElementById("resultContainer");

  // Inyectar el HTML generado en el contenedor
  resultContainer.innerHTML = generarHtmlPizza(pizza);

  guardarPizza(pizza);
}

// Función para renderizar mensaje de error
function renderizarError(mensaje) {
  const resultContainer = document.getElementById("resultContainer");

  // Renderiza el mensaje de error, pisando el contenido previo
  resultContainer.innerHTML = `<p class="error-message">${mensaje}</p>`;
}

// Función para guardar la pizza en el Local Storage
function guardarPizza(pizza) {
  localStorage.setItem('ultimaPizza', JSON.stringify(pizza))
}

function mostrarUltimaPizza() {
  const pizzaGuardada = localStorage.getItem('ultimaPizza');

  if(pizzaGuardada) {
    const pizza = JSON.parse(pizzaGuardada);
    renderizarPizza(pizza);
  }
}

// Funcion inicializadora
const init = () => {
  document.addEventListener("DOMContentLoaded", mostrarUltimaPizza)
  searchForm.addEventListener("submit", encontrarPizza);
};

init();
