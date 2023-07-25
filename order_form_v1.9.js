/* Birthdate Default Date ---------- */


    document.addEventListener('DOMContentLoaded', (event) => {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;
        document.getElementById("Birthdate").value = today;
    });



/* Date and Time Input Validation Logic ---------- */


// Function to format a date object to 'YYYY-MM-DDTHH:MM' format in local time.
function getFormattedDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed.
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

// Function to add a specified number of days to a date.
function addDays(date, days) {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

// Function to validate if the selected datetime is within working hours (9 AM - 6 PM)
function validateTime(date) {
  const hours = date.getHours();
  return hours >= 9 && hours < 18;
}

// Function to set the default and minimum values of the datetime-local input element.
function setDateTime() {
  const now = new Date();  
  const sevenDaysFromNow = addDays(now, 7);
  sevenDaysFromNow.setHours(12, 0, 0, 0); // Setting time to 12 PM

  const datetimeInput = document.getElementById('datetime');
  const label = document.querySelector(`label[for="${datetimeInput.id}"]`);
  const originalLabelColor = window.getComputedStyle(label).color;

  datetimeInput.value = getFormattedDate(sevenDaysFromNow); 
  datetimeInput.min = getFormattedDate(sevenDaysFromNow); // Set min to seven days from now

  // Add event listener to validate time and date
  datetimeInput.addEventListener('change', function() {
    const selectedDate = new Date(this.value);

    let timeIsValid = validateTime(selectedDate);
    let dateIsValid = selectedDate >= new Date(this.min);

    let timeErrorMessage = datetimeInput.parentNode.querySelector('.error-message-time');
    let dateErrorMessage = datetimeInput.parentNode.querySelector('.error-message-date');

    if (!timeIsValid) {
      if (!timeErrorMessage) {
        timeErrorMessage = document.createElement('span');
        timeErrorMessage.classList.add('error-message', 'error-message-time');
        datetimeInput.parentNode.insertBefore(timeErrorMessage, datetimeInput.nextSibling);
      }
      timeErrorMessage.textContent = 'Invalid time. Please enter a time between 9 AM and 6 PM. ';
      this.style.outline = "1px solid #c31919"; // Add outline
      label.style.color = "#c31919"; // Change label text color
    } else {
      if (timeErrorMessage) {
        timeErrorMessage.parentNode.removeChild(timeErrorMessage); // Remove error message from DOM
      }
    }

    if (!dateIsValid) {
      if (!dateErrorMessage) {
        dateErrorMessage = document.createElement('span');
        dateErrorMessage.classList.add('error-message', 'error-message-date');
        datetimeInput.parentNode.insertBefore(dateErrorMessage, datetimeInput.nextSibling);
      }
      dateErrorMessage.textContent = 'Invalid date. Please select a date 7 days from today.';
      this.style.outline = "1px solid #c31919"; // Add outline
      label.style.color = "#c31919"; // Change label text color
    } else {
      if (dateErrorMessage) {
        dateErrorMessage.parentNode.removeChild(dateErrorMessage); // Remove error message from DOM
      }
    }

    if (timeIsValid && dateIsValid) {
      this.style.outline = ""; // Remove outline
      label.style.color = originalLabelColor; // Reset label text color
    }
  });
}

setDateTime();



/* DONE-> Add-Ons Validation Logic ---------- */

// An event listener is added to the document that waits for the HTML document to be completely loaded and parsed.
document.addEventListener("DOMContentLoaded", function() {
  // A function that validates a single add-on. Takes a container element as argument.
  function validateAddon(addonContainer) {
    // Selects the quantity input and size select elements from the given container.
    const quantityInput = addonContainer.querySelector('input[type="number"]');
    const sizeInput = addonContainer.querySelector('select');

    // If either of the above elements does not exist, the function ends here.
    if (!quantityInput || !sizeInput) {
      return;
    }

    // Values of the above elements are stored.
    const quantity = quantityInput.value;
    const size = sizeInput.value;

    // Attempts to select a span element for displaying error messages. If it doesn't exist, it's created.
    let errorMessageSpan = addonContainer.nextSibling;
    if (!errorMessageSpan || !errorMessageSpan.classList.contains('error-message')) {
      errorMessageSpan = document.createElement('span');
      errorMessageSpan.classList.add('error-message');
      addonContainer.parentNode.insertBefore(errorMessageSpan, addonContainer.nextSibling);
    }

    // Validation rules are checked. If either quantity or size is missing, error message is shown and 'required' attributes are added.
    // If both are present, error message is removed and 'required' attributes are removed.
    if (quantity && !size || !quantity && size) {
      errorMessageSpan.textContent = 'Missing selection. Please select both quantity and size.';
      addonContainer.classList.add('error');
      quantityInput.setAttribute('required', 'required');
      sizeInput.setAttribute('required', 'required');
    } else if (quantity && size) {
      errorMessageSpan.parentNode.removeChild(errorMessageSpan);
      addonContainer.classList.remove('error');
      quantityInput.removeAttribute('required');
      sizeInput.removeAttribute('required');
    }
  }

  // Selects all addon container elements.
  const addons = document.querySelectorAll('.productoptions_3columns, .productoptions_4columns');

  // For each container, validation is set up.
  addons.forEach(function(addonContainer) {
    // Selects the quantity input and size select elements from the given container.
    const quantityInput = addonContainer.querySelector('input[type="number"]');
    const sizeInput = addonContainer.querySelector('select');

    // If both elements exist, validation is added on change (input event).
    if (quantityInput && sizeInput) {
      quantityInput.addEventListener('input', function() {
        validateAddon(addonContainer);
      });

      sizeInput.addEventListener('input', function() {
        validateAddon(addonContainer);
      });
    }
  });

  // Sets 'required' attribute to 'required' string for specific input names if it's currently an empty string.
  var inputElements = document.querySelectorAll('input[name="Cake-cover"], input[name="Cake-Flavor"], input[name="Cake-Filling"]');
  inputElements.forEach(function(input) {
    if (input.hasAttribute('required') && input.getAttribute('required') === '') {
      input.setAttribute('required', 'required');
    }
  });

  // Does the same for select elements.
  var selectElements = document.querySelectorAll('select[name="Cake-cover"], select[name="Cake-Flavor"], select[name="Cake-Filling"]');
  selectElements.forEach(function(select) {
    if (select.hasAttribute('required') && select.getAttribute('required') === '') {
      select.setAttribute('required', 'required');
    }
  });
});




/* DONE -> Clear and remove required from cake input on removal ---------- */

// Waits until the DOM is completely loaded and ready
document.addEventListener("DOMContentLoaded", function() {

  // Get the 'remove-custom-cake' element by its id
  var removeButton = document.getElementById("remove-custom-cake");

  // If the 'remove-custom-cake' element is present in the document
  if (removeButton) {

    // Attach a click event listener to the 'remove-custom-cake' element
    removeButton.addEventListener("click", function() {

      // Get the 'custom-cake' div by its id
      var customCakeDiv = document.getElementById("custom-cake");

      // If the 'custom-cake' div is present in the document
      if (customCakeDiv) {

        // Select all input, select, and textarea fields within the 'custom-cake' div
        var fields = customCakeDiv.querySelectorAll("input, select, textarea");

        // For each field (input, select, or textarea)
        fields.forEach(function(field) {

          // Clear the field
          field.value = "";

          // If the field is required
          if (field.hasAttribute('required')) {
            // Remove the 'required' attribute
            field.removeAttribute('required');
          }
        });
      }
    });
  }
});

/* DONE -> Make cake inputs required on when added */

// Attach a 'DOMContentLoaded' event listener to the document to ensure the DOM is fully loaded before executing the script
document.addEventListener("DOMContentLoaded", function() {

  // Get the 'add-custom-cake' element by its id
  var addButton = document.getElementById("add-custom-cake");

  // If the 'add-custom-cake' element is present in the document
  if (addButton) {

    // Attach a click event listener to the 'add-custom-cake' element
    addButton.addEventListener("click", function() {

      // Get the 'custom-cake' div by its id
      var customCakeDiv = document.getElementById("custom-cake");

      // If the 'custom-cake' div is present in the document
      if (customCakeDiv) {

        // Select all input, select, and textarea fields within the 'custom-cake' div
        var fields = customCakeDiv.querySelectorAll("input, select, textarea");

        // For each field (input, select, or textarea)
        fields.forEach(function(field) {

          // Add the 'required' attribute to the field
          field.setAttribute('required', '');
        });
      }
    });
  }
});
