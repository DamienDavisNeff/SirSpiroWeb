document.addEventListener("DOMContentLoaded", function() {
    const menuBtn = document.querySelector('.menu-btn');
    const menu = document.querySelector('.menu');
    const closeBtn = document.querySelector('.close-btn');

    menuBtn.addEventListener('click', function() {
        menu.classList.toggle('open');
        document.addEventListener('click', closeMenuOutside);
    });

    closeBtn.addEventListener('click', function() {
        menu.classList.remove('open');
        document.removeEventListener('click', closeMenuOutside);
    });

    function closeMenuOutside(event) {
        // Check if the clicked element is not inside the menu
        if (!menu.contains(event.target) && event.target !== menuBtn) {
            menu.classList.remove('open');
            document.removeEventListener('click', closeMenuOutside);
        }
    }
});
