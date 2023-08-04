
/* Removes apple-touch-icon ---------- */

window.onload = function() {
    let linkTags = document.querySelectorAll('link[rel="apple-touch-icon"]');
    for (let i = 0; i < linkTags.length; i++) {
        if (linkTags[i].href === "https://global-uploads.webflow.com/6452b9316815a536b4b0adfe/64c328664e1c7df81c3e3bc8_webclip.png") {
            linkTags[i].parentNode.removeChild(linkTags[i]);
        }
    }
};

/* Add min to Add-Ons quantity inputs ---------- */
window.addEventListener("DOMContentLoaded", function () {
  const numberInputs = document.querySelectorAll("input[type='number']");

  numberInputs.forEach(function (input) {
    input.min = 0;
  });
});


/* Clear and remove required from cake input on removal ---------- */

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

/* Make cake inputs required on when added */

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


/* Products Blank State Logic ---------- */
  
document.addEventListener("DOMContentLoaded", function() {

  var sections = ["cakepops", "cupcakes", "cakesicles", "cake-jars", "pastries", "flan", "cheesecakes", "cookies", "tres-leches-shoots", "traditional-tres-leches", "chocolate-dipped-treats", "custom-cake"];
  var blankStateDiv = document.getElementById("blank-state");

  function checkDivs() {
    var allHidden = sections.every(function(sectionId) {
      return window.getComputedStyle(document.getElementById(sectionId)).display === "none";
    });

    blankStateDiv.style.display = allHidden ? "block" : "none";
  }

  function clearFields(sectionDiv) {
    var fields = sectionDiv.querySelectorAll("input, select, textarea");
    fields.forEach(function(field) {
      field.value = "";
      if (field.hasAttribute('required')) {
        field.removeAttribute('required');
      }
    });
  }

  sections.forEach(function(sectionId) {
    var sectionDiv = document.getElementById(sectionId);
    var addSectionButton = document.getElementById("add-" + sectionId);
    var removeSectionButton = document.getElementById("remove-" + sectionId);

    if(addSectionButton && removeSectionButton) {
      addSectionButton.addEventListener("click", function() {
        sectionDiv.style.display = "grid";
        blankStateDiv.style.display = "none";
        addSectionButton.style.display = "none";
      });

      removeSectionButton.addEventListener("click", function() {
        sectionDiv.style.display = "none";
        clearFields(sectionDiv);
        checkDivs();
        addSectionButton.style.display = "flex";
      });
    }
  });
});


/* Modified Date and Time Input Validation Logic ---------- */

// Function to add a specified number of days to a date.
function addDays(date, days) {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

// Function to format a date in MMM DD format.
function formatDate(date) {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return monthNames[date.getMonth()] + " " + ('0' + date.getDate()).slice(-2);
}

// Function to validate if the selected datetime is within new working hours (9 AM - 5 PM)
function validateTime(date) {
  const hours = date.getHours();
  return hours >= 9 && hours < 17;
}

// Function to set the default and minimum values of the datetime-local input element.
function setDateTime() {
  const now = new Date();
  const twoDaysFromNow = addDays(now, 3); 
  const fourDaysFromNow = addDays(now, 4); 
  const sevenDaysFromNow = addDays(now, 7);
  
  const datetimeInput = document.getElementById('datetime');
  datetimeInput.min = twoDaysFromNow.toISOString().substring(0, 16);

  // Initialize error and warning messages
  let timeErrorMessage = null;
  let dateErrorMessage = null;
  let warningMessage = null;

  // Add event listener to validate time and date
  datetimeInput.addEventListener('change', function() {
    const selectedDate = new Date(this.value);
    const timeIsValid = validateTime(selectedDate);
    const dateIsValid = selectedDate >= twoDaysFromNow;
    const dateIsWithinWeek = selectedDate < sevenDaysFromNow;

    // Check if the selected time is valid
    if (!timeIsValid) {
      timeErrorMessage = showErrorMessage(timeErrorMessage, 'Invalid time. Please select a time within our working hours. (9AM-5PM)');
    } else {
      timeErrorMessage = removeMessage(timeErrorMessage);
    }

    // Check if the selected date is valid
    if (!dateIsValid) {
      dateErrorMessage = showErrorMessage(dateErrorMessage, `Invalid date. Please select a date after ${formatDate(fourDaysFromNow)}.`);
      warningMessage = removeMessage(warningMessage);
    } else if (dateIsWithinWeek) {
      warningMessage = showWarningMessage(warningMessage, '');
      dateErrorMessage = removeMessage(dateErrorMessage);
    } else {
      dateErrorMessage = removeMessage(dateErrorMessage);
      warningMessage = removeMessage(warningMessage);
    }

    if (timeIsValid && dateIsValid) {
      this.style.outline = ""; // Remove outline
    }
  });

  function showErrorMessage(errorMessageElement, message) {
    if (!errorMessageElement) {
      errorMessageElement = document.createElement('span');
      errorMessageElement.classList.add('error-message');
      datetimeInput.parentNode.insertBefore(errorMessageElement, datetimeInput.nextSibling);
    }
    errorMessageElement.textContent = message;
    datetimeInput.style.outline = "1px solid #c31919"; // Add outline
    return errorMessageElement;
  }

  function showWarningMessage(warningMessageElement, message) {
    if (!warningMessageElement) {
      warningMessageElement = document.createElement('span');
      warningMessageElement.classList.add('warning-message');
      datetimeInput.parentNode.insertBefore(warningMessageElement, datetimeInput.nextSibling);
    }
    warningMessageElement.textContent = message;
    return warningMessageElement;
  }

  function removeMessage(messageElement) {
    if (messageElement) {
      messageElement.parentNode.removeChild(messageElement);
      return null;
    }
    return messageElement;
  }
}

setDateTime(); // Invoking the function to apply the changes


/* Add-Ons Validation Logic ---------- */

// Event listener that fires when the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", function() {

  // Function to validate a given add-on container
  function validateAddon(addonContainer) {
    // Find quantity and size inputs within the container
    const quantityInput = addonContainer.querySelector('input[type="number"]');
    const sizeInput = addonContainer.querySelector('select');

    // If either input does not exist, exit the function
    if (!quantityInput || !sizeInput) {
      return;
    }

    // Get the current values of the inputs
    const quantity = quantityInput.value;
    const size = sizeInput.value;

    // Get the next sibling of the container, which should be the error message span if it exists
    let errorMessageSpan = addonContainer.nextSibling;

    // If quantity is filled and size is not, display an error message
    if (quantity && !size) {
      // If the error message span doesn't exist yet, create it
      if (!errorMessageSpan || !errorMessageSpan.classList.contains('error-message')) {
        errorMessageSpan = document.createElement('span');
        errorMessageSpan.classList.add('error-message');
        addonContainer.parentNode.insertBefore(errorMessageSpan, addonContainer.nextSibling);
      }
      
      // Update the error message text and style
      errorMessageSpan.textContent = 'Missing size. Please select size for this option.';
      addonContainer.classList.add('error');
      
      // Make both fields required
      quantityInput.setAttribute('required', 'required');
      sizeInput.setAttribute('required', 'required');

      // Highlight the empty field with a red outline
      sizeInput.style.outline = "rgb(195, 25, 25) solid 1px";
      quantityInput.style.outline = "";
      
    // If size is filled and quantity is not, display a different error message
    } else if (!quantity && size) {
      // If the error message span doesn't exist yet, create it
      if (!errorMessageSpan || !errorMessageSpan.classList.contains('error-message')) {
        errorMessageSpan = document.createElement('span');
        errorMessageSpan.classList.add('error-message');
        addonContainer.parentNode.insertBefore(errorMessageSpan, addonContainer.nextSibling);
      }
      
      // Update the error message text and style
      errorMessageSpan.textContent = 'Missing quantity. Please select quantity for this option.';
      addonContainer.classList.add('error');
      
      // Make both fields required
      quantityInput.setAttribute('required', 'required');
      sizeInput.setAttribute('required', 'required');

      // Highlight the empty field with a red outline
      quantityInput.style.outline = "rgb(195, 25, 25) solid 1px";
      sizeInput.style.outline = "";
      
    // If either both fields are filled or both are empty, remove the error message span if it exists
    } else {
      if (errorMessageSpan && errorMessageSpan.classList.contains('error-message')) {
        errorMessageSpan.parentNode.removeChild(errorMessageSpan);
      }
      
      // Remove the error class and red outline from the fields
      addonContainer.classList.remove('error');
      quantityInput.style.outline = "";
      sizeInput.style.outline = "";
      
      // Make both fields not required
      quantityInput.removeAttribute('required');
      sizeInput.removeAttribute('required');
    }
  }

  // Get all add-on containers on the page
  const addons = document.querySelectorAll('.productoptions_3columns, .productoptions_4columns');

  // Loop over all containers and attach event listeners to their inputs
  addons.forEach(function(addonContainer) {
    const quantityInput = addonContainer.querySelector('input[type="number"]');
    const sizeInput = addonContainer.querySelector('select');

    // On page load, set a minimum of 1 for quantity inputs
    if (quantityInput) {
      quantityInput.setAttribute('min', '1');
    }

    // If both inputs exist, attach an event listener to each that validates the container when changed
    if (quantityInput && sizeInput) {
      quantityInput.addEventListener('input', function() {
        validateAddon(addonContainer);
      });

      sizeInput.addEventListener('input', function() {
        validateAddon(addonContainer);
      });
    }
  });
});



/* Order Type Selection Logic ---------- */

document.addEventListener('DOMContentLoaded', function() {
  // Get all the radio buttons with name 'Order-Type'
  let orderTypeRadios = document.querySelectorAll('input[type=radio][name="Order-Type"]');

  // Get the divs
  let addressFieldset = document.getElementById('address-fieldset');
  let pickupFieldset = document.getElementById('pickup-fieldset');

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
        addressFieldset.style.display = 'grid';
        pickupFieldset.style.display = 'none';

        // Set inputs to required
        if (streetInput) streetInput.required = true;
        if (cityInput) cityInput.required = true;
        if (stateInput) stateInput.required = true;
        if (zipcodeInput) zipcodeInput.required = true;

        // Reset all input styles within 'address-fieldset'
        let inputs = addressFieldset.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
          // Reset styles
          input.style.outline = "";
          let label = document.querySelector(`label[for="${input.id}"]`);
          if (label) {
            label.style.color = "";
            let requiredPan = label.querySelector('.required');
            if (requiredPan) requiredPan.style.display = "";
          }
        });
      } else if (orderType === 'Pick up') {
        // Show "pickup-fieldset" and hide "address-fieldset"
        addressFieldset.style.display = 'none';
        pickupFieldset.style.display = 'grid';

        // Clear and set inputs to not required
        let inputs = addressFieldset.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
          input.value = "";
          // Reset styles
          input.style.outline = "";
          let label = document.querySelector(`label[for="${input.id}"]`);
          if (label) {
            label.style.color = "";
            let requiredPan = label.querySelector('.required');
            if (requiredPan) requiredPan.style.display = "";
          }
        });

        // Set inputs to not required
        if (streetInput) streetInput.required = false;
        if (cityInput) cityInput.required = false;
        if (stateInput) stateInput.required = false;
        if (zipcodeInput) zipcodeInput.required = false;
      }
    });
  });
});

/* Input Autocomplete Logic ---------- */

document.addEventListener('DOMContentLoaded', function() {

    // Define a dictionary for input names and their corresponding autocomplete values
    let autocompleteValues = {
        "Street": "street-address",
        "City": "address-level2",
        "State": "address-level1",
        "Zipcode": "postal-code",
        "First-Name": "given-name",
        "Last-Name": "family-name",
        "Email": "email",
        "Phone": "tel",
        "Birthdate": "bday",
        "Apt-Suite": "address-line2"
    }

    // Iterate over each item in the dictionary
    for (let inputName in autocompleteValues) {

        // Find the input with the current name
        let input = document.querySelector(`input[name="${inputName}"]`);
        
        // If the input exists, set its autocomplete attribute
        if (input) {
            input.setAttribute('autocomplete', autocompleteValues[inputName]);
        }
    }
});
