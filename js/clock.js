// js/clock.js

export function updateClock(state) {
    const now = new Date();

    let hours = now.getHours();
    const minutes = now.getMinutes();

    if (!state.use24h) {
        hours = hours % 12 || 12;
    }

    const time = `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}`;

    const clock = document.getElementById('clock');

    clock.style.opacity = 0.7;

    setTimeout(() => {
        clock.textContent = time;
        clock.style.opacity = 1;
    }, 150);
}