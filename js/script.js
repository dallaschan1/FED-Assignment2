document.addEventListener('DOMContentLoaded', function () {
    let nav = document.getElementById('main-nav');
    let underline = document.getElementById('underline');
    let underline2 = document.getElementById('underline2');
    let activeLink = nav.querySelector('a.active');
    let links = nav.querySelectorAll('a');

    function moveUnderline(link) {
        underline.style.width = link.offsetWidth + 'px';
        underline.style.left = link.offsetLeft + 'px';
        underline2.style.width = link.offsetWidth + 'px';
        underline2.style.left = link.offsetLeft + 'px';
    }

    links.forEach(link => {
        link.addEventListener('mouseenter', function() {
            setTimeout(function() {
                moveUnderline(link);
            }, 200);
            
        });

        link.addEventListener('mouseleave', function() {
            setTimeout(function() {
                moveUnderline(activeLink);
            }, 200);
        });
    });

    
    moveUnderline(activeLink);
});