const itemForm = document.getElementById('item-form')
const itemInput = document.getElementById('item-input')
const itemList = document.getElementById('item-list')
const clearBtn = document.getElementById('clear')
const itemFilter = document.getElementById('filter')


function onAddItemSubmit (e) {
    e.preventDefault();
    const newItem = itemInput.value
    // Validate input
    if (newItem.trim() === '') {
        alert('Please add an item')
        return;
    }
    

    // Add item to the DOM
    addItemInDOM(newItem);
    
    // Add item to the storage
    addItemInLocalStorage(newItem);
    checkUI();
    itemInput.value = ''
}

function addItemInDOM (item) {
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item))

    const button = createButton('remove-item btn-link text-red')
    
    li.appendChild(button)
    // Add item
    itemList.append(li)
}

function addItemInLocalStorage(item) {
    const itemsFromStorage = getItemFromStorage()

    itemLocalStorage.push(item)
    
    // COnvert to JSON string and set to local storage
    localStorage.setItem('items', JSON.stringify(itemLocalStorage))
}

function getItemFromStorage () {
    let itemLocalStorage;

    if (localStorage.getItem('items') === null) {
        itemLocalStorage = [];
    } else {
        itemLocalStorage = JSON.parse(localStorage.getItem('items'))
    }

    return itemLocalStorage
}

function createButton (className) {
    const button = document.createElement('button')
    button.className = className

    const icon = document.createElement('i')
    icon.className = 'fa-solid fa-xmark'

    button.appendChild(icon)

    return button;
}

function deleteItem (e) {
    const item = e.target
    if (item.tagName == 'I' && confirm("Are you sure ?")) {
        item.parentElement.parentElement.remove();
        removeItemFromStorage()           
        checkUI()
    }
}

function clearItem () {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild)
    }
    checkUI()
}

function checkUI () {
    const items = itemList.querySelectorAll('li');
    if (items.length === 0) {
        itemFilter.style.display = 'none'
        clearBtn.style.display = 'none'
    } else {
        itemFilter.style.display = 'block'
        clearBtn.style.display = 'block'
    }


}

function filterItem (e) {
    const items = itemList.querySelectorAll('li')
    const filterValue = e.target.value.toLowerCase() 

    items.forEach(item => {
        const itemName = item.firstChild.textContent.toLowerCase()

        if (!itemName.includes(filterValue)) {
            item.style.display = 'none'
        } else {
            item.style.display = 'flex'
        }
    })
}

function diplayItemsFromStorage () {
    const itemFromStorage = getItemFromStorage()

    itemFromStorage.forEach(item => {
        addItemInDOM(item)
    })
    checkUI()
}

function removeItemFromStorage(value) {
    const itemFromStorage = getItemFromStorage()

    itemFromStorage.forEach(item => {
        if (item === value) {
            
        }
    })
}

// Initialize app
function init() {
    // Event listeners
    itemForm.addEventListener('submit', onAddItemSubmit)
    itemList.addEventListener('click', deleteItem)
    clearBtn.addEventListener('click', clearItem)
    itemFilter.addEventListener('input', filterItem)
    document.addEventListener('DOMContentLoaded', diplayItemsFromStorage)
    
    checkUI()
}

init();