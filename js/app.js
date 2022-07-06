let shoppingCart = [];

const cards = document.getElementById("productos");
const contador = document.getElementById('contador')
const added = document.querySelector("#cartTable");
const totalPrice = document.querySelector('#totalPrice');
const cleanCart = document.querySelector('#vaciarCarrito');
const confirmBuy = document.querySelector('#confirmarCompra');
const contenedorCart = document.getElementById("carrito")


const fetchData = async () =>{
    try {
        const response = await fetch('../stock.json')
        const data = await response.json()
        return data 
    } catch (error) {
        console.log(error)        
    }
}

//se muestran productos en el HTML
const showProd = async () => {
    cards.innerHTML = ""
    const productList = await fetchData()
    productList.forEach(product =>{
        let div = document.createElement('div');
        div.classList.add('producto');
        div.innerHTML += `<figure>
                            <img src="${product.img}">
                        </figure>
                        <div class="productoBody">
                            <h2 class="tituloProducto">${product.name}</h2>
                            <p class="parrafoProducto">${product.info}</p>
                            <p class="precio">${product.price}€</p>
                            <a class="botonProducto" id="boton${product.id}">Agregar al carrito</a>
                        </div>`
        cards.appendChild(div);

        // boton añadir al carrito
        const botonAdd = document.getElementById(`boton${product.id}`);
        botonAdd.addEventListener('click', () =>{
            addShoppingCart(productList[product.id -1]);

            //alert de agregado al carrito
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-right',
                iconColor: '#8f5bd8',
                customClass: {
                  popup: 'colored-toast'
                },
                showConfirmButton: false,
                timer: 2200,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                  }
              })
               Toast.fire({
                icon: 'success',
                title: product.name + ' ha sido añadido correctamente al carrito',
                background: 'lavender'
              })
        })
    })   
}
showProd()


const addShoppingCart = (product) =>{
    shoppingCart = JSON.parse(localStorage.getItem("shoppingCart")) || [];

    console.log(shoppingCart)
    let prodRepetido = shoppingCart.find(prod => prod.id == product.id)

    if (!prodRepetido) {
        shoppingCart.push(product);

        localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
        show(product);
    }else{
        prodRepetido.cantidad++
        let cantidadError = document.getElementById(`cantidad${prodRepetido.id}`)
        cantidadError.innerHTML = `<th id="cantidad${prodRepetido.id}">${prodRepetido.cantidad}</th>`
        update();
    }
}

function show(product) {
    product.cantidad = 1;

    let tr = document.createElement('tr')
    tr.classList.add('productIn');
    tr.innerHTML = `<th>${product.name}</th>
                    <th>${product.price}</th>
                    <th id="cantidad${product.id}">${product.cantidad}</th>
                    <button id="eliminar${product.id}" class="botonEliminar"><i class="fas fa-trash-alt"></i></button>`
    added.appendChild(tr)

    let btnDelete = document.getElementById(`eliminar${product.id}`)
    btnDelete.addEventListener('click', ()=>{
        //alert para confirmar la eliminación del producto
        Swal.fire({
            title: '¿Quieres eliminar el producto?',
            icon: 'warning',
            iconColor: '#8f5bd8',
            showCancelButton: true,
            confirmButtonColor: '#c7aef5',
            cancelButtonColor: '#8f5bd8',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) =>{
            if (result.isConfirmed) {
                btnDelete.parentElement.remove()
                shoppingCart = shoppingCart.filter(el => el.id !== product.id)
                console.log(shoppingCart)
                update()
                localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart))
            }
        })
    })


    cleanCart.addEventListener('click',() =>{
        //alert para confirmar el vaciar el carrito
       if (shoppingCart.length > 0){ 
        Swal.fire({
            title: '¿Seguro quieres vaciar tu carrito?',
            icon: 'warning',
            iconColor: '#8f5bd8',
            showCancelButton: true,
            confirmButtonColor: '#c7aef5',
            cancelButtonColor: '#8f5bd8',
            confirmButtonText: 'Vaciar',
            cancelButtonText: 'Cancelar'
        }).then((result) =>{
            if (result.isConfirmed) {
                localStorage.clear();
                added.innerHTML = "";
                shoppingCart.length = 0;
                update() 
                recuperarCarrito() 
            }
        })  
    }else{
        Swal.fire({
            title: 'Atención',
            text: 'El carrito se encuentra vacio',
            icon: 'warning',
            iconColor: '#8f5bd8',
            showConfirmButton: false,
            timer: '2000'
        })
    }
    });
    update()
 }


 function update() {
    contador.innerHTML = shoppingCart.reduce((acc,el) => acc + el.cantidad, 0);
    totalPrice.innerText = (shoppingCart.reduce((acc,el)=> acc + (el.price * el.cantidad), 0)).toFixed(2);
    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart))
 }

 function recuperarCarrito() {
    
    if (localStorage.getItem("shoppingCart")) {
        cartStorage = JSON.parse(localStorage.getItem("shoppingCart"))

        cartStorage.map((product) =>{
            shoppingCart.push(product)
            let tr = document.createElement('tr')
            tr.classList.add('productIn');
            tr.innerHTML = `<th>${product.name}</th>
                            <th>${product.price}</th>
                            <th id="cantidad${product.id}">${product.cantidad}</th>
                            <button id="eliminar${product.id}" class="botonEliminar"><i class="fas fa-trash-alt"></i></button>`
            added.appendChild(tr)
            update()
            
        })
    }
}

recuperarCarrito()






