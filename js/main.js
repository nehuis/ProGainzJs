const contenedor = document.getElementById("product-container")

const widget = document.querySelector("#widget")

let botonAgregar = document.querySelectorAll(".btn-outline-success")


function mostrarProductos(listaProductos) {

    contenedor.innerHTML = "";

    listaProductos.forEach(producto => {
        const div = document.createElement("div");
        div.className = "card";

        div.innerHTML += `<div class="card">
                            <img src="${producto.img}" class="card-img-top" alt="...">
                                <div class="card-body">
                                <h4 class="card-name">${producto.nombre}</h4>
                                <p class="card-text">Precio: $${producto.precio}</p>
                                <button type="button" class="btn-outline-success" id=${producto.id}>Agregar al carrito</button>
                                </div>
                            </div>`;

    contenedor.appendChild(div);
    })

    actualizarBotonAgregar();
}
mostrarProductos(listaProductos);

function actualizarBotonAgregar() {
    botonAgregar = document.querySelectorAll(".btn-outline-success");

    botonAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let cart;

let cartProductLs = localStorage.getItem("productos-en-carrito")

if (cartProductLs) {
    cart = JSON.parse(cartProductLs);
    actualizarWidget();
} else {
    cart = [];
}

function agregarAlCarrito(e) {
    const productoId = e.target.id;

    const producto = listaProductos.find(producto => producto.id == productoId)

    if(cart.some(producto => producto.id == productoId)) {
        const sumarProd = cart.findIndex(producto => producto.id == productoId);

        cart[sumarProd].cantidad++;

    } else {
        producto.cantidad = 1;

        cart.push(producto);
    }

    localStorage.setItem("productos-en-carrito", JSON.stringify(cart));

    actualizarWidget();
}

function actualizarWidget() {
    let newWidget = cart.reduce((acc, producto) => acc + producto.cantidad, 0);

    widget.innerText = newWidget;
}