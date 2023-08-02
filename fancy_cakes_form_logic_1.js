
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

/* Add-Ons Validation Logic ---------- */

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
      errorMessageSpan.textContent = 'Please select both quantity and size.';
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