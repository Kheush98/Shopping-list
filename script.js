const itemForm = document.getElementById('item-form')
const itemInput = document.getElementById('item-input')
const itemList = document.getElementById('item-list')
const clearBtn = document.getElementById('clear')


function addItem (e) {
    e.preventDefault();
    const newItem = itemInput.value
    // Validate input
    if (newItem.trim() === '') {
        alert('Please add an item')
        return;
    }
    // Create list item
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(newItem))

    const button = createButton('remove-item btn-link text-red')
   
    li.appendChild(button)
    itemList.append(li)

    itemInput.value = ''
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
    if (item.tagName == 'I') {
        item.parentElement.parentElement.remove();
    }
}

function clearItem () {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild)
    }
}
// Event listeners
itemForm.addEventListener('submit', addItem)
itemList.addEventListener('click', deleteItem)
clearBtn.addEventListener('click', clearItem)