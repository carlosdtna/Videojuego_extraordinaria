class Enemigo {
    constructor(nombre, nivel, vida, ataque, defensa) {
        this.nombre = nombre;
        this.nivel = nivel;
        this.vidaMax = vida;
        this.vida = vida;
        this.ataque = ataque;
        this.defensa = defensa;
    }

    recibirDaño(daño) {
        let dañoReducido = Math.max(daño - this.defensa, 1);
        this.vida -= dañoReducido;
        console.log(`${this.nombre} ha recibido ${dañoReducido} de daño. Vida restante: ${this.vida}`);
    }

    atacar(jugador) {
        if (jugador instanceof Personaje) {
            console.log(`${this.nombre} ataca a ${jugador.nombre} con ${this.ataque} de poder.`);
            jugador.recibirDaño(this.ataque);
        }
    }
}
