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


// ------------------------



/* DONE -> Order Type Selection Logic ---------- */

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



/* Global Form Validation --------- */
document.addEventListener("DOMContentLoaded", function() {
  
  var form = document.getElementById("online-order-form");
  var submitOrderButton = document.getElementById("submit-order");
  var errorList = document.getElementById("error_list");
  var errorMessageDiv = document.getElementById("global-error-message");

  var orderTypeLabel = document.getElementById("order-type");
  var pickUpCheckbox = document.getElementById("pick-up");
  var deliveryCheckbox = document.getElementById("delivery");
  var pickupWrapper = document.getElementById("pickup_wrapper");
  var deliveryWrapper = document.getElementById("delivery_wrapper");
  var requiredSpan = orderTypeLabel.querySelector(".required");

  var productSections = ["cakepops", "cupcakes", "cakesicles", "cake-jars", "desserts-and-pastries", "chocolate-dipped-treats", "custom-cake"];  
  var productFields = productSections.map(id => document.querySelectorAll(`#${id} input, #${id} select, #${id} textarea`));
  var addButtons = productSections.map(id => document.getElementById(`add-${id}`)); 
  var removeButtons = productSections.map(id => document.getElementById(`remove-${id}`)); 

  function toTitleCase(str) {
    str = str.replace(/-/g, " "); // Replaces all hyphens with spaces
    str = str.replace(/Add On/gi, ""); // Replaces "Add On" with empty string
    str = str.replace(/\d/g, ""); // Replaces all numbers with empty string
    return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  function isFormValid() {
    var requiredFields = form.querySelectorAll("input[required], select[required], textarea[required]");
    var allFieldsSet = true;
    var optionChecked = false;

    errorList.innerHTML = "";
    errorMessageDiv.style.display = "none";

    // validate product sections
    productSections.forEach(id => {
      // Skip validation for custom-cake section
      if(id === "custom-cake") {
        return;
      }

      var sectionDiv = document.getElementById(id);
      // Skip if the section is not visible
      if (window.getComputedStyle(sectionDiv).display !== 'grid') {
        return;
      }

      const productDivs = document.querySelectorAll(`#${id} .productoptions_3columns, #${id} .productoptions_4columns`);
      productDivs.forEach(div => {
        const quantityInput = div.querySelector('input[type="number"]');
        const sizeInput = div.querySelector('select');
        if(quantityInput && sizeInput && quantityInput.value && sizeInput.value) {
          optionChecked = true;
        }
      });

      if (!optionChecked) {
        allFieldsSet = false;
        // Create and append addon_error_message span if it doesn't already exist
        var errorSpan = sectionDiv.querySelector('.addon_error_message');
        if (!errorSpan) {
          errorSpan = document.createElement('span');
          errorSpan.classList.add('addon_error_message');
          errorSpan.textContent = "Invalid selection. Please select both quantity and size of at least one option.";
          sectionDiv.insertBefore(errorSpan, sectionDiv.firstChild);
        }
        // Add section name to error_list
        var listItem = document.createElement("li");
        listItem.textContent = toTitleCase(id);
        errorList.appendChild(listItem);
      } else {
        // Remove error span if it exists
        var errorSpan = sectionDiv.querySelector('.addon_error_message');
        if (errorSpan) {
          sectionDiv.removeChild(errorSpan);
        }
        // Remove section name from error_list
        Array.from(errorList.children).forEach(li => {
          if(li.textContent === toTitleCase(id)) {
            errorList.removeChild(li);
          }
        });
      }
    });

    requiredFields.forEach(function(field, index) {
      if (field.value.trim() === "") {
        var label = form.querySelector(`label[for="${field.id}"]`);
        if (label) {
          label.style.color = "#c31919";
          var requiredSpan = label.querySelector(".required");
          if (requiredSpan) {
            requiredSpan.style.display = "inline-block";
          }
        }
        
        field.style.outline = "1px solid #c31919";
        var listItem = document.createElement("li");
        listItem.textContent = toTitleCase(field.name);
        errorList.appendChild(listItem);
        errorMessageDiv.style.display = "block";
        allFieldsSet = false;
      } else {
        var label = form.querySelector(`label[for="${field.id}"]`);
        if (label) {
          label.style.color = "";
          var requiredSpan = label.querySelector(".required");
          if (requiredSpan) {
            requiredSpan.style.display = "";
          }
        }
        field.style.outline = "";
      }
    });

    var orderTypeChecked = pickUpCheckbox.checked || deliveryCheckbox.checked;

    if (!orderTypeChecked) {
      var listItem = document.createElement("li");
      listItem.textContent = "Order Type";
      errorList.appendChild(listItem);

      orderTypeLabel.style.color = "#c31919";
      requiredSpan.style.display = "inline-block";

      pickupWrapper.style.outline = "1px solid #c31919";
      deliveryWrapper.style.outline = "1px solid #c31919";

      errorMessageDiv.style.display = "block";

      allFieldsSet = false;
    } else {
      pickupWrapper.style.outline = "";
      deliveryWrapper.style.outline = "";
      orderTypeLabel.style.color = "";
      requiredSpan.style.display = "none";
    }

    var anyFieldSet = false;
    productFields.forEach(function(fields) {
      fields.forEach(function(field) {
        if (field.value.trim() !== "") {
          anyFieldSet = true;
        }
      });
    });

    var blankStateDiv = document.getElementById("blank-state");
    var textElements = blankStateDiv.querySelectorAll("p, h1, h2, h3, h4, h5, h6, span");

    if (!anyFieldSet) {
      blankStateDiv.style.outline = "1px solid #c31919";
      
      textElements.forEach(function(element) {
        element.style.color = "#c31919";
        element.textContent = "Required. Please add add at least 1 product to your order.";
      });

      var listItem = document.createElement("li");
      listItem.textContent = "Order Products";
      errorList.appendChild(listItem);
      
      errorMessageDiv.style.display = "block";
    } else {
      blankStateDiv.style.outline = "";
      textElements.forEach(function(element) {
        element.style.color = "";
        element.textContent = "No products added yet. Add a product to your order.";
      });
    }

    return allFieldsSet && anyFieldSet;
  }

  submitOrderButton.addEventListener("click", function(event) {
    var formValid = isFormValid();
    window.scrollTo(0, 0);
    if (!formValid) {
      event.preventDefault();
    }
  });

  addButtons.forEach(function(button) {
    if(button){
      button.addEventListener("click", function() {
        var blankStateDiv = document.getElementById("blank-state");
        var textElements = blankStateDiv.querySelectorAll("p, h1, h2, h3, h4, h5, h6, span");

        blankStateDiv.style.outline = "";
        textElements.forEach(function(element) {
          element.style.color = "";
          element.textContent = "No products added yet. Add a product to your order.";
        });
      });
    }
  });

  removeButtons.forEach(function(button) {
    if(button){
      button.addEventListener("click", function() {
        // Get the section id from the button id by removing 'remove-' prefix
        var sectionId = button.id.replace('remove-', '');
        var fields = document.querySelectorAll(`#${sectionId} input, #${sectionId} select, #${sectionId} textarea`);
        fields.forEach(function(field) {
          // Reset the field
          field.value = '';
          // Remove error styles
          field.style.outline = "";

          var label = form.querySelector(`label[for="${field.id}"]`);
          if (label) {
            label.style.color = "";
            var requiredSpan = label.querySelector(".required");
            if (requiredSpan) {
              requiredSpan.style.display = "";
            }
          }
        });

        // Remove 'error' class from all divs inside the section
        var divs = document.querySelectorAll(`#${sectionId} div`);
        divs.forEach(function(div) {
          div.classList.remove("error");
        });

        // Remove error messages
        var errorMessages = document.querySelectorAll(`#${sectionId} .error-message`);
        errorMessages.forEach(function(message) {
          message.parentNode.removeChild(message);
        });

        // Remove addon error message
        var addonErrorMessage = document.querySelector(`#${sectionId} .addon_error_message`);
        if(addonErrorMessage) {
          addonErrorMessage.parentNode.removeChild(addonErrorMessage);
        }

        // Remove section name from error_list
        Array.from(errorList.children).forEach(li => {
          if(li.textContent === toTitleCase(sectionId)) {
            errorList.removeChild(li);
          }
        });

        // Reset the appearance of the section
        var blankStateDiv = document.getElementById("blank-state");
        var textElements = blankStateDiv.querySelectorAll("p, h1, h2, h3, h4, h5, h6, span");
        blankStateDiv.style.outline = "";
        textElements.forEach(function(element) {
          element.style.color = "";
          element.textContent = "No products added yet. Add a product to your order.";
        });
      });
    }
  });
});


