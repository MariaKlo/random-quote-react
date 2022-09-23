/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons';
import COLORS_ARRAY from './colorsArray';
import './App.scss';

let quoteDBURL = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

function App() {
    const [quote, setQuote] = useState("Life is 10% what happens to me and 90% of how I react to it.");
    const [author, setAuthor] = useState("Charles Swindoll");
    const [randomNumber, setRandomNumber] = useState(0);
    const [quotesArray, setQuotesArray] = useState(null);
    const [accentColor, setAccentColor] = useState('#282c34');

    const fetchQuotes = async (url) => {
        const response = await fetch(url);
        const parsedJson = await response.json();
        setQuotesArray(parsedJson.quotes);
    }

    useEffect(() => {
        fetchQuotes(quoteDBURL);
    }, [quoteDBURL]);

    const getRandomQuote = () => {
        let randomInteger = Math.floor(quotesArray.length * Math.random());
        setRandomNumber(randomInteger);
        setAccentColor(COLORS_ARRAY[randomInteger]);
        setQuote(quotesArray[randomInteger].quote)
        setAuthor(quotesArray[randomInteger].author)
    }

    return (
        <div className="App">
            <header className="App-header" style={{backgroundColor: accentColor}}>
                <div id="quote-box" style={{color: accentColor}}>
                    <h1>Random Quote</h1>
                    <p id="text"><FontAwesomeIcon icon={faQuoteLeft}/> {quote} <FontAwesomeIcon icon={faQuoteRight}/></p>
                    <p id="author">- {author}</p>
                    <div className="button">
                        <a 
                        href={encodeURI(`http://www.twitter.com/intent/tweet?text=${quote} -${author}`)} 
                        id="tweet-quote" 
                        style={{backgroundColor: accentColor}}>
                        <FontAwesomeIcon icon={faTwitter}/>
                        </a>
                        <button 
                        id="new-quote" 
                        onClick={() => getRandomQuote()}
                        style={{backgroundColor: accentColor}}>Generate a Random Quote</button>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default App;