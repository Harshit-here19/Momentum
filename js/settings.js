import { save } from './storage.js';

export function initSettingsPanel(state, updateGreeting, updateClock, setBackground) {
    const panel = document.getElementById('settingsPanel');
    const btn = document.getElementById('settingsBtn');

    const nameInput = document.getElementById('settingsName');
    const toggle24h = document.getElementById('toggle24h');

    // OPEN/CLOSE PANEL
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        panel.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
    if (!panel.contains(e.target) && e.target !== btn) {
        panel.classList.remove('show');
    }
});

    panel.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            panel.classList.remove('show');
        }
    });

    // INIT VALUES
    nameInput.value = state.name;
    toggle24h.classList.toggle('active', state.use24h);

    // NAME
    nameInput.addEventListener('input', (e) => {
        state.name = e.target.value || 'friend';
        save('momentum_name', state.name);

        updateGreeting(state);
    });

    // 24H
    toggle24h.addEventListener('click', () => {
        state.use24h = !state.use24h;
        save('momentum_24h', state.use24h);

        toggle24h.classList.toggle('active', state.use24h);

        updateClock(state);
    });
}