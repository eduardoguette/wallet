/* Variables */
const configurarCuenta = document.querySelector(".account-config"); //modal configurar cuenta
const btnCrearCuenta = document.querySelector("#nav-new-account"); //button configurar cuenta

// introducir presupuesto
const formularioCrearCuenta = document.querySelector("#register-account button");
const cerrarFormularioCrearCuenta = document.querySelector(".close-config-account");

// lista de entradas de registro de gastos
const gastos = document.querySelector("#records");

// categoria menu
const categoriaAgregarGasto = document.getElementById("category");
const navCategoria = document.querySelector(".nav-category");

// seleccionar color
const color = document.querySelector(".color-selected");
const palleteColor = document.querySelector('.pallete')

// seleccionar tipo de cuenta 
const tipoDeCuenta = document.querySelector('#type-account')
const selectTipoCuenta = document.querySelector('.nav-type-account')


// selecionar tipo de moneda 
const tipoDeMoneda = document.querySelector('.currency')
const navCurrency = document.querySelector('.nav-currency')

const nuevoRegistro = document.querySelector(".more-record");
const submitRegistro = document.querySelector("#btn-new-record");

// cerrar modal agregar registro
const buttonCerrarRegistro = document.querySelector(".close-new-record");



/* Eventos */
eventListeners();
function eventListeners() {
  btnCrearCuenta.addEventListener("click", configCrearCuenta);

  
  //color
  color.addEventListener("click", mostrarPallete);

  // tipo de cuenta 
  tipoDeCuenta.addEventListener('click', mostrarSeleccionarTipoCuenta)
  selectTipoCuenta.addEventListener('click', tipoDeCuentaSeleccionada)

  // categoria
  categoriaAgregarGasto.addEventListener("click", seleccionarCategoriaRegistro);
  navCategoria.addEventListener("click", categriaSeleccionada);


  // tipo de moneda
  tipoDeMoneda.addEventListener('click', seleccionarTipoDeMoneda)
  navCurrency.addEventListener('click', tipoDeMonedaSeleccionada)


  nuevoRegistro.addEventListener("click", crearNuevoRegistro);
  buttonCerrarRegistro.addEventListener("click", crearNuevoRegistro);
}

/* clases */

/* Funciones */

function configCrearCuenta() {
  configurarCuenta.classList.toggle("show");
}

function seleccionarCategoriaRegistro() {
  navCategoria.classList.toggle("active");
}

function categriaSeleccionada(e) {
  e.preventDefault();
  if (e.target.tagName == "IMG") {
    copiarHTMLSeleccionada(e.target.parentNode.parentNode);
  } else if (e.target.classList.contains("category-img") || e.target.classList.contains("text-category")) {
    copiarHTMLSeleccionada(e.target.parentNode);
  } else {
    copiarHTMLSeleccionada(e.target);
  }
}

// tipo de cuenta
function mostrarSeleccionarTipoCuenta(){
  selectTipoCuenta.classList.toggle('active')
}
function tipoDeCuentaSeleccionada(e){
  if (e.target.tagName == "IMG") {
    copiarHTMLCuentaSeleccionada(e.target.parentNode.parentNode);
  } else if (e.target.classList.contains("category-img") || e.target.classList.contains("text-category")) {
    copiarHTMLCuentaSeleccionada(e.target.parentNode);
  } else {
    copiarHTMLCuentaSeleccionada(e.target);
  }
}
function copiarHTMLCuentaSeleccionada(elemento){
  const selectedTipoCuenta = document.querySelector("#type-account .type-selected");
  selectedTipoCuenta.innerHTML = elemento.innerHTML;
}


// Seleccionar tipo de moneda

function seleccionarTipoDeMoneda(){
  
  navCurrency.classList.toggle('active')
}
function tipoDeMonedaSeleccionada(e){
  copiarHTMLTipoMoneda(e.target);
}
function copiarHTMLTipoMoneda(elemento){
  const tipoDeMonedaSelected = document.querySelector(".currency .selected");
  tipoDeMonedaSelected.innerHTML = elemento.innerHTML;
}

function mostrarPallete() {
  document.querySelector(".pallete").classList.toggle("show");
}
function colorSeleccionado(id, color){
  document.querySelector('.color-selected .selected').dataset.id = id;
  document.querySelector('.color-selected .selected').style.background = color;
}

function copiarHTMLSeleccionada(elemento) {
  const selectedCategory = document.querySelector("#category .selected li");
  selectedCategory.innerHTML = elemento.innerHTML;
}
// muestra modal
function crearNuevoRegistro() {
  document.querySelector("section.new-record").classList.toggle("show");
}



/*
 * IMPORTANT
 */

function cleanHTML(div) {
  while (div.firstChild) {
    div.removeChild(div.firstChild);
  }
}

function seleccionarTipoModena(e) {
  if (e.target.classList.contains("currency") || e.target.parentNode.classList.contains("currency")) {
    document.querySelector(".currency").classList.toggle("show");
    return;
  } else if (e.target.classList.contains("option")) {
    document.querySelector(".currency .selected").textContent = e.target.textContent;
    document.querySelector(".currency").classList.toggle("show");
    return;
  }
}

optionColor();
function optionColor() {
  const divPallete = document.querySelector(".color-selected .pallete");
  cleanHTML(divPallete);

  const objColor = {
    0: "rgb(38, 198, 218)",
    1: "rgb(0, 151, 167)",
    2: "rgb(13, 71, 161)",
    3: "rgb(21, 101, 192)",
    4: "rgb(3, 155, 229)",
    5: "rgb(100, 181, 246)",
    6: "rgb(255, 111, 0)",
    7: "rgb(255, 160, 0)",
    8: "rgb(255, 179, 0)",
    9: "rgb(206, 150, 0)",
    10: "rgb(141, 110, 99)",
    11: "rgb(109, 76, 65)",
    12: "rgb(211, 47, 47)",
    13: "rgb(255, 23, 68)",
    14: "rgb(244, 67, 54)",
    15: "rgb(236, 64, 122)",
    16: "rgb(173, 20, 87)",
    17: "rgb(106, 27, 154)",
    18: "rgb(171, 71, 188)",
    19: "rgb(186, 104, 200)",
    20: "rgb(0, 105, 92)",
    21: "rgb(0, 137, 123)",
    22: "rgb(77, 182, 172)",
    23: "rgb(46, 125, 50)",
    24: "rgb(67, 160, 71)",
    25: "rgb(100, 221, 23)",
    26: "rgb(33, 33, 33)",
    27: "rgb(95, 124, 138)",
    28: "rgb(176, 190, 197)",
    29: "rgb(69, 90, 100)",
    30: "rgb(96, 125, 139)",
    31: "rgb(144, 164, 174)",
  };
  const selectedColor = document.querySelector(".color-selected .selected");
  selectedColor.style = "background: rgb(173, 20, 87);";
  for (let i in objColor) {
    const id = i;
    const color = objColor[i];
    const div = document.createElement("div");
    div.style = `
    background:${color}; 
    height: calc(1.5em - 2px);
    width: calc(1.5em - 2px);
    border-radius:1em;
    display: flex;
    border: 1px solid rgba(0,0,0,.1);
    `;
    div.onclick = () => {
      colorSeleccionado(id, color);
    };
    divPallete.appendChild(div);
  }
}

function timeSince(date) {

  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}