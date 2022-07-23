//muestra el msj del pago exitoso y genera un número de compra
const cargando =() =>{
    let div = document.querySelector('.pago');
    div.innerHTML = `<div class="checked"><i class="fa fa-check-square-o"></i></div>
                    <div class="exitoPago">
                        <p>Número de orden: <b>${randomOrder(0,10000000000)}</b></p>
                        <p>El pago se ha realizado con éxito.</p>
                        <p>En instantes recibirás toda la información al correo electrónico que ingresaste.</p>
                        <button class="volver">
                        <a href="../index.html">PÁGINA PRINCIPAL</a>
                        </button>
                    </div>`
}
const randomOrder = (min, max) =>{
    return Math.floor(Math.random() * (max - min)) + min;
}
cargando()