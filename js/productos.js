
//array de carrito
let shoppingCart = [];

const cards = document.getElementById("productos");
const contador = document.getElementById('contador')
const added = document.querySelector("#cartTable");
const totalPrice = document.querySelector('#totalPrice');
const cleanCart = document.querySelector('#vaciarCarrito');
const confirmBuy = document.querySelector('#confirmarCompra');


function render() {
    cards.innerHTML = ""
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
    update()
    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart))

 }

 function show(addProduct) {
    let tr = document.createElement('tr')
    tr.classList.add('productIn');
    tr.innerHTML = `<th>${addProduct.name}</th>
                    <th>${(addProduct.price.toFixed(2))}</th>
                    <th>${addProduct.cantidad}</th>
                    <button id="eliminar${addProduct.id}" class="botonEliminar"><i class="fas fa-trash-alt"></i></button>`
    added.appendChild(tr)

    let btnDelete = document.getElementById(`eliminar${addProduct.id}`)
    btnDelete.addEventListener('click', ()=>{
        btnDelete.parentElement.remove()
        shoppingCart = shoppingCart.filter(el => el.id !== addProduct.id)
        console.log(shoppingCart)
        update()
        localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart))
    })


    cleanCart.addEventListener('click',() =>{
        localStorage.clear();
        added.innerHTML = "";
        shoppingCart.length = 0;
        update()     
    });
 }

 function update() {
    contador.innerHTML = shoppingCart.reduce((acc,el) => acc + el.cantidad, 0);
    totalPrice.innerText = shoppingCart.reduce((acc,el)=> acc + el.price, 0);
 }


confirmBuy.addEventListener('click', confirmaCompra =>{
    if (shoppingCart != 0) {
        alert(`Su compra ha sido confirmada con éxito.`)        
    }else{
        alert(`No tienes ningún producto en tu carrito de compras`)
    } 
});


function recuperarCarrito() {
    if (cartStorage = JSON.parse(localStorage.getItem("shoppingCart"))) {
        cartStorage.forEach(addProduct =>{
            shoppingCart.push(addProduct)
            let tr = document.createElement('tr')
            tr.classList.add('productIn');
            tr.innerHTML = `<th>${addProduct.name}</th>
                            <th>${addProduct.price}</th>
                            <th>${addProduct.cantidad}</th>
                            <button id="eliminar${addProduct.id}" class="botonEliminar"><i class="fas fa-trash-alt"></i></button>`
            added.appendChild(tr)
            update()
        })
    }
}

recuperarCarrito()
render()


 










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
//         update()
//     })



