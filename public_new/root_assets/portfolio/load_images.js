document.addEventListener('DOMContentLoaded', function() {
    const imageData = {
      images: [
        '/projects/thumbnails/'
      ]
    };
  
    const imageGrid = document.getElementById('imageGrid');
  
    imageData.images.forEach((imageUrl, index) => {
      const imageWrapper = document.createElement('div');
      imageWrapper.className = 'image';
      imageWrapper.innerHTML = `<img src="${imageUrl}" alt="Image ${index + 1}">`;
      imageGrid.appendChild(imageWrapper);
    });
  });
  