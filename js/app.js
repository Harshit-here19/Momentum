// js/app.js

import { updateClock } from './clock.js';
import { loadBackgrounds, setBackground } from './background.js';
import { setDailyQuote } from './quotes.js';
import { initWeather } from './weather.js';
import { renderTodos, addTodo } from './todos.js';
import { initSettingsPanel } from './settings.js';
import { save, load } from './storage.js';

const state = {
    use24h: load('momentum_24h', false),
    bgTheme: load('momentum_bgTheme', 'nature'),
    name: load('momentum_name', 'friend')
};

function initNameModal(state) {
    const storedName = load('momentum_name', null);

    if (!storedName) {
        const modal = document.getElementById('nameModal');
        const input = document.getElementById('nameModalInput');
        const btn = document.getElementById('saveNameBtn');

        modal.classList.add('show');

        btn.addEventListener('click', () => {
            const name = input.value.trim() || 'friend';

            state.name = name;
            save('momentum_name', name);

            modal.classList.remove('show');

            updateGreeting(state);
        });
    }
}

function setFocusSearchMode(showSearch) {
    const searchContainer = document.getElementById('searchContainer');
    const focusQuestion = document.getElementById('focusQuestion');

    if (showSearch) {
        searchContainer.classList.add('show');
	searchContainer.style.display = 'block';
        focusQuestion.style.display = 'none';
    } else {
        searchContainer.classList.remove('show');
	searchContainer.style.display = 'none';
        focusQuestion.style.display = 'block';
    }

    localStorage.setItem(
        'momentum_searchFromFocus',
        String(showSearch)
    );
}

function restoreFocusSearchState() {
    const showSearch =
        localStorage.getItem('momentum_searchFromFocus') === 'true';

    setFocusSearchMode(showSearch);
}

async function init() {
    try {
        updateClock(state);
        initNameModal(state);

        updateGreeting(state);
        restoreFocusSearchState();

        setInterval(() => {
            updateClock(state);
        }, 60000);

        await Promise.all([
            loadBackgrounds(),
            initWeather()
        ]);

        setBackground(state);
        setDailyQuote();

        renderTodos();
        initSettingsPanel(state, updateGreeting, updateClock, setBackground);
        initListeners();

    } catch (err) {
        console.error('Initialization failed:', err);
    }
}

function initListeners() {
    document
        .getElementById('todoInput')
        .addEventListener('keypress', e => {
            if (e.key === 'Enter') {

                const text = e.target.value.trim();

                if (!text) return;

                addTodo(text);

                e.target.value = '';
            }
        });
}

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        toggleTodoPanel(false);
    }
});

function updateGreeting(state) {
    const hour = new Date().getHours();

    let timeOfDay = 'Hello';

    if (hour < 12) timeOfDay = 'Good morning';
    else if (hour < 18) timeOfDay = 'Good afternoon';
    else timeOfDay = 'Good evening';

    document.getElementById('greeting').innerHTML =
        `${timeOfDay}, <span class="name" id="nameDisplay" onclick="editName()">${state.name}</span>.`;
}

window.toggleTodoPanel = () => {
    document.getElementById('todoPanel').classList.toggle('open');
    document.getElementById('settingsPanel').classList.remove('open');
}

window.openSearchFromFocus = (e) => {
    e?.stopPropagation?.();

    const searchVisible =
        document.getElementById('searchContainer')
            .classList.contains('show');

    setFocusSearchMode(!searchVisible);

    if (!searchVisible) {
        document.getElementById('searchBox')?.focus();
    }
};

// Function to handle the Google search event
window.handleSearch = (event) => {
    // Check if the user pressed the "Enter" key
    if (event.key === 'Enter') {
        const query = event.target.value.trim();
        
        // Only search if the user actually typed something
        if (query !== "") {
            // Encode the query to handle spaces and special characters safely
            const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
            
            // Open the search results in a new browser tab
            window.open(googleSearchUrl, '_blank');
            
            // Optional: Clear the search box after searching
            event.target.value = '';
            event.target.blur(); // Remove focus from the input box
        }
    }
}

document.addEventListener('DOMContentLoaded', init);

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js")
            .then(() => console.log("SW registered"))
            .catch(err => console.log("SW failed", err));
    });
}