class Combate {
    constructor(jugador, enemigo) {
        this.jugador = jugador;
        this.enemigo = enemigo;
    }

    turnoJugador() {
        this.jugador.atacar(this.enemigo);
        if (this.enemigo.vida <= 0) {
            console.log(`Has derrotado a ${this.enemigo.nombre}!`);
            this.jugador.exp += 50;
            console.log(`Has ganado 50 EXP. EXP actual: ${this.jugador.exp}`);
            if (this.jugador.exp >= this.jugador.expSiguienteNivel) {
                this.jugador.subirNivel();
            }
            return true;
        }
        return false;
    }

    turnoEnemigo() {
        this.enemigo.atacar(this.jugador);
        if (this.jugador.vida <= 0) {
            console.log("Has sido derrotado...");
            return true;
        }
        return false;
    }

    iniciarCombate() {
        console.log(`Combate iniciado: ${this.jugador.nombre} vs ${this.enemigo.nombre}`);
        let combateTerminado = false;

        while (!combateTerminado) {
            combateTerminado = this.turnoJugador();
            if (combateTerminado) break;

            combateTerminado = this.turnoEnemigo();
        }
    }
}
