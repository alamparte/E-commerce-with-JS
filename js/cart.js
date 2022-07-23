//array de carrito
let shoppingCart = [];

shoppingCart = JSON.parse(localStorage.getItem("shoppingCart")) || [];

//actualiza el contador del carrito
contador.innerHTML = shoppingCart.reduce((acc,el) => acc + el.cantidad, 0);

//agrega al carrito o suma a cantidad
const addShoppingCart = (product) => {
    let prodRepetido = shoppingCart.find(prod => prod.id == product.id)

    if (!prodRepetido) {
        product.cantidad=1;
        shoppingCart.push(product);
        localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
    }else{
        prodRepetido.cantidad++
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
        localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
        update();
    }
}

//muestra prod en el carrito
function show(product){
    cartCont.innerHTML = '';
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

        //evento btn eliminar
        let btnDelete = document.getElementById(`eliminar${product.id}`)
        btnDelete.addEventListener('click', ()=>{

            btnDelete.parentElement.parentElement.parentElement.remove()
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
                if (result.isConfirmed){
                    btnDelete.parentElement.parentElement.parentElement.remove()
                    shoppingCart = shoppingCart.filter(el => el.id !== product.id)
                    localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
                    if (shoppingCart.length==0) {
                        //esta función muestra el msj de carrito vacio
                        emptyCart()
                        update()                            
                    }else{
                        update()
                    }
                }

            })
        })
    update()
}







