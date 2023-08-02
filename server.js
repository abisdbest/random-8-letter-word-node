const fs = require('fs');
const http = require('http');

const wordListFile = 'wordlist.txt'; // Path to the file containing the list of words, one word per line.
let words = [];
let wordOfTheDay = null;
let currentDay = -1;

// Function to read the word list from the file and store it in the 'words' array.
function readWordList() {
  try {
    const data = fs.readFileSync(wordListFile, 'utf8');
    words = data.trim().split('\n');
  } catch (error) {
    console.error('Error reading the word list file:', error);
  }
}

// Function to get a random word from the 'words' array.
function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}

// Function to update the word of the day.
function updateWordOfTheDay() {
  const currentDate = new Date().getDate();
  if (currentDay !== currentDate) {
    wordOfTheDay = getRandomWord();
    currentDay = currentDate;
  }
}

// Use the PORT environment variable provided by Render for port assignment.
const port = process.env.PORT || 3000;

http.createServer((req, res) => {
  if (req.method === 'GET') {
    readWordList();
    updateWordOfTheDay();

    // Set CORS headers to allow requests from any origin (for simplicity, update this for production use).
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    // Send the word of the day as the response.
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(wordOfTheDay);
  }
}).listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
