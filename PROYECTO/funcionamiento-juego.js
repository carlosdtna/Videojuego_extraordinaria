const personajeGuardado = JSON.parse(localStorage.getItem("personaje"));
let personaje = null;

if (personajeGuardado) {
  personaje = Object.assign(new Personaje(), personajeGuardado);
  personaje.inventario = Object.assign(new Inventario(), personaje.inventario);
  personaje.inventario.objetos = personaje.inventario.objetos.map(o => Object.assign(new Arma(), o));
  mostrarPersonaje();
} else {
  alert("No hay personaje cargado. Serás redirigido.");
  window.location.href = "index.html";
}

function mostrarPersonaje() {
  const contenedor = document.getElementById("info-personaje");
  contenedor.innerHTML = `
    <p><strong>Nombre:</strong> ${personaje.nombre}</p>
    <p><strong>Vida:</strong> ${personaje.vida}</p>
    <p><strong>Ataque:</strong> ${personaje.ataque}</p>
    <p><strong>Defensa:</strong> ${personaje.defensa}</p>
    <p><strong>Dinero:</strong> ${personaje.dinero || 0} monedas</p>
  `;
}

function irACombate() {
  window.location.href = "combate.html";
}

function irATienda() {
  window.location.href = "tienda.html";
}

function irAInventario() {
  window.location.href = "inventario.html";
}

function volverAlMenu() {
  window.location.href = "index.html";
}
