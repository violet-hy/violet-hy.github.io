document.addEventListener('DOMContentLoaded', function () {
    const descriptionInput = document.getElementById('description');
    const charCount = document.getElementById('charRemaining');
    const maxLength = descriptionInput.getAttribute('maxlength');
  
    // Update the character count
    descriptionInput.addEventListener('input', function () {
      const currentLength = descriptionInput.value.length;
      const remaining = maxLength - currentLength;
  
      // Update the counter text
      charCount.textContent = `${remaining}`;
  
      // Change color
      if (remaining <= 20) {
        charCount.style.color = 'red'; 
      } else {
        charCount.style.color = ''; // Default color
      }
    });
  });