function adjustFixedPosition() {
    const mainDiv = document.getElementById('main');
    const recommendedDiv = document.getElementById('Recommended');
  
    const mainDivRect = mainDiv.getBoundingClientRect();
  
    // Assuming you want the right edge of `Recommended` to align with the right edge of `main`
    const rightPosition = window.innerWidth - mainDivRect.right;
    recommendedDiv.style.right = `${rightPosition}px`;
  }
  
  // Adjust position on load and on window resize
  window.onload = adjustFixedPosition;
  window.onresize = adjustFixedPosition;
  
 

  document.getElementById('autoresizing').addEventListener('input', function() {
    this.style.height = 'auto'; // Reset height to auto to reduce it if needed
    this.style.height = this.scrollHeight + 'px'; // Set height based on content
  });
  
  
  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.checker').forEach(checker => {
        let enterBtn = checker.querySelector('.enterBtn');
        let cancelBtn = checker.querySelector('.cancelBtn');
        let textarea = checker.querySelector('textarea');

        enterBtn.addEventListener('click', function() {
            // Your logic for the Enter button click event
            console.log("Enter button clicked");
        });

        cancelBtn.addEventListener('click', function(event) {
            // Prevent event bubbling
            event.stopPropagation();
            
            // Hide the textarea-container
            let textareaContainer = this.closest('.textarea-container');
            textareaContainer.style.display = 'none';
            
            // Clear the textarea
            textarea.value = "";

            console.log("Cancel button clicked");
        });

        checker.addEventListener('click', function() {
            let show = this.querySelector('.textarea-container');
            show.style.display = 'block';
            console.log("Textarea container displayed");
            show.foc
            // You can add more logic here if needed
        });
    });
});
