//si el carrito está vacio se muestra el msj automático

if(shoppingCart.length == 0){
    emptyCart()
}

function emptyCart()  {
    contenedorCarro.remove()
    let section = document.createElement('section')
    section.classList.add('vacio')
    section.innerHTML += `<figure>
                            <img class="logo" src="../img/error.svg" alt="la imagen es un mandala hecho digitalmente, sigue la forma de circulo y tiene detalles en espiral">
                        </figure>
                        <div>
                            <p>Tu carrito de compras se encuentra vacio.</p>
                            <button><a href="../pages/tienda.html">VER PRODUCTOS</a></button>
                        </div>`
    cartContainer.appendChild(section);
}

