let cartProduct = localStorage.getItem("productos-en-carrito");
cartProduct = JSON.parse(cartProduct);

const carritoContainer = document.getElementById("cart-container");
const carritoVacio = document.getElementById("empty-cart");
const carritoVolver = document.getElementById("buy-again");
const despejarCarrito = document.getElementById("vaciar-carrito");
const contenedorTotal = document.querySelector("#botones-carrito");
const comprar = document.getElementById("comprar-producto");
const productoComprado = document.getElementById("producto-comprado");
let botonBorrar = document.getElementsByClassName("delete-button");


function mostarProductosCart() {
    if (cartProduct && cartProduct.length > 0) {

        carritoVacio.classList.add("disabled");
        carritoVolver.classList.add("disabled");
        despejarCarrito.classList.remove("disabled");
        contenedorTotal.classList.remove("disabled");
        comprar.classList.remove("disabled");
        productoComprado.classList.add("disabled");
        carritoContainer.innerHTML = "";
    
        cartProduct.forEach(producto => {
            const div = document.createElement("div");
            div.className = "cart-card";
    
            div.innerHTML += `<div class="cart-card">
                                <img src="${producto.img}" class="card-img-top" alt="...">
                                    <div class="cart-body">
                                    <h4 class="cart-name">${producto.nombre}</h4>
                                    <p class="cart-text">Precio: $${producto.precio}</p>
                                    <p class="cart-text">Cantidad: ${producto.cantidad}</p> 
                                    <p class="cart-text">Total: ${producto.cantidad * producto.precio}</p> 
                                    <button class="delete-button" id=${producto.id}><i class="fa-solid fa-trash-can" style="color: #ff3333;"></i></button>
                                    </div>
                                </div>`;
    
            carritoContainer.append(div);
        });
    } else {
        carritoVacio.classList.remove("disabled");
        carritoVolver.classList.remove("disabled");
        despejarCarrito.classList.add("disabled");
        contenedorTotal.classList.add("disabled");
        comprar.classList.add("disabled");
        productoComprado.classList.add("disabled");
        carritoContainer.innerHTML = "";
    }
    actualizarBotonEliminar();
    actualizarTotal();
}

mostarProductosCart();

function actualizarBotonEliminar() {
    botonBorrar = document.querySelectorAll(".delete-button");

    botonBorrar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e) {
    Toastify({
        text: "Producto eliminado",
        duration: 2000,
        close: true,
        gravity: "top", 
        position: "right", 
        stopOnFocus: true, 
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
            borderRadius: "2rem"
        },
        onClick: function(){} 
    }).showToast();

    const idBoton = e.currentTarget.id;
    const index = cartProduct.findIndex(producto => producto.id === idBoton);

    cartProduct.splice(index, 1);
    mostarProductosCart();

    localStorage.setItem("productos-en-carrito", JSON.stringify(cartProduct));
}

despejarCarrito.addEventListener("click", vaciarCarrito);

function vaciarCarrito() {
    Swal.fire({
        title: "¿Estás seguro?",
        icon: "question",
        html: `Se van a eliminar ${cartProduct.reduce((acc, producto) => acc + producto.cantidad, 0)} productos`,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: `Si`,
        cancelButtonText: `No`,
    }).then((result) => {
        if (result.isConfirmed) {
            cartProduct.length = 0;
            localStorage.setItem("productos-en-carrito", JSON.stringify(cartProduct));
            mostarProductosCart();
        }
    });
}

function actualizarTotal() {
    const totalCalculado = cartProduct.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `Precio total: $${totalCalculado}`;
}

comprar.addEventListener("click", comprarProducto);

function comprarProducto() {
    cartProduct.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(cartProduct));

    carritoVacio.classList.add("disabled");
    carritoVolver.classList.add("disabled");
    despejarCarrito.classList.add("disabled");
    contenedorTotal.classList.add("disabled");
    productoComprado.classList.remove("disabled");
    comprar.classList.add("disabled");
    carritoContainer.innerHTML = "";
}