const quoteSelection = [
    "Richard Feynman (Physicist): “The first principle is that you must not fool yourself, and you are the easiest person to fool.”",
    "Maya Angelou (Poet and Activist): “Do the best you can until you know better. Then when you know better, do better.”",
    "Socrates (Philosopher): “The only true wisdom is in knowing you know nothing.”",
    "Oscar Wilde (Playwright and Poet): “Be yourself; everyone else is already taken.”",
    "Heraclitus (Philosopher): “No man ever steps in the same river twice, for it's not the same river and he's not the same man.”",
    "Richard Feynman (Physicist): “I would rather have questions that can't be answered than answers that can't be questioned.”",
    "Neil Degrasse Tyson (Astrophysicist): “We are stardust brought to life, then empowered by the universe to figure itself out — and we have only just begun.”",
    "George Bernard Shaw (Playwright): “Life isn't about finding yourself. Life is about creating yourself.”",
    "Rober Downey Jr. (Actor): 'Listen, smile, agree and then do whatever the fuck you were going to do anyway.'",
    "Isaac Asimov (Writer and Biochemist): “The saddest aspect of life right now is that science gathers knowledge faster than society gathers wisdom.”",
    "Leonardo da Vinci (Polymath): “Simplicity is the ultimate sophistication.”",
    "Voltaire (Philosopher): “Judge a man by his questions rather than his answers.”",
    "James Baldwin (Writer and Activist): “Not everything that is faced can be changed, but nothing can be changed until it is faced.”"
];


/*
Generates a random quote and displays it in the quote container.
 - Ensures the same quote doesn't appear consecutively.
*/

let lastQuote = null;

// Select a new quote and make sure it's not repeated
const generateQuote = () => {
    let randomNum;
    let newQuote;

    do {
        randomNum = Math.floor(Math.random() * quoteSelection.length);
        newQuote = quoteSelection[randomNum];
    } while (newQuote === lastQuote);

    const [author, quote] = newQuote.split(": ");

    document.getElementById('quote-display').innerHTML = 
    `<span class="author">${author}: </span><span class="quote">${quote}</span>`;

    lastQuote = newQuote;  // Set the current quote as the last quote
};

// Add event listener for the "Generate Quote" button
const generateQuoteButton = document.getElementById('generate-quote-button');
generateQuoteButton.addEventListener('click', generateQuote); 