const itemForm = document.getElementById('item-form')
const itemInput = document.getElementById('item-input')
const itemList = document.getElementById('item-list')
const clearBtn = document.getElementById('clear')
const itemFilter = document.getElementById('filter')


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
    // Add item
    itemList.append(li)
    checkUI();
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
    if (item.tagName == 'I' && confirm("Are you sure ?")) {
        item.parentElement.parentElement.remove();           
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
// Event listeners
itemForm.addEventListener('submit', addItem)
itemList.addEventListener('click', deleteItem)
clearBtn.addEventListener('click', clearItem)
itemFilter.addEventListener('input', filterItem)

checkUI()