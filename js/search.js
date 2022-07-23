//busca productos por el nombre
let search = document.getElementById('search');

search.addEventListener('keyup', buscar)

function buscar(){
    let busqueda = search.value.toUpperCase();
    let item = document.querySelectorAll('.producto')
    for (let i = 0;i<item.length;i++){
        let span = item[i].querySelector('.tituloProducto')
        if (span.innerHTML.toUpperCase().indexOf(busqueda) > -1) {
            item[i].style.display = "initial"  
        } else {
            item[i].style.display = "none"  
        }
    }
}