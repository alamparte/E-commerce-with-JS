

// Creo CLASS para objetos
class Product {
    constructor(id, name, info, price, stock, img){
        this.id = id;
        this.name = name;
        this.info = info;
        this.price = parseFloat(price);
        this.stock = stock;
        this.img = img;
    }
}
//array de productos
const productList = [];
let shoppingCart = [];

//creo los objetos y los pusheo
    productList.push(new Product (1, "Detallista", "Tejido sintético extremadamente fuerte y duradero que conserva su forma.", 27.99, 25, "../img/productos/bolsa1.png"));
    productList.push(new Product (2, "Prosperidad", "Material ligero para su uso, costuras reforzadas en las manijas.", 23.59, 25, "../img/productos/bolsa2.png"));
    productList.push(new Product (3, "Optimismo", "Tejido sintético extremadamente fuerte y duradero que conserva su forma.", 35.37, 30, "../img/productos/bolsa3.png"));
    productList.push(new Product (4, "Musa", "Adhesivo resistente al agua, de fondo blanco y acabado mate.", 3.99, 15, "../img/productos/sticker1.jpg"));
    productList.push(new Product (5, "Profundidad", "Adhesivo resistente al agua, de fondo blanco y acabado mate.", 2.89, 12, "../img/productos/sticker2.jpg"));
    productList.push(new Product (6, "Bondad", "Adhesivo resistente al agua, de fondo blanco y acabado mate.", 4.37, 19, "../img/productos/sticker3.jpg"));
    productList.push(new Product (7, "Abundancia", "Cerámica blanca duradera con acabado brillante y resistente a los rayones.", 9.69, 20, "../img/productos/taza1.jpg"));
    productList.push(new Product (8, "Generosidad", "Cerámica blanca con interior negro y mango, lavar a mano únicamente.", 11.99, 15, "../img/productos/taza2.jpg"));
    productList.push(new Product (9, "Sabiduria", "Cerámica blanca duradera con acabado brillante y resistente a los rayones.", 8.29, 22, "../img/productos/taza3.jpg"));

const cards = document.getElementById("productos");
let added = document.getElementById("productTable");
let totalPrice = document.getElementById('totalPrice');
let cleanCart = document.getElementById('vaciarCarrito');
let confirmBuy = document.getElementById('ConfirmarCompra');


function upload() {
    productList.forEach(el =>{
        let div = document.createElement('div');
        div.classList.add('producto');
        div.innerHTML= `<figure>
                            <img src="${el.img}">
                        </figure>
                        <div class="productoBody">
                            <h2 class="tituloProducto">${el.name}</h2>
                            <p class="parrafoProducto">${el.info}</p>
                            <p class="precio">${el.price}€</p>
                            <a class="botonProducto" id="boton${el.id}">Agregar al carrito</a>
                        </div>`
        cards.appendChild(div);

        let botonAdd = document.getElementById(`boton${el.id}`);

        botonAdd.addEventListener('click', () =>{
            addShoppingCart(el.id);
        })
    })   
}


 function addShoppingCart(id){
    let addProduct = productList.find(item=> item.id === id)
    shoppingCart.push(addProduct)
    show(addProduct)
    count()
 }

 function show(addProduct) {
    let tr = document.createElement('tr')
    tr.classList.add('productIn');
    tr.innerHTML = `<th>${addProduct.name}</th>
                    <th>${addProduct.price}</th>`
    added.appendChild(tr)

    cleanCart.addEventListener('click',() =>{
        added.innerHTML = "";
        totalPrice.innerHTML = 0;
    })
    alert(`El producto ${addProduct.name} se agrega correctamente al carrito.`)
 }

 function count() {
    totalPrice.innerText = shoppingCart.reduce((acc,el)=> acc + el.price, 0);
 }


confirmBuy.addEventListener('click', confirmaCompra =>{
    if (shoppingCart != 0) {
        alert(`Su compra ha sido confirmada con éxito.`)        
    }else{
        alert(`No tienes ningún producto en tu carrito de compras`)
    } 
});


 upload()

 










// function searchProduct(productList) {
//     let search = confirm("¿Sabés el nombre del producto? Busca información seleccionando el botón 'ACEPTAR'");

//     while (search) {
//         let quest = prompt("Ingresa el nombre del producto").toLowerCase();
//         let outcome = productList.some((el) => el.name == quest);
//         if (outcome){
//             const found = productList.find((el) => el.name === quest);
//             alert(`Producto: ${found.name}\n Precio: ${found.price}\n Unidades disponibles: ${found.stock}`);
//         }else{
//             alert("Producto no encontrado");
//         }
//         search = confirm("¿Quieres buscar otro producto?");
//     }

//     let rta = confirm("¿Quieres continuar con la compra?"); 

//     if(rta){
//         shoppingCart();
//     }else {
//         alert("Gracias por visitar nuestra tienda. Hasta la próxima.")
//     } 
// }
// searchProduct(productList)


// function shoppingCart() {
//     let newProduct;
//     do {
//         let price = 0;
//         let foundId = false;
//         let productId = parseInt(prompt("Ingrese el número de id del producto que desea comprar:\n 1 - bolsa de tela detallista\n 2 - bolsa de tela prosperidad\n 3 - bolsa de tela optimismo\n 4 - sticker musa\n 5 - sticker profundidad\n 6 - sticker bondad\n 7 - taza abundancia\n 8 - taza generosidad\n 9 - taza sabiduria"));
//         let quantity = parseInt(prompt("¿Cuántos quieres comprar?"));
//         console.log(productId);
//         console.log(quantity);

//         for (let i = 0; i < productList.length; i++) {
//             if (productId == productList[i].id) {
//                 foundId = true;
//                 if (productList[i].stock > quantity) {
//                     productList[i].stock = productList[i].stock - quantity;
//                     price = productList[i].price * quantity;                    
//                 }
//             }
//         }
//         if (foundId == false){
//             alert("El id no coincide con ninguno de nuestros productos.")
//         }
//         total = total + price;
//         console.log(`El total de tu compra es ${total}`);
//         newProduct = confirm("Presione 'ACEPTAR' si quiere agregar otro producto, o 'CANCELAR' para finalizar la compra");
//     } while (newProduct); 
// }
// shoppingCart();

//eliminar
// let deleteProd = document.getElementById(`eliminar${addProduct.id}`)
//     deleteProd.addEventListener('click', () =>{
//         deleteProd.parentElement.remove();
//         shoppingCart = shoppingCart.filter(el => el.id !== addProduct.id)
//         count()
//     })



