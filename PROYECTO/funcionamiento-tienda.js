document.addEventListener("DOMContentLoaded", () => {
    class Arma {
        constructor(nombre, poder, precio, imagen) {
            this.nombre = nombre;
            this.poder = poder;
            this.precio = precio;
            this.imagen = imagen;
        }
    }

    class Tienda {
        constructor() {
            this.articulos = [
                new Arma("Espada de Acero", 8, 50, "imagenes/espada.png"),
                new Arma("Daga Envenenada", 6, 40, "imagenes/daga.png"),
                new Arma("Hacha de Batalla", 12, 80, "imagenes/hacha.png")
            ];
        }
        

        mostrarArticulos(personaje) {
            const contenedor = document.getElementById("contenedor-tienda");
            contenedor.innerHTML = "";

            this.articulos.forEach((item) => {
                const itemHTML = document.createElement("div");
                itemHTML.className = "articulo"; 

                itemHTML.innerHTML = `
                    <img src="${item.imagen}" alt="${item.nombre}" class="imagen-arma">
                    <h3>${item.nombre}</h3>
                    <p>Ataque: ${item.poder}</p>
                    <p>Precio: ${item.precio} monedas</p>
                    <button class="btn-comprar" data-nombre="${item.nombre}">Comprar</button>
                `;

                contenedor.appendChild(itemHTML);
            });

            document.querySelectorAll(".btn-comprar").forEach(btn => {
                btn.addEventListener("click", (e) => {
                    const nombreArma = e.target.dataset.nombre;
                    this.comprar(personaje, nombreArma);
                    this.mostrarArticulos(personaje); 
                    actualizarDinero(personaje.dinero);
                });
            });
        }

        comprar(personaje, nombreArma) {
            const arma = this.articulos.find(a => a.nombre === nombreArma);
            if (!arma) return alert("Arma no encontrada.");

            if (personaje.dinero >= arma.precio) {
                personaje.dinero -= arma.precio;
                personaje.inventario = personaje.inventario || [];
                personaje.inventario.push(arma);
                alert(`Has comprado ${arma.nombre}.`);
                localStorage.setItem("personaje", JSON.stringify(personaje));
            } else {
                alert("No tienes suficiente dinero.");
            }
        }
    }

    function actualizarDinero(dinero) {
        const dineroSpan = document.getElementById("dinero-personaje");
        if (dineroSpan) dineroSpan.textContent = `Monedas: ${dinero}`;
    }

    const personajeGuardado = localStorage.getItem("personaje");
    if (!personajeGuardado) {
        alert("No hay personaje creado.");
        window.location.href = "crear-personaje.html";
        return;
    }

    const personaje = JSON.parse(personajeGuardado);
    actualizarDinero(personaje.dinero);

    const tienda = new Tienda();
    tienda.mostrarArticulos(personaje);

    document.getElementById("btn-volver").addEventListener("click", () => {
        window.location.href = "juego.html";
    });
});
