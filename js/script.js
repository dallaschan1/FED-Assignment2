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
function updateNav() {
    const loginSignupBtn = document.getElementById('login-signup-btn');
    const userImg = document.getElementById('user-img');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userImageSrc = localStorage.getItem('userImage'); // URL or base64 of user image

    if (isLoggedIn && userImageSrc) {
        loginSignupBtn.style.display = 'none';
        userImg.src = userImageSrc;
        userImg.style.display = 'block';
    } else {
        loginSignupBtn.style.display = 'block';
        userImg.style.display = 'none';
    }
}

window.onload = updateNav;


