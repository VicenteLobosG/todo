import { Todo } from "../classes";
import { todoList } from '../index';

const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrarCompletados = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

export const crearTodoHtml = (todo) => {
    const htmlTodo = `
    <li class="${(todo.completado) ? 'completed' : ''}" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${(todo.completado) ? 'checked' : ''}>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    divTodoList.append(div.firstElementChild);

    return div.firstElementChild;
};

txtInput.addEventListener('keyup', (event) => {
    if (event.keyCode === 13 && txtInput.value.length > 0) {
        const nuevoTodo = new Todo(txtInput.value);
        todoList.nuevoTodo(nuevoTodo);
        crearTodoHtml(nuevoTodo);
        txtInput.value = '';
    }
});


divTodoList.addEventListener('click', (event) => {
    const nombreElemento = event.target.localName;
    const todoElemento = event.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id');
    
    if (nombreElemento.includes('input')) {
        todoList.toggleTodo(todoId);
        todoElemento.classList.toggle('completed');
    } else if (nombreElemento.includes('button')) {
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento);
    }
});

btnBorrarCompletados.addEventListener('click', () => {
    const childrenCompleted = divTodoList.querySelectorAll('.completed');
    [...childrenCompleted].forEach(child => divTodoList.removeChild(child));
    todoList.eliminarCompletados();
});


ulFiltros.addEventListener('click', (event) => {
    const filtro = event.target.innerText;
    if (!filtro) return;
    anchorFiltros.forEach(elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');

    if (filtro === 'Todos') {
        [...divTodoList.children].forEach(todo => todo.classList.remove('hidden'));
    } else if (filtro === 'Pendientes'){
        [...divTodoList.children].forEach(todo => todo.classList.contains('completed') ? todo.classList.add('hidden') : todo.classList.remove('hidden'));
    } else if (filtro === 'Completados') {
        [...divTodoList.children].forEach(todo => !todo.classList.contains('completed') ? todo.classList.add('hidden') : todo.classList.remove('hidden'));
    }
});