// Aside
const menuToggle = document.getElementById('menu-toggle');
const asideMenu = document.getElementById('aside-menu');
const asideHideButton = document.getElementById('aside-hide');

menuToggle.addEventListener('click', () => {
	asideMenu.classList.toggle('-translate-x-full');
});

asideHideButton.addEventListener('click', () => {
	asideMenu.classList.add('-translate-x-full');
});