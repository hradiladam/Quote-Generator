/*
Fetches and processes the quotes from a txt file.
 - Normalizes curly quotes to straight quotes
 - Splits the text into author and quote
 - Trims whitespace around the author and quote
 - Adds straight quotes if they are missing in txt
 - Adds a colon back to the author and filters lines without a colon
 - Returns an array of objects with .author and .quote properties
 - Filters away (ignores) lines that are missing a colon
 */

let selectionOfQuotes = [];

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

        selectionOfQuotes = normalizedData
            .split('\n') // Split data into lines
            .map(line => {  // Process each line

            // Only process lines that have a colon
            if (line.includes(':')) {
                let [author, quote] = line.split(':'); // Split line by the colon into 'author' and 'quote' 

                // Trim whitespaces
                author = author.trim();
                quote = quote.trim();

                // Add " if missing in the txt file
                quote = quote.startsWith('"') ? quote : `"${quote}`;
                quote = quote.endsWith('"') ? quote : `${quote}"`;

                author = `${author}:`; // Add colon back to 'author'

                return {author, quote}; // Return an array of objects with the author and the quote as properties
            }
            return null;

        }).filter(item => item !== null); // Skip the lines not including the original colon in the txt file   

        console.log(selectionOfQuotes);

    } catch (error) {
        console.error('There was a problem fetching data:', error);
    }
};

fetchData();



/*
Generates a random quote and displays it in the quote container
- Ensures the same quote doesn't appear consecutively
- Stored the quote from previous cycle for future use
*/

let lastQuote = null;
let previousQuote = null;

const generateQuote = () => {
    let randomNum;
    let newQuote;
    
    // Select a new quote and make sure it's not repeated
    do {
        randomNum = Math.floor(Math.random() * selectionOfQuotes.length);
        newQuote = selectionOfQuotes[randomNum];
    } while (newQuote === lastQuote);

    previousQuote = lastQuote; // Store the quote from previous cycle as previous quote

    // Display the selected quote in the display container element as 3 span elements (author, whitespace, quote)
    document.getElementById('quote-display').innerHTML = `
    <span class="author">${newQuote.author}</span>
    <span> </span>
    <span class="quote">${newQuote.quote}</span>
    `;

    lastQuote = newQuote // set last quote as the newest quote to prevent repeating
};

const generateQuoteButton = document.getElementById('generate-quote-button');
generateQuoteButton.addEventListener('click', generateQuote); // add a click event listener to the generate quote button


/*
Function that displays the previous quote in the quote display
- Goes only back one quote to the previous quote
*/

const showPreviosuQuote = () => {
    if (previousQuote) {
        
        document.getElementById('quote-display').innerHTML = `
        <span class="author">${previousQuote.author}</span>
        <span> </span>
        <span class="quote">${previousQuote.quote}</span>
        `;
    }
};

const previousQuoteButton = document.getElementById('previous-quote-button');
previousQuoteButton.addEventListener('click', showPreviosuQuote); 


/* 
Function to save a displayed quote to memory
*/
let savedQuotes =[];

const saveQuote = () => {
    const quoteDisplay = document.getElementById('quote-display');
    const author = quoteDisplay.querySelector('.author').textContent;
    const quote = quoteDisplay.querySelector('.quote').textContent;

    if (author && quote) {
        const savedQuote = { author, quote }; // Creates a new quote object to save

        const isDuplicate = savedQuotes.some((saved) => {
            return saved.author === savedQuote.author && saved.quote === savedQuote.quote;
        });

        if (isDuplicate) {
            alert('This quote has already been saved before.') // Checks for duplicate and alerts if one is found
        } else {
            savedQuotes.push(savedQuote); // Save the quote to the savedQuotesArray
            alert('The quote has been saved.');
        }
    }
}

const saveQuoteButton = document.getElementById('save-quote-button');
saveQuoteButton.addEventListener('click', saveQuote); // Add event listener for the save button


/*
Function that deletes saved quotes
*/

const deleteSavedQuotes = () => {
    if (savedQuotes.length > 0) {
        savedQuotes = [];
        alert('All saved quotes have been deleted.');
    } else {
        alert('There are no saved quotes to delete.');
    }
};


const deleteButton = document.getElementById('delete-saved-quotes-button');
deleteButton.addEventListener('click', deleteSavedQuotes);





/* 
Function that downloads saved quotes as a txt file 
THIS FUNCTION IS SOMETHING I HAVEN'T LEARN YET - USED CHATGPT FOR THIS FUNCTION
*/

const downloadSavedQuotes = () => {
    if (savedQuotes.length === 0) {
        alert('There are no saved quotes to download.');
        return; // Exits the function early if there are no quotes to download
    }

    let fileContent = savedQuotes.map(quote => `${quote.author} ${quote.quote}`).join('\n');  // Create the text content for the file

    const blob = new Blob([fileContent], { type: 'text/plain' }); // Create a Blob object with the file content

    // Create an anchor element to trigger the download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'saved-quotes.txt';  // Set the file name for the download

    link.click();  // Programmatically click the link to start the download
};

const downloadButton = document.getElementById('download-saved-quotes-button');
downloadButton.addEventListener('click', downloadSavedQuotes); // Add event listener for the download button



/*
Toggles between light and dark themes
*/

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