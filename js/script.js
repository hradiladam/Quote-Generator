// Array with selected quotes

let quoteSelection = [];


// importing data from a txt file

const fetchData = async () => {
    try {
        const response = await fetch('../assets/quoteSelection.txt');
        if (!response.ok) {
            throw new Error ('Response was not ok. Please check the file path.');
        }
        const data = await response.text();
        quoteSelection = data.split('\n');
        console.log(quoteSelection);
    } catch (error) {
        console.error('There was a problem fetching data:', error);
    }
}

fetchData();


// Random quote generator

let lastQuote

const generateQuote = () => {
    let randomNum;
    let newQuote;
    
    do {
        randomNum = Math.floor(Math.random() * quoteSelection.length);
        newQuote = quoteSelection[randomNum];
    } while (newQuote === lastQuote);

    const [author, quote] = newQuote.split(': ');

    document.getElementById('quote-display').innerHTML = `<span class="author">${author}</span>: <span class="quote">${quote}</span>`;
    lastQuote = newQuote
};


document.getElementById('generate-quote-button').addEventListener('click', generateQuote);