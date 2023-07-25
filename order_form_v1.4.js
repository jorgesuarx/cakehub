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



// Global Form Validation

// Attach a 'DOMContentLoaded' event listener to document to ensure the DOM is fully loaded before executing the script
document.addEventListener("DOMContentLoaded", function() {
  
  // Get the form by its id, the 'submit-order' button by its id, the add buttons for custom cake and addons, and the 'error-message' div
  var form = document.getElementById("online-order-form");
  var submitOrderButton = document.getElementById("submit-order");
  var addCustomCakeButton = document.getElementById("add-custom-cake");
  var addAddonsButton = document.getElementById("add-addons");
  var errorList = document.getElementById("error_list");
  var errorMessageDiv = document.getElementById("global-error-message");

  // Order type
  var orderTypeLabel = document.getElementById("order-type");
  var pickUpCheckbox = document.getElementById("pick-up");
  var deliveryCheckbox = document.getElementById("delivery");
  var pickupWrapper = document.getElementById("pickup_wrapper");
  var deliveryWrapper = document.getElementById("delivery_wrapper");
  var requiredSpan = orderTypeLabel.querySelector(".required");

  // Helper function to convert a string to Title Case
  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  // Function to check if all required inputs, selects or textareas in the form have a value
  function isFormValid() {
    // Get all input, select and textarea elements in the form that are required
    var requiredFields = form.querySelectorAll("input[required], select[required], textarea[required]");

    // Get divs with id "custom-cake" and "add-ons" and all their inputs, selects, and textareas
    var customCakeFields = document.querySelectorAll("#custom-cake input, #custom-cake select, #custom-cake textarea");
    var addonsFields = document.querySelectorAll("#add-ons input, #add-ons select, #add-ons textarea");

    var allFieldsSet = true;

    // Clear all existing list items in the error list
    errorList.innerHTML = "";

    // Initially hide the 'error-message' div
    errorMessageDiv.style.display = "none";

    requiredFields.forEach(function(field) {
      // If the field is required but not set
      if (field.value.trim() === "") {
        // Log the name of the input
        console.log('Required but not set:', field.name);

        // Get the label associated with this input
        var label = form.querySelector(`label[for="${field.id}"]`);
        if (label) {
          // Set the label color to red
          label.style.color = "#c31919";

          // Get the span with class "required" inside this label
          var requiredSpan = label.querySelector(".required");
          if (requiredSpan) {
            // Set the span display to inline-block
            requiredSpan.style.display = "inline-block";
          }
        }
        
        // Set outline to red
        field.style.outline = "1px solid #c31919";

        // Add a list item to the error list with the field name
        var listItem = document.createElement("li");
        listItem.textContent = toTitleCase(field.name);
        errorList.appendChild(listItem);

        // Show the 'error-message' div
        errorMessageDiv.style.display = "block";

        allFieldsSet = false;
      } else {
        // Get the label associated with this input
        var label = form.querySelector(`label[for="${field.id}"]`);
        if (label) {
          // Reset label color
          label.style.color = "";

          // Get the span with class "required" inside this label
          var requiredSpan = label.querySelector(".required");
          if (requiredSpan) {
            // Reset the span display
            requiredSpan.style.display = "";
          }
        }

        // Reset outline
        field.style.outline = "";
      }
    });

    // Check if 'pick-up' or 'delivery' is checked
    var orderTypeChecked = pickUpCheckbox.checked || deliveryCheckbox.checked;
    console.log('Order type checked:', orderTypeChecked);

    // If neither 'pick-up' nor 'delivery' is checked
    if (!orderTypeChecked) {
      console.log('Neither pick-up nor delivery is checked.');

      // Add a list item to the error list for "Order-type"
      var listItem = document.createElement("li");
      listItem.textContent = "Order-type";
      errorList.appendChild(listItem);

      // Change the color of the label with id "order-type" to red and display the span
      orderTypeLabel.style.color = "#c31919";
      requiredSpan.style.display = "inline-block";

      // Add 1px red outline to the divs with id "pickup_wrapper" and "delivery_wrapper"
      pickupWrapper.style.outline = "1px solid #c31919";
      deliveryWrapper.style.outline = "1px solid #c31919";

      // Show the 'error-message' div
      errorMessageDiv.style.display = "block";

      allFieldsSet = false;
    } else {
      console.log('Either pick-up or delivery is checked.');

      // If 'pick-up' or 'delivery' is checked, remove the red outline, reset the label color, and hide the span
      pickupWrapper.style.outline = "";
      deliveryWrapper.style.outline = "";
      orderTypeLabel.style.color = "";
      requiredSpan.style.display = "none";
    }

    // Check if there is any field set in the divs with id "custom-cake" and "add-ons"
    var anyFieldSet = false;
    [...customCakeFields, ...addonsFields].forEach(function(field) {
      if (field.value.trim() !== "") {
        anyFieldSet = true;
      }
    });

    // Get the "blank-state" div and its text elements
    var blankStateDiv = document.getElementById("blank-state");
    var textElements = blankStateDiv.querySelectorAll("p, h1, h2, h3, h4, h5, h6, span");

    // If no field is set inside the divs with id "custom-cake" and "add-ons", add 1px red outline to the "blank-state" div and update the text
    if (!anyFieldSet) {
      blankStateDiv.style.outline = "1px solid #c31919";
      
      // Change the color and text of all text elements inside "blank-state" div
      textElements.forEach(function(element) {
        element.style.color = "#c31919";
        element.textContent = "Required. Please add add at least 1 product to your order.";
      });

      // Add a list item to the error list for "Products"
      var listItem = document.createElement("li");
      listItem.textContent = "Products";
      errorList.appendChild(listItem);
      
      // Show the 'error-message' div
      errorMessageDiv.style.display = "block";
    } else {
      blankStateDiv.style.outline = "";

      // Reset the color and text of all text elements inside "blank-state" div
      textElements.forEach(function(element) {
        element.style.color = "";
        element.textContent = "No products added yet. Add a product to your order.";
      });
    }

    // Return true if all required fields in the form are set and at least one field in "custom-cake" or "add-ons" is set, false otherwise
    console.log('All fields set:', allFieldsSet);
    return allFieldsSet && anyFieldSet;
  }

  // Attach a click event listener to the 'submit-order' button
  submitOrderButton.addEventListener("click", function(event) {
    // Get the result of isFormValid
    var formValid = isFormValid();

    // Log the result to the console
    console.log('Is form valid?', formValid);

    // Scroll to the top of the page
    window.scrollTo(0, 0);

    // If form is not valid
    if (!formValid) {
      // Prevent the form from being submitted
      event.preventDefault();
    }
  });

  // Attach click event listeners to the 'add-custom-cake' and 'add-addons' buttons
  [addCustomCakeButton, addAddonsButton].forEach(function(button) {
    button.addEventListener("click", function() {
      var blankStateDiv = document.getElementById("blank-state");
      var textElements = blankStateDiv.querySelectorAll("p, h1, h2, h3, h4, h5, h6, span");

      // Remove the outline from the "blank-state" div and reset the text
      blankStateDiv.style.outline = "";
      textElements.forEach(function(element) {
        element.style.color = "";
        element.textContent = "No products yet. Add a product to your order.";
      });
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

//New blank state

document.addEventListener("DOMContentLoaded", function() {
  // Get the 'custom-cake', 'blank-state' divs and the buttons by their ids
  var customCakeDiv = document.getElementById("custom-cake");
  var blankStateDiv = document.getElementById("blank-state");
  var addCustomCakeButton = document.getElementById("add-custom-cake");
  var removeCustomCakeButton = document.getElementById("remove-custom-cake");

  var sections = ["cakepops", "cupcakes", "cakesicles", "cakejars", "desserts", "treats"];

  // Function to check if any section or 'custom-cake' divs are visible
  function checkDivs() {
    var allHidden = sections.every(function(sectionId) {
      var sectionDiv = document.getElementById(sectionId);
      return window.getComputedStyle(sectionDiv).display === "none";
    });
    
    allHidden = allHidden && window.getComputedStyle(customCakeDiv).display === "none";

    if (allHidden) {
      blankStateDiv.style.display = "block";
    } else {
      blankStateDiv.style.display = "none";
    }
  }

  sections.forEach(function(sectionId) {
    var sectionDiv = document.getElementById(sectionId);
    var addSectionButton = document.getElementById("add-" + sectionId);
    var removeSectionButton = document.getElementById("remove-" + sectionId);

    addSectionButton.addEventListener("click", function() {
      sectionDiv.style.display = "grid";
      blankStateDiv.style.display = "none";
      addSectionButton.style.display = "none";
    });

    removeSectionButton.addEventListener("click", function() {
      sectionDiv.style.display = "none";
      checkDivs();
      addSectionButton.style.display = "block";
    });
  });

  addCustomCakeButton.addEventListener("click", function() {
    customCakeDiv.style.display = "grid";
    blankStateDiv.style.display = "none";
    addCustomCakeButton.style.display = "none";
  });

  removeCustomCakeButton.addEventListener("click", function() {
    customCakeDiv.style.display = "none";
    checkDivs();
    addCustomCakeButton.style.display = "block";
  });
});
