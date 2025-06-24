
let jugador = null;

window.addEventListener('load', () => {
    const datos = localStorage.getItem("personaje");
    if (datos) {
        const obj = JSON.parse(datos);
        jugador = new Personaje();
        Object.assign(jugador, obj);


        if (jugador.armaEquipada) {
            jugador.armaEquipada = new Arma(
                jugador.armaEquipada.nombre,
                jugador.armaEquipada.poder,
                jugador.armaEquipada.precio
            );
        }


        const nuevoInventario = new Inventario();
        if (obj.inventario && obj.inventario.items) {
            obj.inventario.items.forEach(item => {
                nuevoInventario.agregar(new Arma(item.nombre, item.poder, item.precio));
            });
        }
        jugador.inventario = nuevoInventario;
    } else {
        alert("No hay personaje creado. Redirigiendo a crear-personaje...");
        window.location.href = "crear-personaje.html";
    }
});


function guardarPartida(personaje) {
    const datos = JSON.stringify(personaje, (key, value) => {
        if (typeof value === 'function') return undefined;
        return value;
    });
    localStorage.setItem('personaje', datos);
    console.log('Partida guardada.');
}

function eliminarPartida() {
    localStorage.removeItem('personaje');
    console.log('Partida eliminada.');
}


function generarEnemigoAleatorio() {
    const nombres = ["Goblin", "Orco", "Esqueleto", "Bandido"];
    const nombre = nombres[Math.floor(Math.random() * nombres.length)];
    const nivel = Math.floor(Math.random() * 3) + 1;
    const vida = 50 + nivel * 20;
    const ataque = 5 + nivel * 3;
    const defensa = 2 + nivel;

    return new Enemigo(nombre, nivel, vida, ataque, defensa);
}


document.querySelectorAll('.menu-opciones li').forEach((opcion, index) => {
    opcion.addEventListener('click', () => {
        switch (index) {
            case 0: 
                if (!jugador) alert('No hay partida cargada.');
                else console.log('Partida cargada: ', jugador.nombre);
                break;

            case 1: 
                window.location.href = "crear-personaje.html";
                break;

            case 2: 
                eliminarPartida();
                jugador = null;
                break;

            case 3: 
                window.open('https://github.com/tu-usuario/tu-repo', '_blank');
                break;
        }
    });
});

document.getElementById("btn-pelear").addEventListener("click", () => {
    if (!jugador) {
        alert("Primero crea o carga un personaje.");
        return;
    }

    const enemigo = generarEnemigoAleatorio();
    const combate = new Combate(jugador, enemigo);
    combate.iniciarCombate();
    guardarPartida(jugador);
});
