class Personaje {
    constructor(
    nombre,
    nivel = 1,
    dinero = 100,
    vidaMax = 100,
    vida = 100,
    ataqueBase = 10,
    defensa = 5,
    exp = 0,
    expSiguienteNivel = 100,
    inventario = new Inventario(),
    armaEquipada = null
) {
    this.nombre = nombre;
    this.nivel = nivel;
    this.dinero = dinero;
    this.vidaMax = vidaMax;
    this.vida = vida;
    this.ataqueBase = ataqueBase;
    this.defensa = defensa;
    this.exp = exp;
    this.expSiguienteNivel = expSiguienteNivel;
    this.inventario = inventario;
    this.armaEquipada = armaEquipada;
}


    subirNivel() {
        this.nivel++;
        this.exp = 0; 
        this.vidaMax += 20; 
        this.vida = this.vidaMax; 
        this.ataqueBase += 5; 
        console.log(`${this.nombre} ha subido al nivel ${this.nivel}! Aumentó su vida a ${this.vidaMax} y su ataque base a ${this.ataqueBase}.`);
    }
   
    obtenerAtaque() {
        return this.ataqueBase + (this.armaEquipada ? this.armaEquipada.poder : 0);
    }
  
    equiparArma(arma) {
        if (this.inventario.includes(arma)) {
            this.armaEquipada = arma;
            console.log(`${this.nombre} ha equipado el arma: ${arma.nombre}.`);
        } else {
            console.log(`${this.nombre} no tiene ${arma.nombre}.`);
        }
    }
   
    recibirDaño(daño) {
        let dañoReducido = Math.max(daño - this.defensa, 1); 
        this.vida -= dañoReducido;
        console.log(`${this.nombre} recibió ${dañoReducido} de daño. Vida restante: ${this.vida}`);

        if (this.vida <= 0) {
            console.log(`${this.nombre} ha sido derrotado...`);
        }
    }

    atacar(enemigo) {
        if (enemigo instanceof Enemigo) {
            let daño = this.obtenerAtaque();
            console.log(`${this.nombre} ataca a ${enemigo.nombre} con ${daño} de daño.`);
            enemigo.recibirDaño(daño);
        }
    }

    agregarAlInventario(objeto) {
    this.inventario.agregar(objeto);
    }


}