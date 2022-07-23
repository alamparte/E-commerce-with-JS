//muestra el resumen de compra y datos de pago

let cart = JSON.parse(localStorage.getItem("shoppingCart"));

function endBuy() {
    let listProd = document.querySelector('.cardCompra');
    listProd.innerHTML = "";
    cart.forEach(p => {
        let li = document.createElement('li')
        li.classList.add('items')
        li.innerHTML=`
                    <img src="${p.img}">
                    <div class="inf">
                    <p>${p.name}</p>
                    <p class="can">Cantidad: ${p.cantidad}</p>
                    <p>${(p.price*p.cantidad).toFixed(2)} €</p>
                    </div>  `
        listProd.appendChild(li)
    }); 
}

const finalPrice = (cart) =>{
    let prodCompra = document.querySelector('.prodCompra');
    let totalP = cart.reduce((acc, el) => acc+ (el.price*el.cantidad),0).toFixed(2);
    prodCompra.innerHTML += `<p class="totalPagar">El total a pagar es <b>${totalP}</b>€`
}
endBuy()
finalPrice(cart);
//cuando se aprieta el boton pagar, se limpia el localStorage
const vaciarCarro = () =>{
    let btnPay = document.querySelector('.btnPay');
    btnPay.addEventListener('click', () =>{
        localStorage.clear();
        cartCont.innerHTML = "";
        shoppingCart.length = 0;
        update()
    })
}
vaciarCarro()
