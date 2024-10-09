document.addEventListener('DOMContentLoaded', () => {
    const toggleDarkMode = () => {
        const isDarkMode = document.body.classList.toggle('dark');

        const icon = document.getElementById('dark-mode-icon');
        setTimeout(() => {
            icon.classList.toggle('fa-sun', !isDarkMode);
            icon.classList.toggle('fa-moon', isDarkMode);
        }, 150);

        localStorage.setItem('darkMode', isDarkMode);
    };

    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'true') {
        document.body.classList.add('dark');
        document.getElementById('dark-mode-icon').classList.replace('fa-sun', 'fa-moon');
    }

    const darkModeToggleButton = document.getElementById('dark-mode-toggle');
    if (darkModeToggleButton) {
        darkModeToggleButton.addEventListener('click', toggleDarkMode);
    }
});
