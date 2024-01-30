document.getElementById('text-option').addEventListener('click', function() {
    document.getElementById('main-text').style.display = 'block';
    document.getElementById('image-upload-area').style.display = 'none';
});

document.getElementById('image-option').addEventListener('click', function() {
    document.getElementById('main-text').style.display = 'none';
    document.getElementById('image-upload-area').style.display = 'flex';
});

document.getElementById('upload-link').addEventListener('click', function() {
    document.getElementById('image-input').click();
});

document.getElementById('image-input').addEventListener('change', function(event) {
    if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            var img = document.createElement('img');
            img.src = e.target.result;
            var dropZone = document.getElementById('image-drop-zone');
            dropZone.innerHTML = '';
            dropZone.appendChild(img);
        };
        reader.readAsDataURL(event.target.files[0]);
    }
});
