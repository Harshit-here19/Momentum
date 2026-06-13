// js/quotes.js

const quotes = [
    // Steve Jobs / modern motivation
    {
        text: 'The only way to do great work is to love what you do.',
        author: 'Steve Jobs'
    },
    {
        text: 'Stay hungry, stay foolish.',
        author: 'Steve Jobs'
    },

    // Nietzsche
    {
        text: 'He who has a why to live can bear almost any how.',
        author: 'Friedrich Nietzsche'
    },
    {
        text: 'That which does not kill us makes us stronger.',
        author: 'Friedrich Nietzsche'
    },

    // Dostoevsky
    {
        text: 'The mystery of human existence lies not in just staying alive, but in finding something to live for.',
        author: 'Fyodor Dostoevsky'
    },
    {
        text: 'Pain and suffering are always inevitable for a large intelligence and a deep heart.',
        author: 'Fyodor Dostoevsky'
    },
    {
        text: 'Above all, don’t lie to yourself.',
        author: 'Fyodor Dostoevsky'
    },

    // Marcus Aurelius (Stoicism)
    {
        text: 'You have power over your mind — not outside events. Realize this, and you will find strength.',
        author: 'Marcus Aurelius'
    },
    {
        text: 'The happiness of your life depends upon the quality of your thoughts.',
        author: 'Marcus Aurelius'
    },

    // Seneca
    {
        text: 'We suffer more often in imagination than in reality.',
        author: 'Seneca'
    },
    {
        text: 'Difficulties strengthen the mind, as labor does the body.',
        author: 'Seneca'
    },

    // Machiavelli – The Prince
    {
        text: 'It is better to be feared than loved, if you cannot be both.',
        author: 'Niccolò Machiavelli, The Prince'
    },
    {
        text: 'The first method for estimating the intelligence of a ruler is to look at the men he has around him.',
        author: 'Niccolò Machiavelli, The Prince'
    },

    // General philosophical / reflective
    {
        text: 'He who conquers himself is the mightiest warrior.',
        author: 'Confucius'
    },
    {
        text: 'Life is not what happens to you, but how you respond to it.',
        author: 'Epictetus'
    },
    {
        text: 'The unexamined life is not worth living.',
        author: 'Socrates'
    }
];

export function setDailyQuote() {
    const today = new Date().toDateString();

    let stored = localStorage.getItem('momentum_quote');

    let data = stored ? JSON.parse(stored) : null;

    if (!data || data.date !== today) {
        data = {
            date: today,
            quote: quotes[Math.floor(Math.random() * quotes.length)]
        };

        localStorage.setItem('momentum_quote', JSON.stringify(data));
    }

    document.getElementById('quoteText').textContent =
        `"${data.quote.text}"`;

    document.getElementById('quoteAuthor').textContent =
        `— ${data.quote.author}`;
}