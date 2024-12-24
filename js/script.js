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
let previousQuote = null;  // Stores the previous quote


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

    previousQuote = lastQuote; // Store the current last quote as the previous quote
    lastQuote = newQuote;  // Set the current quote as the last quote

    const { author, quote } = newQuote;
    updateQuoteDisplay({ author, quote });
};

// Add event listener for the "Generate Quote" button
const generateQuoteButton = document.getElementById('generate-quote-button');
generateQuoteButton.addEventListener('click', generateQuote);


// Displays the previous quote.
const showPreviousQuote = () => {
    if (previousQuote) {
        const { author, quote } = previousQuote;
        updateQuoteDisplay({ author, quote });
    }
};

// Add event listener for the "Previous Quote" button
const previousQuoteButton = document.getElementById('previous-quote-button');
previousQuoteButton.addEventListener('click', showPreviousQuote);


// Function to save a displayed quote to memory
let savedQuotes = [];

const saveQuote = () => {
    const quoteDisplay = document.getElementById('quote-display');
    const author = quoteDisplay.querySelector('.author').textContent;
    const quote = quoteDisplay.querySelector('.quote').textContent;

    if (author && quote) {
        const savedQuote = { author, quote } // Creates a new object to save

        const isDuplicate = savedQuotes.some((saved) => {
            return saved.author === savedQuote.author && saved.quote === savedQuote.quote;
        });

        // Checks for duplicate and alerts if one is found
        if (isDuplicate) {
            alert('This quote has already been saved before.') 
        } else {
            savedQuotes.push(savedQuote); // Save the quote to the savedQuotesArray
            alert('The quote has been saved.');
        }
    };
};

const saveQuoteButton = document.getElementById('save-quote-button');
saveQuoteButton.addEventListener('click', saveQuote); // Add event listener for the save button


// Function to delete saved quotes
const deleteSavedQuotes = () => {
    if (savedQuotes.length > 0) {
        savedQuotes = [];
        (alert('All saved quotes have been deleted.'));
    } else {
        alert('There are no saved quotes to delete.');
    }
};

const deleteButton = document.getElementById('delete-saved-quotes-button');
deleteButton.addEventListener('click', deleteSavedQuotes);

// Toggles between light and dark themes
const switchTheme = () => {
    const body = document.body;
    const themeSwitchButton = document.querySelector('#theme-switch');  // Get the theme switch button

    body.classList.toggle('dark-theme')
    // Add and remove the dark-theme class to and from the body
    if (body.classList.contains('dark-theme')) {
        themeSwitchButton.innerHTML = '<i class="fa-regular fa-sun"></i>';
    } else {
        themeSwitchButton.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
};

const themeSwitchButton = document.getElementById('theme-switch');
themeSwitchButton.addEventListener('click', switchTheme); // Add a change event listener to the theme-switch
