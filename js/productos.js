//array de carrito
let shoppingCart = [];

const cards = document.getElementById("productos");
const contador = document.getElementById('contador')
const added = document.querySelector("#cartTable");
const totalPrice = document.querySelector('#totalPrice');
const cleanCart = document.querySelector('#vaciarCarrito');
const confirmBuy = document.querySelector('#confirmarCompra');
const contenedorCart = document.getElementById("carrito")

let productList = [];

//mostrar productos en el HTML
const showProd = async () => {
    cards.innerHTML = ""
    const productList = await fetchData()
    //destructure 
    productList.forEach(({img, name, info, price, id}) =>{
        let div = document.createElement('div');
        div.classList.add('producto');
        div.innerHTML += `<figure>
                            <img src="${img}">
                        </figure>
                        <div class="productoBody">
                            <h2 class="tituloProducto">${name}</h2>
                            <p class="parrafoProducto">${info}</p>
                            <p class="precio">${price}€</p>
                            <a class="botonProducto" id="boton${id}">Agregar al carrito</a>
                        </div>`
        cards.appendChild(div);

        // boton añadir al carrito
        const botonAdd = document.getElementById(`boton${id}`);
        botonAdd.addEventListener('click', () =>{
            addShoppingCart(id);

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
                title: name + ' ha sido añadido correctamente al carrito',
                background: 'lavender'
              })
        })
    })   
}
showProd()









//mostrar productos en el HTML
// function render() {
//     cards.innerHTML = ""
//     //destructure 
//     productList.forEach(({img, name, info, price, id}) =>{
//         let div = document.createElement('div');
//         div.classList.add('producto');
//         div.innerHTML += `<figure>
//                             <img src="${img}">
//                         </figure>
//                         <div class="productoBody">
//                             <h2 class="tituloProducto">${name}</h2>
//                             <p class="parrafoProducto">${info}</p>
//                             <p class="precio">${price}€</p>
//                             <a class="botonProducto" id="boton${id}">Agregar al carrito</a>
//                         </div>`
//         cards.appendChild(div);

//         // boton añadir al carrito
//         const botonAdd = document.getElementById(`boton${id}`);
//         botonAdd.addEventListener('click', () =>{
//             addShoppingCart(id);

//             //alert de agregado al carrito
//             const Toast = Swal.mixin({
//                 toast: true,
//                 position: 'top-right',
//                 iconColor: '#8f5bd8',
//                 customClass: {
//                   popup: 'colored-toast'
//                 },
//                 showConfirmButton: false,
//                 timer: 2200,
//                 timerProgressBar: true,
//                 didOpen: (toast) => {
//                     toast.addEventListener('mouseenter', Swal.stopTimer)
//                     toast.addEventListener('mouseleave', Swal.resumeTimer)
//                   }
//               })
//                Toast.fire({
//                 icon: 'success',
//                 title: name + ' ha sido añadido correctamente al carrito',
//                 background: 'lavender'
//               })
//         })
//     })   
// }
  


function addShoppingCart(id){
    //operador ternario
    shoppingCart = localStorage.getItem("shoppingCart") ? JSON.parse(localStorage.getItem("shoppingCart")) : [];

    let addProduct = productList.find(item=> item.id === id)
    let idDuplicate = shoppingCart.find(prod => prod.id === addProduct.id)
    if(!idDuplicate){
        //spread
        shoppingCart.push({...addProduct})
        localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart))

    }else{
        let cartFilter = shoppingCart.filter(prod => prod.id != idDuplicate.id)
        shoppingCart = [...cartFilter, {...idDuplicate, cantidad: idDuplicate.cantidad + 1}]
        
    }
    console.log(shoppingCart)

    show(addProduct)
    update()
 }



 function show(addProduct) {
    let tr = document.createElement('tr')
    tr.classList.add('productIn');
    tr.innerHTML = `<th>${addProduct.name}</th>
                    <th>${addProduct.price}</th>
                    <th id="cantidad">${addProduct.cantidad}</th>
                    <button id="eliminar${addProduct.id}" class="botonEliminar"><i class="fas fa-trash-alt"></i></button>`
    added.appendChild(tr)

    let btnDelete = document.getElementById(`eliminar${addProduct.id}`)
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
                shoppingCart = shoppingCart.filter(el => el.id !== addProduct.id)
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
// render()



//  function addShoppingCart(id){
    //     let addProduct = productList.find(item=> item.id === id)
    //     shoppingCart.push(addProduct)
    //     show(addProduct)
    //     update()
    //     localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart))
    //     console.log(addProduct)
    //  }




    
 