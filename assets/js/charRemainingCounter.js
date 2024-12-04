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
  
      // Change color based on the remaining characters
      if (remaining <= 20) {
        charCount.style.color = 'red'; // Change color when less than or equal to 20 characters left
      } else {
        charCount.style.color = ''; // Default color
      }
    });
  });