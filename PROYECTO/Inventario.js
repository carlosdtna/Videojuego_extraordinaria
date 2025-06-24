class Inventario {
    constructor(capacidad = 10) {
        this.items = [];
        this.capacidad = capacidad;
    }

    agregar(objeto) {
        if (this.items.length < this.capacidad) {
            this.items.push(objeto);
            console.log(`Has añadido ${objeto.nombre} a tu inventario.`);
        } else {
            console.log("El inventario está lleno.");
        }
    }

    mostrar() {
        console.log("Inventario:");
        this.items.forEach((obj, index) => console.log(`${index + 1}. ${obj.nombre}`));
    }
}
