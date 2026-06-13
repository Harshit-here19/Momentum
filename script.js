
// ==================== CONFIGURATION ====================
const backgrounds = {
    nature: [
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80',
        'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1920&q=80',
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=80',
        'https://images.unsplash.com/photo-1500534314263-a834e237e52c?w=1920&q=80',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80',
        'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&q=80',
        'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=1920&q=80',
        'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1920&q=80'
    ],
    dark: [
        'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&q=80',
        'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1920&q=80',
        'https://images.unsplash.com/photo-1444080748397-f442aa95c3e5?w=1920&q=80',
        'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1920&q=80'
    ],
    gradient: [],
    minimal: []
};

const gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
    'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)',
    'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
    'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
    'linear-gradient(135deg, #0c3483 0%, #a2b6df 100%)'
];

const minimalColors = [
    '#1a1a2e', '#16213e', '#0f3460', '#2c3333',
    '#1b262c', '#222831', '#393e46', '#2d4059',
    '#3a0088', '#1a1a40'
];

const quotes = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
    { text: "The purpose of our lives is to be happy.", author: "Dalai Lama" },
    { text: "Get busy living or get busy dying.", author: "Stephen King" },
    { text: "You only live once, but if you do it right, once is enough.", author: "Mae West" },
    { text: "Many of life's failures are people who did not realize how close they were to success when they gave up.", author: "Thomas Edison" },
    { text: "The mind is everything. What you think you become.", author: "Buddha" },
    { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
    { text: "An unexamined life is not worth living.", author: "Socrates" },
    { text: "Eighty percent of success is showing up.", author: "Woody Allen" },
    { text: "Your time is limited, so don't waste it living someone else's life.", author: "Steve Jobs" },
    { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "Everything you've ever wanted is on the other side of fear.", author: "George Addair" },
    { text: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { text: "Hardships often prepare ordinary people for an extraordinary destiny.", author: "C.S. Lewis" },
    { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
    { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
    { text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.", author: "Ralph Waldo Emerson" },
    { text: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein" },
    { text: "Happiness is not something ready made. It comes from your own actions.", author: "Dalai Lama" },
    { text: "It always seems impossible until it's done.", author: "Nelson Mandela" }
];

const weatherIcons = {
    'Clear': '☀️',
    'Clouds': '☁️',
    'Rain': '🌧️',
    'Drizzle': '🌦️',
    'Thunderstorm': '⛈️',
    'Snow': '❄️',
    'Mist': '🌫️',
    'Fog': '🌫️',
    'Haze': '🌫️',
    'Smoke': '🌫️',
    'Dust': '🌫️'
};

// ==================== STATE ====================
let state = {
    name: localStorage.getItem('momentum_name') || '',
    use24h: localStorage.getItem('momentum_24h') === 'true',
    focus: localStorage.getItem('momentum_focus') || '',
    focusComplete: localStorage.getItem('momentum_focusComplete') === 'true',
    todos: JSON.parse(localStorage.getItem('momentum_todos') || '[]'),
    links: JSON.parse(localStorage.getItem('momentum_links') || '[]'),
    bgTheme: localStorage.getItem('momentum_bgTheme') || 'nature',
    showWeather: localStorage.getItem('momentum_showWeather') !== 'false',
    showQuote: localStorage.getItem('momentum_showQuote') !== 'false',
    showSearch: localStorage.getItem('momentum_showSearch') !== 'false',
    lastQuoteDate: localStorage.getItem('momentum_lastQuoteDate') || '',
    lastQuoteIndex: parseInt(localStorage.getItem('momentum_lastQuoteIndex') || '0'),
    lastBgDate: localStorage.getItem('momentum_lastBgDate') || '',
    lastBgIndex: parseInt(localStorage.getItem('momentum_lastBgIndex') || '0'),
};

// ==================== INITIALIZATION ====================
function init() {
    updateClock();
    setTimeout(updateClock, 60000 - (Date.now() % 60000));
    setBackground();
    setGreeting();
    loadFocus();
    loadLinks();
    loadTodos();
    setDailyQuote();
    initWeather();
    initEventListeners();
    applySettings();
}

// ==================== CLOCK ====================
function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();

    if (!state.use24h) {
        hours = hours % 12 || 12;
    }

    const timeStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    document.getElementById('clock');

    clock.style.opacity = 0.7;

    setTimeout(() => {
        clock.textContent = timeStr;
        clock.style.opacity = 1;
    }, 150);
}

function toggleTimeFormat() {
    state.use24h = !state.use24h;
    localStorage.setItem('momentum_24h', state.use24h);
    updateClock();
    document.getElementById('formatText').textContent = state.use24h ? '12H' : '24H';
    const toggle = document.getElementById('toggle24h');
    toggle.classList.toggle('active', state.use24h);
}

function preloadImages(images) {
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// ==================== GREETING ====================
function setGreeting() {
    const hour = new Date().getHours();
    let greetText;

    if (hour < 12) greetText = 'Good morning';
    else if (hour < 17) greetText = 'Good afternoon';
    else if (hour < 21) greetText = 'Good evening';
    else greetText = 'Good night';

    const name = state.name || 'friend';
    document.getElementById('nameDisplay').textContent = name;
    document.getElementById('greeting').querySelector('#nameDisplay').previousSibling || null;

    const greetingEl = document.getElementById('greeting');
    greetingEl.innerHTML = `${greetText}, <span class="name" id="nameDisplay" onclick="editName()">${name}</span>.`;

    document.getElementById('greetingPrefix').textContent = `${greetText}, `;

    if (state.name) {
        document.getElementById('settingsName').value = state.name;
    }
}

function editName() {
    document.getElementById('greeting').style.display = 'none';
    document.getElementById('nameEditor').style.display = 'block';
    const input = document.getElementById('nameInput');
    input.value = state.name;
    input.focus();
}

function saveName(name) {
    state.name = name.trim();
    localStorage.setItem('momentum_name', state.name);
    document.getElementById('nameEditor').style.display = 'none';
    document.getElementById('greeting').style.display = 'block';
    setGreeting();
}

// ==================== BACKGROUND ====================
function setBackground() {
    const theme = state.bgTheme;
    const today = new Date().toDateString();

    if (theme === 'gradient') {
        const idx = Math.floor(Math.random() * gradients.length);
        document.body.style.backgroundImage = 'none';
        document.body.style.background = gradients[idx];
        document.getElementById('photoCredit').textContent = 'Gradient';
        return;
    }

    if (theme === 'minimal') {
        const idx = Math.floor(Math.random() * minimalColors.length);
        document.body.style.backgroundImage = 'none';
        document.body.style.background = minimalColors[idx];
        document.getElementById('photoCredit').textContent = '';
        return;
    }

    const bgList = backgrounds[theme] || backgrounds.nature;

    let idx;
    if (state.lastBgDate === today && state.lastBgIndex < bgList.length) {
        idx = state.lastBgIndex;
    } else {
        idx = Math.floor(Math.random() * bgList.length);
        state.lastBgDate = today;
        state.lastBgIndex = idx;
        localStorage.setItem('momentum_lastBgDate', today);
        localStorage.setItem('momentum_lastBgIndex', idx);
    }

    const img = new Image();
    img.onload = function () {
        document.body.style.backgroundImage = `url('${bgList[idx]}')`;
        document.body.style.background = '';
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
    };
    img.onerror = function () {
        // Fallback gradient
        document.body.style.background = gradients[0];
    };
    img.src = bgList[idx];
    document.getElementById('photoCredit').textContent = '📷 Unsplash';
}

function changeBackground() {
    state.bgTheme = document.getElementById('bgTheme').value;
    localStorage.setItem('momentum_bgTheme', state.bgTheme);
    // Force new background
    state.lastBgDate = '';
    localStorage.setItem('momentum_lastBgDate', '');
    setBackground();
}

// ==================== FOCUS ====================
function loadFocus() {
    // Check if it's a new day
    const today = new Date().toDateString();
    const lastFocusDate = localStorage.getItem('momentum_focusDate');

    if (lastFocusDate !== today) {
        state.focus = '';
        state.focusComplete = false;
        localStorage.removeItem('momentum_focus');
        localStorage.removeItem('momentum_focusComplete');
        localStorage.setItem('momentum_focusDate', today);
    }

    if (state.focus) {
        showFocusDisplay();
    }
}

function setFocus(text) {
    state.focus = text.trim();
    state.focusComplete = false;
    localStorage.setItem('momentum_focus', state.focus);
    localStorage.setItem('momentum_focusComplete', 'false');
    localStorage.setItem('momentum_focusDate', new Date().toDateString());
    showFocusDisplay();
}

function showFocusDisplay() {
    document.getElementById('focusQuestion').style.display = 'none';
    const display = document.getElementById('focusDisplay');
    display.classList.add('show');
    document.getElementById('focusText').textContent = state.focus;

    if (state.focusComplete) {
        document.getElementById('focusCheckbox').classList.add('checked');
        document.getElementById('focusText').classList.add('completed');
    } else {
        document.getElementById('focusCheckbox').classList.remove('checked');
        document.getElementById('focusText').classList.remove('completed');
    }
}

function toggleFocusComplete() {
    state.focusComplete = !state.focusComplete;
    localStorage.setItem('momentum_focusComplete', state.focusComplete);
    showFocusDisplay();
}

function editFocus() {
    document.getElementById('focusDisplay').classList.remove('show');
    document.getElementById('focusQuestion').style.display = 'block';
    const input = document.getElementById('focusInput');
    input.value = state.focus;
    input.focus();
}

function deleteFocus() {
    state.focus = '';
    state.focusComplete = false;
    localStorage.removeItem('momentum_focus');
    localStorage.removeItem('momentum_focusComplete');
    document.getElementById('focusDisplay').classList.remove('show');
    document.getElementById('focusQuestion').style.display = 'block';
    document.getElementById('focusInput').value = '';
}

// ==================== QUOTES ====================
function setDailyQuote() {
    const today = new Date().toDateString();
    let idx;

    if (state.lastQuoteDate === today) {
        idx = state.lastQuoteIndex;
    } else {
        idx = Math.floor(Math.random() * quotes.length);
        state.lastQuoteDate = today;
        state.lastQuoteIndex = idx;
        localStorage.setItem('momentum_lastQuoteDate', today);
        localStorage.setItem('momentum_lastQuoteIndex', idx);
    }

    displayQuote(idx);
}

function displayQuote(idx) {
    const quote = quotes[idx % quotes.length];
    document.getElementById('quoteText').textContent = `"${quote.text}"`;
    document.getElementById('quoteAuthor').textContent = `— ${quote.author}`;
}

function newQuote() {
    const idx = Math.floor(Math.random() * quotes.length);
    state.lastQuoteIndex = idx;
    localStorage.setItem('momentum_lastQuoteIndex', idx);
    displayQuote(idx);
}

// ==================== WEATHER ====================
function initWeather() {
    if (!state.showWeather) return;

    // Try to get cached weather first
    const cached = localStorage.getItem('momentum_weather');
    const cacheTime = localStorage.getItem('momentum_weatherTime');

    if (cached && cacheTime && (Date.now() - parseInt(cacheTime)) < 1800000) {
        displayWeather(JSON.parse(cached));
    }

    // Try geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (pos) => fetchWeather(pos.coords.latitude, pos.coords.longitude),
            () => fetchWeatherByCity('Gwalior')
        );
    } else {
        fetchWeatherByCity('Gwalior');
    }
}

function fetchWeather(lat, lon) {
    // Using a free weather API (wttr.in - no API key needed)
    fetch(`https://wttr.in/${lat},${lon}?format=j1`)
        .then(res => res.json())
        .then(data => {
            const current = data.current_condition[0];
            const weatherData = {
                temp: current.temp_F,
                tempC: current.temp_C,
                desc: current.weatherDesc[0].value,
                humidity: current.humidity,
                wind: current.windspeedMiles,
                feelsLike: current.FeelsLikeF,
                city: data.nearest_area[0].areaName[0].value,
                main: mapWeatherCondition(current.weatherDesc[0].value)
            };
            localStorage.setItem('momentum_weather', JSON.stringify(weatherData));
            localStorage.setItem('momentum_weatherTime', Date.now().toString());
            displayWeather(weatherData);
        })
        .catch(() => displayDefaultWeather());
}

function fetchWeatherByCity(city) {
    fetch(`https://wttr.in/${city}?format=j1`)
        .then(res => res.json())
        .then(data => {
            const current = data.current_condition[0];
            const weatherData = {
                temp: current.temp_F,
                tempC: current.temp_C,
                desc: current.weatherDesc[0].value,
                humidity: current.humidity,
                wind: current.windspeedMiles,
                feelsLike: current.FeelsLikeF,
                city: city,
                main: mapWeatherCondition(current.weatherDesc[0].value)
            };
            localStorage.setItem('momentum_weather', JSON.stringify(weatherData));
            localStorage.setItem('momentum_weatherTime', Date.now().toString());
            displayWeather(weatherData);
        })
        .catch(() => displayDefaultWeather());
}

function mapWeatherCondition(desc) {
    desc = desc.toLowerCase();
    if (desc.includes('clear') || desc.includes('sunny')) return 'Clear';
    if (desc.includes('cloud') || desc.includes('overcast')) return 'Clouds';
    if (desc.includes('rain') || desc.includes('shower')) return 'Rain';
    if (desc.includes('drizzle')) return 'Drizzle';
    if (desc.includes('thunder')) return 'Thunderstorm';
    if (desc.includes('snow') || desc.includes('blizzard')) return 'Snow';
    if (desc.includes('mist') || desc.includes('fog')) return 'Mist';
    return 'Clear';
}

function displayWeather(data) {
    document.getElementById('weatherIcon').textContent = weatherIcons[data.main] || '🌤️';
    document.getElementById('weatherTemp').textContent = `${data.temp}°F`;
    document.getElementById('weatherCity').textContent = data.city;
    document.getElementById('weatherDesc').textContent = data.desc;
    document.getElementById('weatherHumidity').textContent = `${data.humidity}%`;
    document.getElementById('weatherWind').textContent = `${data.wind} mph`;
    document.getElementById('weatherFeels').textContent = `${data.feelsLike}°F`;
}

function displayDefaultWeather() {
    document.getElementById('weatherIcon').textContent = '🌤️';
    document.getElementById('weatherTemp').textContent = '72°';
    document.getElementById('weatherCity').textContent = '';
}

function toggleWeatherDetails() {
    document.getElementById('weatherDetails').classList.toggle('show');
}

// ==================== LINKS ====================
function loadLinks() {
    renderLinks();
}

function renderLinks() {
    const container = document.getElementById('linksSection');
    container.innerHTML = '';

    state.links.forEach((link, idx) => {
        const a = document.createElement('a');
        a.href = link.url;
        a.className = 'link-item';
        a.textContent = link.name;
        a.target = '_blank';
        a.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            if (confirm(`Delete "${link.name}" link?`)) {
                state.links.splice(idx, 1);
                localStorage.setItem('momentum_links', JSON.stringify(state.links));
                renderLinks();
            }
        });
        container.appendChild(a);
    });

    const addBtn = document.createElement('button');
    addBtn.className = 'add-link';
    addBtn.textContent = '+';
    addBtn.onclick = openLinkModal;
    container.appendChild(addBtn);
}

function openLinkModal() {
    document.getElementById('linkModal').classList.add('show');
    document.getElementById('linkName').value = '';
    document.getElementById('linkUrl').value = '';
    document.getElementById('linkName').focus();
}

function closeLinkModal() {
    document.getElementById('linkModal').classList.remove('show');
}

function saveLink() {
    const name = document.getElementById('linkName').value.trim();
    let url = document.getElementById('linkUrl').value.trim();

    if (!name || !url) return;

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
    }

    state.links.push({ name, url });
    localStorage.setItem('momentum_links', JSON.stringify(state.links));
    renderLinks();
    closeLinkModal();
}

// ==================== TODOS ====================
function loadTodos() {
    renderTodos();
}

function renderTodos() {
    const list = document.getElementById('todoList');
    list.innerHTML = '';

    state.todos.forEach((todo, idx) => {
        const li = document.createElement('li');
        li.className = 'todo-item';

        const check = document.createElement('div');
        check.className = 'todo-item-check' + (todo.done ? ' checked' : '');
        check.onclick = () => {
            state.todos[idx].done = !state.todos[idx].done;
            localStorage.setItem('momentum_todos', JSON.stringify(state.todos));
            renderTodos();
        };

        const text = document.createElement('span');
        text.className = 'todo-item-text' + (todo.done ? ' completed' : '');
        text.textContent = todo.text;

        const del = document.createElement('button');
        del.className = 'todo-item-delete';
        del.textContent = '✕';
        del.onclick = () => {
            state.todos.splice(idx, 1);
            localStorage.setItem('momentum_todos', JSON.stringify(state.todos));
            renderTodos();
        };

        li.appendChild(check);
        li.appendChild(text);
        li.appendChild(del);
        list.appendChild(li);
    });
}

function addTodo(text) {
    if (!text.trim()) return;
    state.todos.push({ text: text.trim(), done: false });
    localStorage.setItem('momentum_todos', JSON.stringify(state.todos));
    renderTodos();
}

function toggleTodoPanel() {
    document.getElementById('todoPanel').classList.toggle('open');
    document.getElementById('settingsPanel').classList.remove('open');
}

// ==================== SEARCH ====================
function toggleSearch() {
    const container = document.getElementById('searchContainer');
    container.classList.toggle('show');
    if (container.classList.contains('show')) {
        document.getElementById('searchBox').focus();
    }
}

// ==================== SETTINGS ====================
function toggleSettings() {
    document.getElementById('settingsPanel').classList.toggle('open');
    document.getElementById('todoPanel').classList.remove('open');
}

function applySettings() {
    // Time format
    document.getElementById('toggle24h').classList.toggle('active', state.use24h);
    document.getElementById('formatText').textContent = state.use24h ? '12H' : '24H';

    // Background theme
    document.getElementById('bgTheme').value = state.bgTheme;

    // Visibility toggles
    document.getElementById('toggleWeather').classList.toggle('active', state.showWeather);
    document.getElementById('toggleQuote').classList.toggle('active', state.showQuote);
    document.getElementById('toggleSearchVis').classList.toggle('active', state.showSearch);

    if (!state.showWeather) document.getElementById('weather').style.display = 'none';
    if (!state.showQuote) document.querySelector('.quote-section').style.display = 'none';

    // Name
    if (state.name) {
        document.getElementById('settingsName').value = state.name;
    }
}

function toggleWeatherVisibility() {
    state.showWeather = !state.showWeather;
    localStorage.setItem('momentum_showWeather', state.showWeather);
    document.getElementById('toggleWeather').classList.toggle('active', state.showWeather);
    document.getElementById('weather').style.display = state.showWeather ? 'flex' : 'none';
    document.getElementById('weatherDetails').style.display = 'none';
}

function toggleQuoteVisibility() {
    state.showQuote = !state.showQuote;
    localStorage.setItem('momentum_showQuote', state.showQuote);
    document.getElementById('toggleQuote').classList.toggle('active', state.showQuote);
    document.querySelector('.quote-section').style.display = state.showQuote ? 'block' : 'none';
}

function toggleSearchVisibility() {
    state.showSearch = !state.showSearch;
    localStorage.setItem('momentum_showSearch', state.showSearch);
    document.getElementById('toggleSearchVis').classList.toggle('active', state.showSearch);
}

function resetAll() {
    if (confirm('Are you sure you want to reset all data? This cannot be undone.')) {
        const keys = Object.keys(localStorage).filter(k => k.startsWith('momentum_'));
        keys.forEach(k => localStorage.removeItem(k));
        location.reload();
    }
}

// ==================== EVENT LISTENERS ====================
function initEventListeners() {
    // Focus input
    document.getElementById('focusInput').addEventListener('keypress', function (e) {
        if (e.key === 'Enter' && this.value.trim()) {
            setFocus(this.value);
        }
    });

    // Name input
    document.getElementById('nameInput').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            saveName(this.value);
        }
    });

    document.getElementById('nameInput').addEventListener('blur', function () {
        saveName(this.value);
    });

    // Settings name
    document.getElementById('settingsName').addEventListener('change', function () {
        saveName(this.value);
    });

    document.getElementById('settingsName').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            saveName(this.value);
            this.blur();
        }
    });

    // Search
    document.getElementById('searchBox').addEventListener('keypress', function (e) {
        if (e.key === 'Enter' && this.value.trim()) {
            window.open(`https://www.google.com/search?q=${encodeURIComponent(this.value)}`, '_blank');
            this.value = '';
            document.getElementById('searchContainer').classList.remove('show');
        }
    });

    // Todo input
    document.getElementById('todoInput').addEventListener('keypress', function (e) {
        if (e.key === 'Enter' && this.value.trim()) {
            addTodo(this.value);
            this.value = '';
        }
    });

    // Link modal enter key
    document.getElementById('linkUrl').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') saveLink();
    });

    // Close modals/panels on escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            document.getElementById('searchContainer').classList.remove('show');
            document.getElementById('settingsPanel').classList.remove('open');
            document.getElementById('todoPanel').classList.remove('open');
            document.getElementById('linkModal').classList.remove('show');
            document.getElementById('weatherDetails').classList.remove('show');
        }

        // Ctrl/Cmd + K for search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            toggleSearch();
        }
    });

    // Click outside to close weather details
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.weather') && !e.target.closest('.weather-details')) {
            document.getElementById('weatherDetails').classList.remove('show');
        }
    });

    // Click outside modal to close
    document.getElementById('linkModal').addEventListener('click', function (e) {
        if (e.target === this) closeLinkModal();
    });
}

// ==================== START ====================
document.addEventListener('DOMContentLoaded', init);
