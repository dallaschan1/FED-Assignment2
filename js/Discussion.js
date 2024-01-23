document.addEventListener('DOMContentLoaded', function() {
    const tagsMenu = document.getElementById('tags-menu');
    const tagsDropdown = document.getElementById('tags-dropdown');
    const dropdownIcon = document.getElementById('dropdown-icon');
  
    tagsMenu.addEventListener('click', function() {
      const isDropdownVisible = tagsDropdown.style.display === 'flex';
      tagsDropdown.style.display = isDropdownVisible ? 'none' : 'flex';
      dropdownIcon.classList.toggle('fa-chevron-down');
      dropdownIcon.classList.toggle('fa-chevron-up');
    });
  });
  