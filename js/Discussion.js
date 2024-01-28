

document.addEventListener("DOMContentLoaded", function() {
  const menuItems = document.querySelectorAll('.menu li:not(.separator, .dropdown)');

  menuItems.forEach(item => {
      item.addEventListener('click', function() {
          // Remove Active class from all items
          menuItems.forEach(i => i.classList.remove('Active'));

          // Add Active class to clicked item
          this.classList.add('Active');
      });
  });
  const communityDropdown = document.querySelector('.dropdown');
  const communityArrow = communityDropdown.querySelector('i');

  communityDropdown.addEventListener('click', function() {
      communityArrow.classList.toggle('rotated');
  });
});
