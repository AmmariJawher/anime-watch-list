// Select Elements
const date = document.querySelector(".date")
const clear = document.querySelector(".clear")
const list = document.querySelector(".list")
const addItem = document.querySelector(".add-item")
const input = document.querySelector("input")
const addButton = document.querySelector(".add")

// Variables
let id = 0
let itemsList = []

// Classes 
const UNCHECK = "far"
const CHECK = "fas"
const LINE_THROUGH = "line-through"

// load list items
let data = localStorage.getItem("TODO")

if (data !== "[]") {
  console.log(itemsList);
  itemsList.splice(0, itemsList.length)
  console.log(itemsList);
  itemsList = JSON.parse(data)  
  id = itemsList.length
  loadList(itemsList)
} else {  
  id = 0
}
function loadList(itemsList) {
  itemsList.forEach(item => {
    addItemToList(item.text, item.id, item.done)
  });
}

function saveLocally() {
  localStorage.removeItem("TODO")
  localStorage.setItem("TODO", JSON.stringify(itemsList))
}
// Update date
const options = {
  weekday: "long",
  month: "short",
  day: "numeric"
}
const dateNow = new Date()
date.innerHTML = dateNow.toLocaleDateString("en-US", options)

// Delete all list items
clear.addEventListener("click", function () {
  while (list.firstChild) {
    list.firstChild.remove()
  }
  itemsList.splice(0, itemsList.length) // delete all items withing a list
  saveLocally()
  location.reload();
})

// Item add it to the list Array.
function addItemToList(toDo, idArg, done) {
  itemsList.push({
    text: toDo,
    id: idArg,
    done: false
  })
  
  // Toggel Check Icon
  let DONE = done ? CHECK : UNCHECK
  let LINE = done ? LINE_THROUGH : ""
  const item = `<li class="item">
  <i class="${DONE} fa-check-circle" job="complete" id="${id}"></i>
  <span class="text ${LINE}">${toDo}</span>
  <i class="fas fa-minus-circle delete" job="delete" id="${id}"></i>
  </li>`
  list.insertAdjacentHTML("beforeend", item)
}

// add Item by pressing Enter.
addItem.addEventListener("keyup", function (event) {
  if (event.keyCode == 13) {
    const toDo = input.value
    if (toDo) {
      addItemToList(toDo, id)
      saveLocally()
    }
    input.value = ""
  }
})

// Fire addItemToList function once the user add Item and Click on icon.
addButton.addEventListener("click", function () {
  const toDo = input.value
  if (toDo) {
    addItemToList(toDo, id)
    saveLocally()
  }
  input.value = ""
})

// Check item as complete
function toDoComplete(element) {
  // if class exist: remove, else: add
  element.classList.toggle(CHECK)
  element.classList.toggle(UNCHECK)
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH)
  // Update items list
  itemsList[element.id].done = itemsList[element.id].done ? false : true
  saveLocally()
}

// Remove item
function deleteItem(element) {
  element.parentNode.remove()
  itemsList.splice(element.id, 1) // Update item list
  saveLocally()
}

// Taget the element created dynamically
list.addEventListener("click", function (event) {
  const element = event.target // return the clicked element inside list
  const elementJob = element.attributes.job.value // a custom attributes
  
  if (elementJob === "complete") {
    toDoComplete(element)
  } else if (elementJob === "delete") {
    deleteItem(element)
  }
})