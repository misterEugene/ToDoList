const toDoListBody = document.querySelector('.todolist-body')
const [sortBtn, addBtn, clearBtn] = document.querySelectorAll('.button-js')

let sort = 'up'

let toDoList = []
class Item {
  constructor(text, done) {
    this.text = text
    this.done = done
    this.time = Date.now()
  }
}

const item = new Item('Hello, it is DoToList', false)
toDoList.push(item)

if (localStorage.getItem('arrToDoList')) {
  toDoList = JSON.parse(localStorage.getItem('arrToDoList'))
}

conclusionList(toDoList)
addMainBtnsEvents(sortBtn, addBtn, clearBtn)


function conclusionList(arrItems) {
  const list = document.querySelector('.list')
  list.classList.add('list')

  for (const item of arrItems) {
    const li = document.createElement('li')
    li.classList.add('item')
    li.dataset.time = item.time

    item.done ? li.classList.add('done') : undefined

    li.innerHTML = `
    <div class="item-text ${item.done ? 'text-done' : ''}"></div>
    <div class="item-buttons">
      <button class="edit" id="btn-js">
        <img src="img/svg/edit.svg" alt="edit" class="img-edit">
      </button>
      <button class="done" id="btn-js">
        <img src="img/svg/done.svg" alt="done" class="img-done">
      </button>
      <button class="delete" id="btn-js">
        <img src="img/svg/delete.svg" alt="delete" class="img-elete">
      </button>
    </div>
    `
    list.appendChild(li)

    const itemText = li.querySelector('.item-text')
    itemText.textContent = item.text
  }

  addItemBtnsEvents()
  localStorage.setItem('arrToDoList', JSON.stringify(toDoList))
}

function addMainBtnsEvents() {
  sortBtn.addEventListener('click', (event) => {
    sortList()
  })

  addBtn.addEventListener('click', (event) => {
    let text = prompt('Введите текст', '')

    if (!(text === '' || text === null)) {
      addItem(text, false)
    }
  })

  clearBtn.addEventListener('click', (event) => {
    toDoList.length = 0
    clearList()
  })
}

function addItemBtnsEvents() {
  const listItemBtns = document.querySelectorAll('#btn-js')
  listItemBtns.forEach((btn) => {
    const parentBtn = btn.closest('.item')
    const textItem = parentBtn.querySelector('.item-text')
    const indexItem = toDoList.findIndex(item => {
      return item.time === +parentBtn.dataset.time
    })

    if (btn.className === 'edit') {
      btn.addEventListener('click', () => {
        let newTextItem = prompt('Введите измениния', textItem.textContent)

        if (newTextItem) {
          toDoList[indexItem].text = newTextItem

          clearList()
          conclusionList(toDoList)
        } 
      })
    } else if (btn.className === 'done') {
      btn.addEventListener('click', (event) => {
        if (toDoList[indexItem].done) {
          textItem.classList.remove('text-done')
          toDoList[indexItem].done = false
        } else {
          textItem.classList.add('text-done')
          toDoList[indexItem].done = true;
        }
        localStorage.setItem('arrToDoList', JSON.stringify(toDoList))
      })
    } else if (btn.className === 'delete') {
      btn.addEventListener('click', () => {
        toDoList.splice(indexItem, 1)

        if (toDoList.length === 0) {

        }

        clearList()
        conclusionList(toDoList)
      })
    }
  })
}

function addItem(text, done) {
  const newItem = new Item(text, done)
  toDoList.push(newItem)

  clearList()
  conclusionList(toDoList)
}

function clearList() {
  toDoListBody.innerHTML = `
  <ul class="list">
  </ul>
  `

  localStorage.setItem('arrToDoList', JSON.stringify(toDoList))
}

function sortList() {
  if (sort === 'up') {
    toDoList.sort((a, b) => {
      if (a.time > b.time) return -1
      if (a.time < b.time) return 1
    })

    clearList()
    conclusionList(toDoList)

    sort = 'down'
  } else {
    toDoList.sort((a, b) => {
      if (a.time > b.time) return 1
      if (a.time < b.time) return -1
    })

    clearList()
    conclusionList(toDoList)

    sort = 'up'
  }
}
