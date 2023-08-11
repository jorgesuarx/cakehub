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

      if (orderType === 'DELIVERY') {
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
      } else if (orderType === 'PICKUP') {
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

  var productSections = ["cakepops", "cupcakes", "cakesicles", "cake-jars", "pastries", "flan", "flan", "cookies", "tres-leches-shoots", "traditional-tres-leches", "chocolate-dipped-treats", "custom-cake"];  
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
          errorSpan.textContent = "Missing selection. Please choose an option.";
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
        element.textContent = "(Required) Please add add at least 1 product to your order.";
      });

      var listItem = document.createElement("li");
      listItem.textContent = "Order Products";
      errorList.appendChild(listItem);
      
      errorMessageDiv.style.display = "block";
    } else {
      blankStateDiv.style.outline = "";
      textElements.forEach(function(element) {
        element.style.color = "";
        element.textContent = "No products added yet.";
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
          element.textContent = "No products added yet.";
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
          element.textContent = "No products added yet.";
        });
      });
    }
  });
});


