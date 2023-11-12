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

    itemsFromStorage.push(item)
    
    // COnvert to JSON string and set to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage))
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

function onClickItem(e) {
    if (e.target.parentElement.classList.contains('remove-item')) {
        removeItem(e.target.parentElement.parentElement)           
    }
}

function removeItem(item) {
    if (confirm("Are you sure ?")) {
        // remove item from DOM
        item.remove()

        // Remove item from storage
        removeItemFromStorage(item.textContent)
        checkUI()
    }
}

function clearItem () {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild)
    }

    localStorage.removeItem('items')
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
    let itemFromStorage = getItemFromStorage()

    itemFromStorage = itemFromStorage.filter(i => i !== value)

    localStorage.setItem('items', JSON.stringify(itemFromStorage))
}

// Initialize app
function init() {
    // Event listeners
    itemForm.addEventListener('submit', onAddItemSubmit)
    itemList.addEventListener('click', onClickItem)
    clearBtn.addEventListener('click', clearItem)
    itemFilter.addEventListener('input', filterItem)
    document.addEventListener('DOMContentLoaded', diplayItemsFromStorage)
    
    checkUI()
}

init();