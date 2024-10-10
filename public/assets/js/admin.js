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

// Clock
function updateClock() {
	const now = new Date();
	const hours = String(now.getHours()).padStart(2, '0');
	const minutes = String(now.getMinutes()).padStart(2, '0');
	const seconds = String(now.getSeconds()).padStart(2, '0');
	const timeString = `${hours}:${minutes}:${seconds}`;
	document.getElementById('clock').textContent = timeString;
}
setInterval(updateClock, 1000);
updateClock();

// Menu user Dropdown
function toggleDropdown() {
	const dropdownMenu = document.getElementById('userDropdownMenu');
	dropdownMenu.classList.toggle('hidden');
}
window.onclick = function(event) {
	if (!event.target.closest('.relative')) {
		document.getElementById('userDropdownMenu').classList.add('hidden');
	}
}