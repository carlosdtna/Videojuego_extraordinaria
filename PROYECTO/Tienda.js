class Tienda {
    constructor() {
        this.articulos = [
            new Arma("Espada de Acero", 8, 50),
            new Arma("Daga Envenenada", 6, 40),
            new Arma("Hacha de Batalla", 12, 80)
        ];
    }

    mostrarArticulos() {
        console.log("Bienvenido a la tienda. Estos son los artículos en venta:");
        this.articulos.forEach((item, index) => {
            console.log(`${index + 1}. ${item.nombre} - Ataque: ${item.poder} - Precio: ${item.precio} monedas`);
        });
    }

    comprar(personaje, nombreArma) {
    const arma = this.articulos.find(a => a.nombre === nombreArma);
    if (!arma) return alert("Arma no encontrada.");

    if (personaje.dinero >= arma.precio) {
        personaje.dinero -= arma.precio;

        if (!personaje.inventario || !personaje.inventario.items) {
            personaje.inventario = { items: [] };
        }

        personaje.inventario.items.push({
            nombre: arma.nombre,
            poder: arma.poder,
            precio: arma.precio,
            imagen: arma.imagen
        });

        alert(`Has comprado ${arma.nombre}.`);
        localStorage.setItem("personaje", JSON.stringify(personaje));
    } else {
        alert("No tienes suficiente dinero.");
    }
}
}
