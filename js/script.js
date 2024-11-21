/*
Fetches and processes the quotes from a txt file.
 - normalizes curly quotes to straight quotes
 - splits the text into author and quote
 - trims whitespace around the author and quote
 - adds straight quotes if they are missing in txt
 - adds a colon back to the author and filters lines without a colon
 - returns an array of objects with .author and .quote properties
 - filters away (ignores) lines that are missing a colon
 */

let selectionOfQuotes = [];

const fetchData = async () => {
    try {
        // fetch the quotes from the text file
        const response = await fetch('../assets/quotes.txt');
        if (!response.ok) {
            throw new Error ('Response was not ok. Please check the file path.');
        }
        
        let normalizedData = (await response.text())
            .replace(/[\u201C\u201D]/g, '"'); // normalize curly double quotes
            .replace(/[\u2018\u2019]/g, "'"); // normalize curly single quotes

        selectionOfQuotes = normalizedData.split('\n').map(line => { // split data into lines and process each line

            // only process lines that have a colon
            if (line.includes(':')) {
                let [author, quote] = line.split(':'); // split line by the colon into 'author' and 'quote' 

                // trim whitespaces
                author = author.trim();
                quote = quote.trim();

                // add " if missing in the txt file
                quote = quote.startsWith('"') ? quote : `"${quote}`;
                quote = quote.endsWith('"') ? quote : `${quote}"`;

                author = `${author}:`; // add colon back to 'author'

                return {author, quote}; // return an array of objects with the author and the quote as properties
            }
            return null;

        }).filter(item => item !== null); // skip the lines not including the original colon in the txt file   

        console.log(selectionOfQuotes);

    } catch (error) {
        console.error('There was a problem fetching data:', error);
    }
};

fetchData();



/*
generates a random quote and displays it in the quote container
- ensures the same quote doesn't appear consecutively
*/
 

let lastQuote;

const generateQuote = () => {
    let randomNum;
    let newQuote;
    
    // select a new quote and make sure it's not repeated
    do {
        randomNum = Math.floor(Math.random() * selectionOfQuotes.length);
        newQuote = selectionOfQuotes[randomNum];
    } while (newQuote === lastQuote);

    // display the selected quote in the display container element as 3 span elements (author, whitespace, quote)
    document.getElementById('quote-display').innerHTML = `
    <span class="author">${newQuote.author}</span>
    <span> </span>
    <span class="quote">${newQuote.quote}</span>
    `;

    lastQuote = newQuote // set last quote as the newest quote to prevent repeating
};

document.getElementById('generate-quote-button').addEventListener('click', generateQuote); // add a click event listener to the generate quote button


/*
toggles between light and dark themes
*/

const switchTheme = () => {
    const body = document.body;
    const themeSwitchCheckbox = document.querySelector('#theme-switch input');  // get the theme switch checkbox

    // add and remove the dark-theme class to and from the body
    if (themeSwitchCheckbox.checked ) {
        body.classList.add('dark-theme');
    } else {
        body.classList.remove('dark-theme');
    }
};

document.getElementById('theme-switch').addEventListener('change', switchTheme); // add a change event listener to the switch-theme toggle checkbox