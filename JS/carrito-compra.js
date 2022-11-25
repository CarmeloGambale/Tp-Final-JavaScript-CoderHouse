let productsInCart = JSON.parse(localStorage.getItem('shoppingCart'));
if(!productsInCart){
	productsInCart = [];
}
const parentElement = document.querySelector('#productos_comprar');
const sumapreciocarrito = document.querySelector('#suma-precios');
const products = document.querySelectorAll('.product-under');


const sumadeprecio = function () { // 4
	let sum = 0;
	productsInCart.forEach(item => {
		sum += item.precio;
	});
	return sum;
}

const ActualizarCarrito = function () {  // 3
	localStorage.setItem('shoppingCart', JSON.stringify(productsInCart));
	if (productsInCart.length > 0) {
		let result = productsInCart.map(product => {
			return `
				<li class="producto_a_comprar">
					<img src="${product.image}">
					<div>
						<h5>${product.nombre}</h5>
						<h6>$${product.precio}</h6>
						<div>
							<button class="button-minus" data-id=${product.id}>-</button>
							<span class="contador_productos">${product.count}</span>
							<button class="button-plus" data-id=${product.id}>+</button>
						</div>
					</div>
				</li>`
		});
		parentElement.innerHTML = result.join('');
		document.querySelector('.checkout').classList.remove('hidden');
		sumapreciocarrito.innerHTML = '$' + sumadeprecio();

	}
	else {
		document.querySelector('.checkout').classList.add('hidden');
		parentElement.innerHTML = '<h4 class="vacio">Tu carrito está vacio</h4>';
		cartSumPrice.innerHTML = '';
	}
}

function updateProductsInCart(product) { // 2
	for (let i = 0; i < productsInCart.length; i++) {
		if (productsInCart[i].id == product.id) {
			productsInCart[i].count += 1;
			productsInCart[i].precio = productsInCart[i].baseprice * productsInCart[i].count;
			return;
		}
	}
	productsInCart.push(product);
}

products.forEach(item => {   // 1
	item.addEventListener('click', (e) => {
		if (e.target.classList.contains('addToCart')) {
			const productoID = e.target.dataset.productId;
			const nombreproducto = item.querySelector('.nombreproducto').innerHTML;
			const precioproducto = item.querySelector('.precioproducto').innerHTML;
			const imgproducto = item.querySelector('img').src;
			let product = {
				nombre: nombreproducto,
				image: imgproducto,
				id: productoID,
				count: 1,
				precio: +precioproducto,
				baseprice: +precioproducto,
			}
			updateProductsInCart(product);
			ActualizarCarrito();
		}
	});
});

parentElement.addEventListener('click', (e) => { // Last
	const isPlusButton = e.target.classList.contains('button-plus');
	const isMinusButton = e.target.classList.contains('button-minus');
	if (isPlusButton || isMinusButton) {
		for (let i = 0; i < productsInCart.length; i++) {
			if (productsInCart[i].id == e.target.dataset.id) {
				if (isPlusButton) {
					productsInCart[i].count += 1
				}
				else if (isMinusButton) {
					productsInCart[i].count -= 1
				}
				productsInCart[i].precio = productsInCart[i].baseprice * productsInCart[i].count;

			}
			if (productsInCart[i].count <= 0) {
				productsInCart.splice(i, 1);
			}
		}
		ActualizarCarrito();
	}
});

ActualizarCarrito();