const groceryItem = document.getElementById("groceryInput");
const groceryList = document.getElementById("groceryList");
const clearBtn = document.getElementById("clearBtn");
const submitBtn = document.getElementById("submitBtn");
const alertMsg = document.getElementById("alertMessage");
let editElement;
let editDefault = false;

submitBtn.addEventListener("click", addItem);
clearBtn.addEventListener("click", clearItems);

function addItem(e) {
  e.preventDefault();
  const inputValue = groceryItem.value.trim();
  if (inputValue !== "" && !editDefault) {
    const listElement = document.createElement("div");
    listElement.classList.add("grocery-item");
    listElement.innerHTML = `<p class="grocery-name">${inputValue}</p>
                        <div class="btn-container">
                        <button type="button" class="edit-btn""><i class="fas fa-edit"></i></button>
                        <button type="button" class="delete-btn"><i class="fas fa-trash"></i></button>
                        </div>`;
    const deleteBtn = listElement.querySelector(".delete-btn");
    const editBtn = listElement.querySelector(".edit-btn");

    groceryList.appendChild(listElement);
    displayAlert("Item added to the list...", "success");
    if (groceryList.childElementCount > 0) {
      clearBtn.removeAttribute("disabled");
    }
    deleteItem(deleteBtn, listElement);
    editItem(editBtn, listElement);
  } else if (inputValue !== "" && editDefault) {
    editElement.innerHTML = inputValue;
    displayAlert("Item Edited !!", "success");
  } else {
    displayAlert("Please Enter value...", "danger");
  }
  setBackToDefault();
}
function setBackToDefault() {
  groceryItem.value = "";
  submitBtn.textContent = "Submit";
  editDefault = false;
}
function clearItems() {
  groceryList.innerHTML = "";
  clearBtn.setAttribute("disabled", "");
  displayAlert("List is Empty !!", "danger");
}
function deleteItem(deleteBtn, listElement) {
  deleteBtn.addEventListener("click", function () {
    groceryList.removeChild(listElement);
    displayAlert("Item Removed !", "danger");
  });
}
function editItem(editBtn, listElement) {
  editBtn.addEventListener("click", function () {
    editElement = listElement.querySelector(".grocery-name");
    groceryItem.value = editElement.innerHTML;
    editDefault = true;
    submitBtn.textContent = "Save";
  });
}
function displayAlert(alertText, alertStatus) {
  alertMsg.textContent = alertText;
  alertMsg.classList.add(`alert-${alertStatus}`);
  setTimeout(function () {
    alertMsg.textContent = "";
    alertMsg.classList.remove(`alert-${alertStatus}`);
  }, 1000);
}
