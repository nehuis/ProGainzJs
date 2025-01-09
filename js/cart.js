const cartProduct = JSON.parse(localStorage.getItem("productos-en-carrito"));

const carritoContainer = document.getElementById("cart-container");

const carritoVacio = document.getElementById("empty-cart");

const carritoVolver = document.getElementById("buy-again");

if (cartProduct) {
    carritoVacio.classList.add("disabled");

    carritoVolver.classList.add("disabled");

    cartProduct.innerHTML = "";

    cartProduct.forEach(producto => {
        const div = document.createElement("div");
        div.className = "cart-card";

        div.innerHTML += `<div class="card">
                            <img src="${producto.img}" class="card-img-top" alt="...">
                                <div class="card-body">
                                <h4 class="card-name">${producto.nombre}</h4>
                                <p class="card-text">Precio: $${producto.precio}</p>
                                <p class="card-text">Cantidad: ${producto.cantidad}</p> 
                                </div>
                            </div>`;

        carritoContainer.append(div);
    });
} else {
    carritoVacio.classList.remove("disabled");
    carritoVolver.classList.remove("disabled");
}