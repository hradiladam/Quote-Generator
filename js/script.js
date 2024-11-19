let selectionOfQuotes = [];

/*
Prepares import of quotes from a txt file,
normalizes curly quotes into straight quotes,
filteres away lines that initially do not include a colon,
splits the text into author and quote, 
trims whitespaces around author and quote,
adds the colon (:) back to author,  
*/

const fetchData = async () => {
    try {
        const response = await fetch('../assets/quotes.txt');
        if (!response.ok) {
            throw new Error ('Response was not ok. Please check the file path.');
        }

        const data = await response.text();
        const normalizedData = data.replace(/[\u2018\u2019\u201C\u201D]/g, '"');

        selectionOfQuotes = normalizedData.split('\n').map((line) => {

            if (line.includes(':')) {
                let [author, quote] = line.split(':');

                author = author.trim();
                quote = quote.trim();

                if (!quote.startsWith('"')) {
                    quote = `"${quote}`;
                }
                if (!quote.endsWith('"')) {
                    quote = `${quote}"`;
                }

                author = `${author}:`; 
                return {author, quote};
            }
            return null;

        }).filter((item) => item !== null); 

        console.log(selectionOfQuotes);

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
        randomNum = Math.floor(Math.random() * selectionOfQuotes.length);
        newQuote = selectionOfQuotes[randomNum];
    } while (newQuote === lastQuote);

    document.getElementById('quote-display').innerHTML = `<span class="author">${newQuote.author}</span> <span class="quote">${newQuote.quote}</span>`;
    lastQuote = newQuote
};


document.getElementById('generate-quote-button').addEventListener('click', generateQuote);