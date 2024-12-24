/*
Fetches and processes the quotes from a text file.
 - Normalizes curly quotes to straight quotes
 - Splits the text into author and quote
 - Trims whitespace around the author and quote
 - Adds straight quotes if they are missing in txt
 - Adds a colon back to the author
 - Returns an array of objects with author and quote properties
 - Filters away (ignores) lines that are missing a colon
*/

let quoteSelection = [];

const fetchData = async () => {
    try {
        // Fetch the quotes from the text file
        const response = await fetch('./assets/quotes.txt');
        if (!response.ok) {
            throw new Error ('Response was not ok. Please check the file path.');
        }
         
        let normalizedData = (await response.text())
            .replace(/[\u201C\u201D]/g, '"') // Normalize curly double quotes
            .replace(/[\u2018\u2019]/g, "'"); // Normalize curly single quotes
 
            quoteSelection = normalizedData
            .split('\n') // Split data into lines
            .map(line => {  // Process each line
            
            // Only process lines that have a colon
            if (line.includes(':')) {
                let [author, quote] = line.split(':'); // Split line by the colon into 'author' and 'quote' 
 
                // Trim whitespaces
                author = author.trim();
                quote = quote.trim();
 
                // Add " if missing in the text file
                quote = quote.startsWith('"') ? quote : `"${quote}`;
                quote = quote.endsWith('"') ? quote : `${quote}"`;
 
                author = `${author}:`; // Add colon back to 'author'
 
                return {author, quote}; // Return an array of objects with the author and the quote as properties
            }
            return null;
 
        }).filter(item => item !== null); // Skip the lines not initially including colon in the text file   
    
 
        console.log(quoteSelection);
 
    } catch (error) {
        console.error('There was a problem fetching data:', error);
    }
};
 
fetchData(); // Fetches data from the text file


let lastQuote = null;  // Stores the last displayed quote


//Updates the quote display container with the provided author and quote.
const updateQuoteDisplay = ({ author, quote }) => {
    document.getElementById('quote-display').innerHTML = `
        <span class="author">${author}</span>
        <span> </span>
        <span class="quote">${quote}</span>
    `;
};
updateQuoteDisplay


/*
Generates a random quote and displays it in the quote container.
 - Ensures the same quote doesn't appear consecutively.
*/

const generateQuote = () => {
    let randomNum;
    let newQuote;
    
    // Select a new quote and make sure it's not repeated
    do {
        randomNum = Math.floor(Math.random() * quoteSelection.length);
        newQuote = quoteSelection[randomNum];
    } while (newQuote === lastQuote);

    lastQuote = newQuote;  // Set the current quote as the last quote

    const { author, quote } = newQuote;
    updateQuoteDisplay({ author, quote });
};

// Add event listener for the "Generate Quote" button
const generateQuoteButton = document.getElementById('generate-quote-button');
generateQuoteButton.addEventListener('click', generateQuote);
