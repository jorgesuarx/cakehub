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


