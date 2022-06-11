alert("Bienvenido/a a Kreislife");

let total = 0;

// Creo CLASS para objetos
class Product {
    constructor(id, name, price, stock){
        this.id = id;
        this.name = name;
        this.price = parseFloat(price);
        this.stock = stock;
    }
}
//array de productos
const productList = [];

//creo los objetos y los pusheo
    productList.push(new Product (1, "bolsa de tela detallista", 27.99, 25));
    productList.push(new Product (2, "bolsa de tela prosperidad", 23.59, 25));
    productList.push(new Product (3, "bolsa de tela optimismo", 35.37, 30));
    productList.push(new Product (4, "sticker musa", 3.99, 15));
    productList.push(new Product (5, "sticker profundidad", 2.89, 12));
    productList.push(new Product (6, "sticker bondad", 4.37, 19));
    productList.push(new Product (7, "taza abundancia", 9.69, 20));
    productList.push(new Product (8, "taza generosidad", 11.99, 15));
    productList.push(new Product (9, "taza sabiduria", 8.29, 22));


function searchProduct(productList) {
    let search = confirm("¿Sabés el nombre del producto? Busca información seleccionando el botón 'ACEPTAR'");

    while (search) {
        let quest = prompt("Ingresa el nombre del producto").toLowerCase();
        let outcome = productList.some((el) => el.name == quest);
        if (outcome){
            const found = productList.find((el) => el.name === quest);
            alert(`Producto: ${found.name}\n Precio: ${found.price}\n Unidades disponibles: ${found.stock}`);
        }else{
            alert("Producto no encontrado");
        }
        search = confirm("¿Quieres buscar otro producto?");
    }

    let rta = confirm("¿Quieres continuar con la compra?"); 

    if(rta){
        shoppingCart();
    }else {
        alert("Gracias por visitar nuestra tienda. Hasta la próxima.")
    } 
}
searchProduct(productList)


function shoppingCart() {
    console.log(productList[0].id);
    let newProduct;
    do {
        let price = 0;
        let foundId = false;
        let productId = parseInt(prompt("Ingrese el número de id del producto que desea comprar:\n 1 - bolsa de tela detallista\n 2 - bolsa de tela prosperidad\n 3 - bolsa de tela optimismo\n 4 - sticker musa\n 5 - sticker profundidad\n 6 - sticker bondad\n 7 - taza abundancia\n 8 - taza generosidad\n 9 - taza sabiduria"));
        let quantity = parseInt(prompt("¿Cuántos quieres comprar?"));
        console.log(productId);
        console.log(quantity);

        for (let i = 0; i < productList.length; i++) {
            if (productId == productList[i].id) {
                foundId = true;
                if (productList[i].stock > quantity) {
                    productList[i].stock = productList[i].stock - quantity;
                    price = productList[i].price * quantity;                    
                }
            }
        }
        if (foundId == false){
            alert("El id no coincide con ninguno de nuestros productos.")
        }
        total = total + price;
        console.log(`El total de tu compra es ${total}`);
        newProduct = confirm("Presione 'ACEPTAR' si quiere agregar otro producto, o 'CANCELAR' para finalizar la compra");
    } while (newProduct); 
}
shoppingCart();



