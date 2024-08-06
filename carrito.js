const pintarCarrito = () => {

    modelContainer.innerHTML = '';
    modelContainer.style.display = 'flex';

    calcularTotal();


    carrito.forEach((product) => {
        let carritoContent = document.createElement('div');
        carritoContent.classList.add('card');
        carritoContent.style.width = '18rem';
        carritoContent.className = 'model-content';
        carritoContent.innerHTML = `
            <div class = 'card-body'> 
            <img class = "imgCardCarrito" src = "${product.img}">
            <h5 class = 'card-title'> ${product.nombre} </h5>
            <p class = 'card-text'>${product.precio}</p>
            <div class = "cardCarritoContMm">
            <span class = 'restar'> - </span>
            <p>Cantidad: ${product.cantidad}</p>
            <span class = 'sumar'> + </span>
            </div>
            <p>Total: ${product.cantidad * product.precio} $</p>
            <span class = 'delete-product'>🗑️</span> 
            </div> `;

        modelContainer.append(carritoContent);


        let restar = carritoContent.querySelector('.restar');

        restar.addEventListener("click", () => {
            if (product.cantidad > 1) {
                product.cantidad--;

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: `Deleted a ${product.nombre} from your 🛒 !`,
                    showConfirmButton: false,
                    timer: 1800
                })

                saveLocal();
                pintarCarrito();
                mySound.play();
            } else {
                eliminarProducto(product.id);
            }
        });

        let sumar = carritoContent.querySelector('.sumar');

        sumar.addEventListener("click", () => {

            product.cantidad++;

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: `Added ${product.nombre} to your 🛒!`,
                showConfirmButton: false,
                timer: 1800
            })

            myAudio.play();
            saveLocal();
            pintarCarrito();
        });

        let eliminar = carritoContent.querySelector('.delete-product');
        eliminar.addEventListener('click', () => {
            eliminarProducto(product.id);
        })
        eliminar.addEventListener('click', eliminarProducto);
    });

};

function calcularTotal() {
    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);



    const modelHeader = document.createElement('div');
    modelHeader.className = 'model-header';
    modelHeader.innerHTML = `
    <h1 class = "total-a-pagar"> Total: $${total}</h1>
    <h2 class = "model-end-button">Check Out</h2>
    <h3 class = "model-header-button">X</h3>
    
    `;

    modelContainer.append(modelHeader);

    const modelButton = document.querySelector(".model-header-button");
    const modelEndButton = document.querySelector(".model-end-button");

    modelButton.addEventListener('click', () => {
        modelContainer.style.display = 'none';

    });


    const totalBuying = document.createElement('div');
    totalBuying.className = 'total-content';
    totalBuying.className = 'total-a-pagar';
    modelContainer.append(totalBuying);

    modelEndButton.addEventListener('click', () => {

        Swal.fire({
            title: 'Succesful Purchase',
            text: 'You will receive your order in 24 hours!',
            position: 'center',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000
        })
carrito = []
saveLocal();
pintarCarrito();

    });


}

verCarrito.addEventListener('click', pintarCarrito)





const eliminarProducto = (id) => {
    const foundId = carrito.find((element) => element.id === id);

    carrito = carrito.filter((carritoId) => {
        return carritoId !== foundId;
    });

    carritoCounter();
    saveLocal();
    pintarCarrito();
};

const carritoCounter = () => {
    cantidadCarrito.style.display = 'block';

    const carritoLenght = carrito.length;
    localStorage.setItem('carrito.lenght', JSON.stringify(carritoLenght));

    cantidadCarrito.innerText = JSON.parse(localStorage.getItem('carritoLenght'));
};



carritoCounter();