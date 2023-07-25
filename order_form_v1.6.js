/*
Birthdate
*/

    document.addEventListener('DOMContentLoaded', (event) => {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;
        document.getElementById("Birthdate").value = today;
    });



/*
Date and Time Input Validation Logic
...
*/

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

</script>

/*
Add-Ons Validation Logic

1. The script waits for the DOMContentLoaded event, i.e., when the DOM is fully loaded.
2. It then finds all elements with the classes '.productoptions_3columns' and '.productoptions_4columns', which are assumed to be add-on containers.
3. For each add-on container, it logs the name of the add-on (assumed to be the text content of a `div` element in the container), and it adds 'input' event listeners to the quantity and size input fields. These listeners call a validation function whenever the input values change.
4. The validation function checks if both the quantity and size fields of an add-on container are filled. If both fields are not filled, it adds an error message and the 'error' class to the container. If both fields are filled, it removes the error message from the DOM. The function also adjusts the 'required' attribute on the quantity and size fields as needed.
5. Lastly, the script selects specific 'input' and 'select' elements based on their 'name' attribute and modifies their 'required' attribute, changing it from 'required' to 'required="required"'.

The primary purpose of this script is to enhance the user interface by providing immediate feedback to users as they interact with product options on a form, ensuring that the form is filled out correctly before submission.
*/

document.addEventListener("DOMContentLoaded", function() {
  function validateAddon(addonContainer) {
    const quantityInput = addonContainer.querySelector('input[type="number"]');
    const sizeInput = addonContainer.querySelector('select');

    if (!quantityInput || !sizeInput) {
      console.error('Unable to find quantityInput or sizeInput. Skipping this addonContainer.');
      return;
    }

    const quantity = quantityInput.value;
    const size = sizeInput.value;

    let errorMessageSpan = addonContainer.nextSibling;

    if (!errorMessageSpan || !errorMessageSpan.classList.contains('error-message')) {
      errorMessageSpan = document.createElement('span');
      errorMessageSpan.classList.add('error-message');
      addonContainer.parentNode.insertBefore(errorMessageSpan, addonContainer.nextSibling);
    }

    if (quantity && !size || !quantity && size) {
      errorMessageSpan.textContent = 'Invalid selection. Please select both quantity and size.';
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

  const addons = document.querySelectorAll('.productoptions_3columns, .productoptions_4columns');
  console.log(`Found ${addons.length} addons.`);

  addons.forEach(function(addonContainer, index) {
    const addonName = addonContainer.querySelector('div')?.textContent;
    console.log(`Addon ${index + 1}: ${addonName}`);

    const quantityInput = addonContainer.querySelector('input[type="number"]');
    const sizeInput = addonContainer.querySelector('select');

    if (quantityInput && sizeInput) {
      quantityInput.addEventListener('input', function() {
        validateAddon(addonContainer);
      });

      sizeInput.addEventListener('input', function() {
        validateAddon(addonContainer);
      });
    } else {
      console.error('Unable to add event listeners. Missing quantityInput or sizeInput.');
    }
  });

  // Replacing required attribute with required="required" for specific input names
  var inputElements = document.querySelectorAll('input[name="Cake-cover"], input[name="Cake-Flavor"], input[name="Cake-Filling"]');
  inputElements.forEach(function(input) {
    if (input.hasAttribute('required') && input.getAttribute('required') === '') {
      input.setAttribute('required', 'required');
    }
  });

  var selectElements = document.querySelectorAll('select[name="Cake-cover"], select[name="Cake-Flavor"], select[name="Cake-Filling"]');
  selectElements.forEach(function(select) {
    if (select.hasAttribute('required') && select.getAttribute('required') === '') {
      select.setAttribute('required', 'required');
    }
  });
});


/*
Order Type Selection Logic

1. The script fetches all radio buttons with the name 'Order-Type' on the DOMContentLoaded event, i.e., when the DOM is fully loaded.
2. It then attaches a 'change' event listener to each of these radio buttons.
3. When a user selects the 'Delivery' radio button, the 'address-fieldset' div is displayed, and the 'pickup-fieldset' div is hidden.
4. Conversely, when a user selects the 'Pick up' radio button, the 'pickup-fieldset' div is displayed, and the 'address-fieldset' div is hidden. Also, it clears all input fields, select dropdowns and text areas in the 'address-fieldset' div.

Note: The display style for showing the divs is set to 'grid'.
*/

document.addEventListener('DOMContentLoaded', function() {
  // Get all the radio buttons with name 'Order-Type'
  let orderTypeRadios = document.querySelectorAll('input[type=radio][name="Order-Type"]');

  // Get the inputs with names 'Street', 'City', 'State', and 'Zipcode'
  let streetInput = document.querySelector('input[name="Street"]');
  let cityInput = document.querySelector('input[name="City"]');
  let stateInput = document.querySelector('input[name="State"]');
  let zipcodeInput = document.querySelector('input[name="Zipcode"]');

  // Listen for changes on each radio button
  orderTypeRadios.forEach(function(radio) {
    radio.addEventListener('change', function(event) {
      // Get the selected order type
      let orderType = event.target.value;

      if (orderType === 'Delivery') {
        // Show "address-fieldset" and hide "pickup-fieldset"
        document.getElementById('address-fieldset').style.display = 'grid';
        document.getElementById('pickup-fieldset').style.display = 'none';

        // Set inputs to required
        if (streetInput) streetInput.required = true;
        if (cityInput) cityInput.required = true;
        if (stateInput) stateInput.required = true;
        if (zipcodeInput) zipcodeInput.required = true;
      } else if (orderType === 'Pick up') {
        // Show "pickup-fieldset" and hide "address-fieldset"
        document.getElementById('address-fieldset').style.display = 'none';
        document.getElementById('pickup-fieldset').style.display = 'grid';

        // Clear and set inputs to not required
        if (streetInput) {
          streetInput.required = false;
          streetInput.value = "";
        }
        if (cityInput) {
          cityInput.required = false;
          cityInput.value = "";
        }
        if (stateInput) {
          stateInput.required = false;
          stateInput.value = "";
        }
        if (zipcodeInput) {
          zipcodeInput.required = false;
          zipcodeInput.value = "";
        }
      }
    });
  });
});


// Clear and remove required from cake input on removal

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



// Make cake inputs required on when added
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
