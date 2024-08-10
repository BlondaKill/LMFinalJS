
const shopContent = document.getElementById(id = "shopContent");
const verCarrito = document.getElementById("verCarrito");
const modelContainer = document.getElementById("model-container");
const showAlert = document.getElementById("showAlert");
const cantidadCarrito = document.getElementById("cantidadCarrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let addAudio = document.getElementById("myAudio");
let addSound = document.getElementById("mySound");


//Obtener JSON

const url = "./productos.json";

fetch(url)
    .then((res) => res.json())
    .then((productos) => mostrarProductos(productos));


//Render productos

function mostrarProductos(productos) {
    console.log("EN LA FUNCION");
    console.log(productos);


    productos.forEach((product) => {
        let content = document.createElement('div');
        content.className = "col-lg-3 mb-3"
        content.innerHTML = `<div class = "card">
            <img src= "${product.img}">
            <h3>${product.nombre}</h3>
            <p class="precio">${product.precio} $</p>
            </div>
`;
        
        shopContent.append(content);

        let comprar = document.createElement("button");
        comprar.setAttribute("id", `${product.id}`)
        comprar.innerText = 'Add to Cart';
        comprar.className = 'comprar';
        content.append(comprar);

        comprar.addEventListener('click', (e) => agregarAlCarrito(e, productos));


        let checkOut = document.createElement("div");


    });
}

const saveLocal = () => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
};

function agregarAlCarrito(e, productos) {

    const id = parseInt(e.target.id);

    const prodEncontrado = productos.find((p) => p.id === parseInt(e.target.id));
    console.log(prodEncontrado);

    const repeat = carrito.some((p) => p.id === id);

    const prodAlCarrito = {
        id: prodEncontrado.id,
        img: prodEncontrado.img,
        nombre: prodEncontrado.nombre,
        precio: prodEncontrado.precio,
        cantidad: prodEncontrado.cantidad,
    }

    if (repeat) {
        const indice = carrito.findIndex((p) => p.id === id);
        carrito[indice].cantidad++;

        console.log(carrito);
    } else {
        carrito.push(prodAlCarrito);
        console.log(carrito);
        carritoCounter();

    }


    
    Swal.fire({
        title: `Added ${prodEncontrado.nombre} to your 🛒`,
        imageUrl: `${prodEncontrado.img}`,
        imageWidth: 300,
        imageHeight: 200,
        imageAlt: 'prodEncontrado.nombre',
    });
    myAudio.play();
    saveLocal();
}

