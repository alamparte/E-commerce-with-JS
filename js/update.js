//total del carrito y muestra el contador de prod en el carrito
const update = () => {
    contador.innerHTML = shoppingCart.reduce((acc,el) => acc + el.cantidad, 0);
    contadorDos.innerHTML = shoppingCart.reduce((acc,el) => acc + el.cantidad, 0);
    totalPrice.innerText = (shoppingCart.reduce((acc,el)=> acc + (el.price * el.cantidad), 0)).toFixed(2);
    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart))
 }