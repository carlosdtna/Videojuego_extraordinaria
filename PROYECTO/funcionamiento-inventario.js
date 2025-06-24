document.addEventListener("DOMContentLoaded", () => {
  const personajeGuardado = localStorage.getItem("personaje");
  if (!personajeGuardado) {
    alert("No hay personaje creado.");
    window.location.href = "crear-personaje.html";
    return;
  }

  const personaje = JSON.parse(personajeGuardado);
  const inventario = personaje.inventario || [];

  const contenedor = document.getElementById("contenedor-inventario");
  contenedor.innerHTML = "";

  if (inventario.length === 0) {
    contenedor.innerHTML = "<p>No tienes armas en el inventario.</p>";
  } else {
    inventario.forEach((item) => {
      const itemHTML = document.createElement("div");
      itemHTML.className = "item-tienda";

      itemHTML.innerHTML = `
        <img src="${item.imagen}" alt="${item.nombre}" class="imagen-arma" />
        <h3>${item.nombre}</h3>
        <p>Ataque: ${item.poder}</p>
      `;

      contenedor.appendChild(itemHTML);
    });
  }

  document.getElementById("btn-volver").addEventListener("click", () => {
    window.location.href = "juego.html";
  });
});
