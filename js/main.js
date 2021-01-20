/* variables */
const formularioNuevoGasto = document.getElementById("new-record");
const gastoListado = document.querySelector("#records");

const registrarCuenta = document.querySelector("#form-wallet");
const cerrarModalRegistrarCuenta = document.querySelector(".close-config-account");

// variables formulario nueva cuenta
const bannerNuevaCuenta = document.querySelector(".account-config-container");
let nombreDeCuenta = document.getElementById("name");
let colorCuenta = document.querySelector(".color-selected .selected");
let tipoCuenta = document.querySelector("#type-account .type-selected");
let cantidadPresupuesto = document.getElementById("staring-amount");
let tipoMoneda = document.querySelector(".currency .selected");

// variables formulario nuevo registro
let price = document.getElementById("ammount");
let category = document.querySelector("#category .selected .text-category");
let beneficiario = document.getElementById("description");

/* eventos */
listeners();
function listeners() {
  document.addEventListener("DOMContentLoaded", configCrearCuenta());

  registrarCuenta.addEventListener("submit", cuentaRegistrada);
  cerrarModalRegistrarCuenta.addEventListener("click", cuentaRegistrada);

  // nuevo gasto
  formularioNuevoGasto.addEventListener("submit", agregarGasto);

  document.body.addEventListener("click", closeAll);
}

/* clases */
class Presupuesto {
  constructor(datosUsuario) {
    this.presupuesto = datosUsuario[0]?.presupuesto;
    this.restante = datosUsuario[0]?.presupuesto;
    this.name = datosUsuario[0]?.name;
    this.color = datosUsuario[0]?.color;
    this.gastos = [];
    // console.log(this.restante)
  }
  nuevoGasto(gasto) {
    this.gastos = [...this.gastos, gasto];
    this.calcularRestante();
  }
  calcularRestante() {
    const gastado = this.gastos.reduce((total, gasto) => total + gasto.cantidad, 0);
    this.restante = this.presupuesto - gastado;
  }
  eliminarGasto(id) {
    this.gastos = this.gastos.filter((gasto) => gasto.id != id);
    this.calcularRestante()
  }
}
setInterval(() => {
  if (document.querySelectorAll(".date small").length > 0) {
    document.querySelectorAll(".date small").forEach((date) => {
      date.textContent = timeSince(date.getAttribute("data-time")) + " ago";
    });
  }
}, 10000);

class UI {
  insertarPresupuesto(cantidad) {
    // extrayendo valores
    const { presupuesto, restante, name, color } = cantidad;

    if (presupuesto && name) {
      const sectionAccount = document.querySelector(".account");
      cleanHTML(sectionAccount);
      document.querySelector(".account-config-container").style.opacity = 1;
      const div = document.createElement("div");
      div.className = "account-container";
      div.style = `background:${color}`;
      div.dataset.id = Date.now();
      div.innerHTML = `
        <div class="account-logo">
          <img src="./img/icon-coin.svg" alt="coin-icon" height="25">
        </div>
        <div class="account-status">
          <div class="account-name">${name}</div>
          <div class="account-value">${presupuesto}</div>
          <div></div>
        </div>
        `;
      const btn = document.createElement("button");
      btn.className = "button-edit";
      btn.innerHTML = "Editar";
      btn.onclick = () => {
        cuentaRegistrada();
      };

      div.appendChild(btn);
      sectionAccount.appendChild(div);
      document.querySelector(".balance-value").textContent = restante;
    }
  }
  imprimirMensaje(mensaje, tipo, elemento) {
    const divMensaje = document.createElement("div");
    divMensaje.className = `alert ${tipo}`;
    if (tipo === "error") {
      divMensaje.innerHTML = `
      <p>${mensaje}</p>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill:#FF3341;transform:;-ms-filter:"><path d="M12,2C6.486,2,2,6.486,2,12s4.486,10,10,10s10-4.486,10-10S17.514,2,12,2z M12,20c-4.411,0-8-3.589-8-8s3.589-8,8-8 s8,3.589,8,8S16.411,20,12,20z"></path><path d="M11 11H13V17H11zM11 7H13V9H11z"></path></svg>
      `;
      if (!document.querySelector(".alert.error")) elemento.appendChild(divMensaje);
      setTimeout(() => {
        divMensaje.remove();
      }, 3000);
    } else if (tipo === "warning") {
      divMensaje.innerHTML = `
      <p>${mensaje}</p>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill:#FF9D00;transform:;-ms-filter:"><path d="M12,2C6.486,2,2,6.486,2,12s4.486,10,10,10s10-4.486,10-10S17.514,2,12,2z M12,20c-4.411,0-8-3.589-8-8s3.589-8,8-8 s8,3.589,8,8S16.411,20,12,20z"></path><path d="M11 11H13V17H11zM11 7H13V9H11z"></path></svg>
      `;
      if (!document.querySelector(".alert.error")) elemento.appendChild(divMensaje);
      setTimeout(() => {
        divMensaje.remove();
      }, 3000);
    } else {
      divMensaje.innerHTML = `
      <p>${mensaje}</p>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill:#00B607;transform:;-ms-filter:"><path d="M12,2C6.486,2,2,6.486,2,12s4.486,10,10,10s10-4.486,10-10S17.514,2,12,2z M12,20c-4.411,0-8-3.589-8-8s3.589-8,8-8 s8,3.589,8,8S16.411,20,12,20z"></path><path d="M9.999 13.587L7.7 11.292 6.288 12.708 10.001 16.413 16.707 9.707 15.293 8.293z"></path></svg>
      `;
      if (!document.querySelector(".alert.success")) elemento.appendChild(divMensaje);
      setTimeout(() => {
        divMensaje.remove();
      }, 3000);
    }
  }
  agregarGastoListado(gastos) {
    const aDay = 24 * 60 * 60 * 1000;

    console.log(gastos);
    const listaGastos = document.getElementById("records");
    cleanHTML(listaGastos);
    gastos.forEach(({ beneficiario, categoria, cantidad, id, img }) => {
      const div = document.createElement("div");
      div.className = "row-list";
      div.innerHTML = `
    
     
      <div class="row-list-desc">
        
          <!-- aqui -->

          <div class="type-entries">
            <div class="type-description bold">${beneficiario}</div>
            <div class="type-account">
              <small>${categoria}</small>
            </div>
          </div>
        </div>
          <div class="entries-value">
            <div class="ammount">
              <span class="ammount-value red">-€${cantidad}</span>
            </div>
            <div class="date" data-id="fecha">
              <small data-time="${id}">NaN seconds ago</small>
            </div>
          </div>
        
      </div>
    
    `;
      const divImage = document.createElement("div");
      divImage.className = `logo-entries d-flex justify-content-center aling-items-center ${categoria.toLowerCase()}`;
      divImage.onclick = () => {
        eliminarGasto(id);
      };
      divImage.innerHTML = ` <img src="${img}" alt="${categoria}">`;

      document.getElementById("records").appendChild(div);

      div.querySelector(".row-list-desc").insertBefore(divImage, div.querySelector(".type-entries"));
    });
  }
  actualizarRestante(restante) {
    document.querySelector(".balance-value").textContent = restante;
  }
  insertMensajeTooTip(mensaje) {
    document.querySelector(".mensaje-tool-tip").style.display = "block";
    document.querySelector(".tool-tip p").textContent = mensaje;
  }
  comprobarPresupuesto(presupuestoObj) {
    const { restante, presupuesto } = presupuestoObj;
    if (presupuesto / 4 > restante) {
      this.insertMensajeTooTip("Has gastado mas 75% del presupuesto");
      this.imprimirMensaje("Has gastado mas 75% del presupuesto", "warning", formularioNuevoGasto);
    } else if (presupuesto / 2 > restante) {
      this.insertMensajeTooTip("Has gastado mas 50% del presupuesto");
      this.imprimirMensaje("Has gastado mas 50% del presupuesto", "error", formularioNuevoGasto);
    }
    if (restante <= 0) {
      document.querySelector(".more-record").disabled = true;
      setTimeout(() => {
        this.insertMensajeTooTip("Presupuesto agotado");
        document.querySelector(".new-record").classList.remove("show");
      }, 500);
    }else{
      document.querySelector(".more-record").disabled = false;
    }
  }
}
const ui = new UI();

/* funciones */
let presupuesto;
function cuentaRegistrada(e) {
  let datosUsuario = [];
  if (e) e.preventDefault();
  // comprobamos errores
  if (nombreDeCuenta.value.trim().length < 1 || cantidadPresupuesto.value.trim().length < 1) {
    bannerNuevaCuenta.classList.add("shake");
    if (nombreDeCuenta.value.trim().length < 1) {
      nombreDeCuenta.style.borderColor = "red";
    }
    if (cantidadPresupuesto.value.trim().length < 1) {
      cantidadPresupuesto.style.borderColor = "red";
    }
    ui.imprimirMensaje("Todos los campos son obligatorios", "error", registrarCuenta);
    setTimeout(() => {
      cantidadPresupuesto.style.borderColor = "rgba(0,0,0,0.1)";
      nombreDeCuenta.style.borderColor = "rgba(0,0,0,0.1)";
      bannerNuevaCuenta.classList.remove("shake");
    }, 2000);
  } else {
    //agregamos usuario al objeto
    const cuenta = {};
    cuenta.name = nombreDeCuenta.value.trim();
    cuenta.color = colorCuenta.style.background;
    cuenta.tipo = tipoCuenta.textContent.trim();
    cuenta.presupuesto = Number(cantidadPresupuesto.value.trim());
    cuenta.moneda = tipoMoneda.textContent.trim();

    if (isNaN(cuenta.presupuesto) || cuenta.presupuesto <= 0) {
      if (cuenta.presupuesto <= 0) {
        ui.imprimirMensaje("Ingresa una cantidad valida", "error", registrarCuenta);
      }
      cantidadPresupuesto.style.borderColor = "red";
      bannerNuevaCuenta.classList.add("shake");
      setTimeout(() => {
        cantidadPresupuesto.style.borderColor = "rgba(0,0,0,0.1)";
        bannerNuevaCuenta.classList.remove("shake");
      }, 2000);
    } else {
      datosUsuario = datosUsuario.filter(({ name }) => name != cuenta.name);
      datosUsuario = [...datosUsuario, cuenta];
      configCrearCuenta(); //oculatar banner
    }
  }
  presupuesto = new Presupuesto(datosUsuario);
  ui.insertarPresupuesto(presupuesto);
}

// agregar gasto
function agregarGasto(e) {
  e.preventDefault();

  // validar
  if (price.value.trim() === "" || beneficiario.value.trim() === "") {
    document.querySelector(".new-record-container").classList.add("shake");
    if (price.value.trim().length < 1) {
      price.style.borderColor = "red";
    }
    if (beneficiario.value.trim().length < 1) {
      beneficiario.style.borderColor = "red";
    }
    ui.imprimirMensaje("Todos los campos son obligatorios", "error", formularioNuevoGasto);
    setTimeout(() => {
      price.style.borderColor = "rgba(0,0,0,0.1)";
      beneficiario.style.borderColor = "rgba(0,0,0,0.1)";
      document.querySelector(".new-record-container").classList.remove("shake");
    }, 2000);
    return;
  } else if (price.value.trim() <= 0 || isNaN(price.value.trim()) || (beneficiario.value.trim().match(/\d+/) && !beneficiario.value.trim().match(/\D+/))) {
    if (price.value.trim().length <= 0) {
      ui.imprimirMensaje("Ingresa una cantidad", "error", formularioNuevoGasto);
      price.style.borderColor = "red";
      document.querySelector(".new-record-container").classList.add("shake");
    }
    if (Number(price.value.trim()) <= 0 || isNaN(price.value.trim())) {
      price.style.borderColor = "red";
      ui.imprimirMensaje("Ingresa una cantidad valida", "error", formularioNuevoGasto);
      document.querySelector(".new-record-container").classList.add("shake");
    }
    if (beneficiario.value.trim().length <= 0) {
      beneficiario.style.borderColor = "red";
      ui.imprimirMensaje("Por favor ingresa el nombre del beneficiario", "error", formularioNuevoGasto);
      document.querySelector(".new-record-container").classList.add("shake");
    }
    if (beneficiario.value.trim().match(/\d+/) && !beneficiario.value.trim().match(/\D+/)) {
      ui.imprimirMensaje("Ingresa un nombre valido", "error", formularioNuevoGasto);
      beneficiario.style.borderColor = "red";
      document.querySelector(".new-record-container").classList.add("shake");
    }
    setTimeout(() => {
      price.style.borderColor = "rgba(0,0,0,0.1)";
      beneficiario.style.borderColor = "rgba(0,0,0,0.1)";
      document.querySelector(".new-record-container").classList.remove("shake");
    }, 2000);
    return;
  }

  // generar un objeto de tipo gasto
  const gasto = {
    beneficiario: beneficiario.value.trim(),
    cantidad: Number(price.value.trim()),
    categoria: document.querySelector(".text-category").textContent.trim(),
    img: document.querySelector(".category-img img").getAttribute("src"),
    id: Date.now(),
  };

  // añade un nuevo gasto
  presupuesto.nuevoGasto(gasto);

  // mensaje de gasto agregado
  ui.imprimirMensaje("Gasto agregado correctamente", "success", formularioNuevoGasto);

  const { gastos, restante } = presupuesto;
  // imprimir los gastos
  ui.agregarGastoListado(gastos);

  // actualizar restante
  ui.actualizarRestante(restante);

  // comprobar presupuesto

  ui.comprobarPresupuesto(presupuesto);

  // reinicia el formulario
  formularioNuevoGasto.reset();
}

function validarCamposNuevaCuenta() {
  if (datosUsuario.length < 1) {
    const bannerNuevaCuenta = document.querySelector(".account-config-container");
    bannerNuevaCuenta.classList.add("shake");
    setTimeout(() => {
      bannerNuevaCuenta.classList.remove("shake");
    }, 1000);
  }
}

function closeAll(e) {
  if (e.target.className === "balance-container") {
    document.querySelector(".mensaje-tool-tip").style.display = "none";
  }
  if (e.target.parentNode.className === "more-record") {
    if (e.target.parentNode.disabled) {
      ui.insertMensajeTooTip("Presupuesto agotado");
    }
  }
}

function eliminarGasto(id) {
  presupuesto.eliminarGasto(id);
  const {gastos, restante} = presupuesto
  ui.agregarGastoListado(gastos)

   // actualizar restante
   ui.actualizarRestante(restante);

   // comprobar presupuesto
 
   ui.comprobarPresupuesto(presupuesto);
}
