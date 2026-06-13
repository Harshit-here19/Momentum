// js/todos.js

import { save, load } from './storage.js';

export let todos = load('momentum_todos', []);

export function renderTodos() {
    const list = document.getElementById('todoList');

    list.innerHTML = '';

    todos.forEach((todo, index) => {
        const li = document.createElement('li');

        li.textContent = todo.text;

        li.onclick = () => {
            todos.splice(index, 1);

            save('momentum_todos', todos);

            renderTodos();
        };

        list.appendChild(li);
    });
}

export function addTodo(text) {
    todos.push({
        text,
        done: false
    });

    save('momentum_todos', todos);

    renderTodos();
}