document.addEventListener("DOMContentLoaded", () => {
    const personajeGuardado = localStorage.getItem("personaje");
    if (!personajeGuardado) {
        alert("No hay personaje creado.");
        window.location.href = "crear-personaje.html";
        return;
    }

    const personaje = JSON.parse(personajeGuardado);

    personaje.vida = personaje.vida ?? 100;
    personaje.vidaMaxima = personaje.vidaMaxima ?? 100;
    personaje.ataque = personaje.ataque ?? 10;
    personaje.defensa = personaje.defensa ?? 5;
    personaje.dinero = personaje.dinero ?? 0;
    personaje.inventario = personaje.inventario ?? [];

    if (personaje.armaEquipada) {
        personaje.armaEquipada = {
            ...personaje.armaEquipada,
            poder: personaje.armaEquipada.poder ?? 0,
        };
    }

    const enemigos = [
        { nombre: "Orco Salvaje", vida: 30, ataque: 12, defensa: 0 },
        { nombre: "Goblin Armao", vida: 40, ataque: 17, defensa: 2 },
        { nombre: "Troll Feroz", vida: 50, ataque: 15, defensa: 5 },
    ];

    const enemigo = JSON.parse(JSON.stringify(enemigos[Math.floor(Math.random() * enemigos.length)]));

    const personajeMaxVida = personaje.vidaMaxima;
    const enemigoMaxVida = enemigo.vida;

    const personajeDiv = document.getElementById("personaje-info");
    const enemigoDiv = document.getElementById("enemigo-info");
    const logCombate = document.getElementById("log-combate");

    const barraVidaPersonaje = document.getElementById("vida-personaje");
    const barraVidaEnemigo = document.getElementById("vida-enemigo");

    const btnAtacar = document.getElementById("btn-atacar");

    actualizarPantalla();

    btnAtacar.addEventListener("click", () => {
        if (personaje.vida <= 0 || enemigo.vida <= 0) return;

        const arma = personaje.armaEquipada;
        const armaPoder = arma && !isNaN(arma.poder) ? arma.poder : 0;
        const ataqueBase = !isNaN(personaje.ataque) ? personaje.ataque : 0;
        const ataqueTotal = ataqueBase + armaPoder;

        const dañoJugador = Math.max(0, ataqueTotal - enemigo.defensa);
        enemigo.vida -= dañoJugador;
        log(`${personaje.nombre} ataca e inflige ${dañoJugador} de daño.`);

        if (enemigo.vida <= 0) {
            enemigo.vida = 0;
            log(`${enemigo.nombre} ha sido derrotado.`);
            otorgarBotin();
            btnAtacar.disabled = true;

            personaje.vida = personaje.vidaMaxima;
            localStorage.setItem("personaje", JSON.stringify(personaje));

            actualizarPantalla();
            return;
        }

        const dañoEnemigo = Math.max(0, enemigo.ataque - personaje.defensa);
        personaje.vida -= dañoEnemigo;
        log(`${enemigo.nombre} contraataca e inflige ${dañoEnemigo} de daño.`);

        if (personaje.vida <= 0) {
            personaje.vida = 0;
            log(`${personaje.nombre} ha sido derrotado...`);
            btnAtacar.disabled = true;
        }

        actualizarPantalla();
    });

    function actualizarPantalla() {
        personajeDiv.innerHTML = `
            <h2>${personaje.nombre}</h2>
            <p>Vida: ${personaje.vida}/${personajeMaxVida}</p>
        `;
        enemigoDiv.innerHTML = `
            <h2>${enemigo.nombre}</h2>
            <p>Vida: ${enemigo.vida}/${enemigoMaxVida}</p>
        `;

        barraVidaPersonaje.style.width = `${(personaje.vida / personajeMaxVida) * 100}%`;
        barraVidaPersonaje.style.backgroundColor = personaje.vida > personajeMaxVida * 0.4 ? "green" : "red";

        barraVidaEnemigo.style.width = `${(enemigo.vida / enemigoMaxVida) * 100}%`;
        barraVidaEnemigo.style.backgroundColor = enemigo.vida > enemigoMaxVida * 0.4 ? "green" : "red";
    }

    function log(texto) {
        const p = document.createElement("p");
        p.textContent = texto;
        logCombate.appendChild(p);
        logCombate.scrollTop = logCombate.scrollHeight;
    }

    function otorgarBotin() {
        const monedasGanadas = Math.floor(Math.random() * 50 + 20);
        personaje.dinero += monedasGanadas;
        log(`Has ganado ${monedasGanadas} monedas.`);

        personaje.vida = personaje.vidaMaxima;

        localStorage.setItem("personaje", JSON.stringify(personaje));
    }
});
