//guarda el storage
const getStorage = () => {
    if (localStorage.getItem("shoppingCart")) {
        storageCart = JSON.parse(localStorage.getItem("shoppingCart"))

        storageCart.map((product) =>{
            let div = document.createElement('div')
            div.classList.add('cardContenedor')
            div.innerHTML = ` 
            <div class="separador"></div>
            <div class="contCard">
                        <figure>
                            <img src="${product.img}">
                        </figure>
                        <div class="info">
                            <p class="titleI">${product.name}</p>
                            <p class="stockI">En stock</p>
                            <p class="qtI" id="cantidad${product.id}">Cantidad: ${product.cantidad}</p> 
                            <button class="borrar" id="eliminar${product.id}"><i class="fas fa-trash-alt"></i></button>
                        </div>
                        <div class="precio">
                            <b>${(product.price*product.cantidad).toFixed(2)}</b>
                            €
                        </div>
            </div>`
            cartCont.appendChild(div)

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
                    if (result.isConfirmed ){
                        btnDelete.parentElement.parentElement.parentElement.remove()
                        shoppingCart = shoppingCart.filter(el => el.id !== product.id)
                        localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
                        if (shoppingCart.length==0) {
                            emptyCart()
                            update()                            
                        }else{
                            update()
                        }
                    }
                })
            })
        update()
        })
    }
}

getStorage()
