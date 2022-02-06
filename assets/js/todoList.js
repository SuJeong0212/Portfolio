'use strict';

const get = (target) => {
    return document.querySelector(target)
}

const items = document.querySelector('.todos')
const input = document.querySelector('.todo_input')
const addBtn = document.querySelector('.todo_submit_button')
const cancel = document.querySelector('.todo_remove_button')
const editBtn = document.querySelector('.todo_edit_confirm_button')

function onAdd() {
    // 1. 사용자가 입력한 텍스트를 받아온다.
    const text = input.value;
    if (text === '') {
        input.focus();
        return;
    }
    // 2. 새로운 아이템을 만든다. (텍스트 + 삭제 버튼)
    const item = createItem(text);
    // 3. items 컨테이너 안에 새로 만든 아이템을 추가
    items.appendChild(item);
    // 4. 새로 추가된 아이템으로 스크롤링 
    item.scrollIntoView({
        block: 'center',
        behavior: 'smooth'
    });
    // 5. addBtn을 누르면 inout을 초기화
    input.value = '';
    input.focus();
}

let id = 0; //UUID

function createItem(text) {
    const itemRow = document.createElement('div')
    itemRow.setAttribute('class', 'item')
    itemRow.setAttribute('data-id', id)
    itemRow.innerHTML = `
        <div class="content">
            <label>${text}</label>
            <input type="text" value="${text}">
        </div>
        <div class="item_buttons content_buttons">
            <button class="todo_edit_button">
                <i class="far fa-edit"></i>
            </button>
            <button class="todo_remove_button" data-id=${id}>
                <i class="far fa-trash-alt"></i>
            </button>
        </div>
        <div class="item_buttons edit_buttons">
            <button class="todo_edit_confirm_button">
                <i class="fas fa-check"></i>
            </button>
            <button class="todo_edit_cancel_button">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `
    id++;
    return itemRow;
}
addBtn.addEventListener('click', () => {
    onAdd();
})

input.addEventListener('keydown', event => {
    if(event.isComposing) {
      return;
    }
    if (event.key === 'Enter') {
      onAdd();
    }
  });

const removeTodo = (e) =>{
    if(e.target.className !== 'todo_remove_button') return
    const $item = e.target.closest('.item')
    const id = $item.dataset.id
    const toBeDeleted = document.querySelector(`.item[data-id="${id}"]`)
    
    toBeDeleted.remove();
}

const editTodo = (e) =>{
    if(e.target.className !== 'todo_edit_confirm_button') return
    const $item = e.target.closest('.item')
    let $label = $item.querySelector('label')
    const $editInput = $item.querySelector('input[type="text"]')
    let content = $editInput.value
    const $contentButtons = $item.querySelector('.content_buttons')
    const $editButtons = $item.querySelector('.edit_buttons')

    $label.innerText = String(content)
    $contentButtons.style.display = 'block'
    $editButtons.style.display = 'none'
}

const changeEditMode = (e) => {
    const $item = e.target.closest('.item')
    const $label = $item.querySelector('label')
    const $editInput = $item.querySelector('input[type="text"]')
    const $contentButtons = $item.querySelector('.content_buttons')
    const $editButtons = $item.querySelector('.edit_buttons')
    const value = $editInput.value

    if (e.target.className === 'todo_edit_button') {
        $label.style.display = 'none'
        $editInput.style.display = 'block'
        $contentButtons.style.display = 'none'
        $editButtons.style.display = 'block'
        $editInput.focus()
        $editInput.value = ''
        $editInput.value = value //커서가 맨앞으로 가게되는데 value를 변수로 만들어서 값을 없앳다가 다시 나타나게해서 커서를 맨뒤로 보냄
    }

    if (e.target.className === 'todo_edit_cancel_button') {
        $label.style.display = 'block'
        $editInput.style.display = 'none'
        $contentButtons.style.display = 'block'
        $editButtons.style.display = 'none'
        $editInput.value = $label.innerText
    }
}

const init = ()=>{
    items.addEventListener('click',changeEditMode)
    items.addEventListener('click',editTodo)
    items.addEventListener('click',removeTodo)
}
init()