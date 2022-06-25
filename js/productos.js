
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
                    <th>${addProduct.price}</th>
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
    totalPrice.innerText = (shoppingCart.reduce((acc,el)=> acc + el.price, 0)).toFixed(2);
 }


function recuperarCarrito() {
    if (cartStorage = JSON.parse(localStorage.getItem("shoppingCart"))) {
        cartStorage.forEach(addProduct =>{
            shoppingCart.push(addProduct)
            let tr = document.createElement('tr')
            tr.classList.add('productIn');
            tr.innerHTML = `<th>${addProduct.name}</th>
                            <th>${(addProduct.price.toFixed(2))}</th>
                            <th>${addProduct.cantidad}</th>
                            <button id="eliminar${addProduct.id}" class="botonEliminar"><i class="fas fa-trash-alt"></i></button>`
            added.appendChild(tr)
            update()
        })
    }
}

recuperarCarrito()
render()


 







