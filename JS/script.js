const responsiveNavbar = (function () {
	const boton = document.querySelector("#boton_menu");
	const navbar = document.querySelector("#navbar")
	boton.addEventListener("click", function () {
		if (navbar.className === "navbar") {
			navbar.className += " navbarResponsive";
		}
		else {
			navbar.className = "navbar";
		}
	});
})();

function cerrarCarrito() {
	const cart = document.querySelector('.producstOnCart');
	cart.classList.toggle('hide');
	document.querySelector('body').classList.toggle('stopScrolling')
}


const openShopCart = document.querySelector('.shoppingCartButton');
openShopCart.addEventListener('click', () => {
	const cart = document.querySelector('.producstOnCart');
	cart.classList.toggle('hide');
	document.querySelector('body').classList.toggle('stopScrolling');
});


const closeShopCart = document.querySelector('#cerrarboton');
const overlay = document.querySelector('.overlay');
closeShopCart.addEventListener('click', cerrarCarrito);
overlay.addEventListener('click', cerrarCarrito);