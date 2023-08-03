
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

/* Products Blank State Logic ---------- */
  
document.addEventListener("DOMContentLoaded", function() {

  var sections = ["cakepops", "cupcakes", "cakesicles", "cake-jars", "desserts-and-pastries", "chocolate-dipped-treats", "custom-cake"];
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
  const twoDaysFromNow = addDays(now, 2); 
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
      timeErrorMessage = showErrorMessage(timeErrorMessage, '🚫 Invalid time. Please select a time within our working hours (9AM-5PM).');
    } else {
      timeErrorMessage = removeMessage(timeErrorMessage);
    }

    // Check if the selected date is valid
    if (!dateIsValid) {
      dateErrorMessage = showErrorMessage(dateErrorMessage, `🚫 Invalid date. Orders require a 2-day advance. Please select a date after ${formatDate(twoDaysFromNow)}.`);
      warningMessage = removeMessage(warningMessage);
    } else if (dateIsWithinWeek) {
      warningMessage = showWarningMessage(warningMessage, '⚠️ A rush fee may apply for orders made less than 7 days in advance.');
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

