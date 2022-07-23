//se obtienen solo los productos que van en este HTML

let productoBolsa = document.getElementById('productoBolsa')
fetch('../stock.json')
.then((resp) => resp.json())
.then((data) => {
    let productList = data;
    productoBolsa.innerHTML = ""
    let newBolsa = productList.slice(0, 3)
    newBolsa.forEach(({img, name, info, price, id}) => {
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
                    productoBolsa.appendChild(div);
        
        // evento btn añadir al carrito
        const botonAdd = document.getElementById(`boton${id}`);
        botonAdd.addEventListener('click', () =>{
            addShoppingCart(productList[id -1]);

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
            //actualiza el contador del carrito
            contador.innerHTML = shoppingCart.reduce((acc,el) => acc + el.cantidad, 0);
        })
    });
}).catch (error => console.error(error))