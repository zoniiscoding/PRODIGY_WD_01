// Quotes array
const quotes = [
  { text: "Be yourself; everyone else is already taken.", author: "Oscar Wilde" },
  { text: "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.", author: "Albert Einstein" },
  { text: "So many books, so little time.", author: "Frank Zappa" },
  { text: "A room without books is like a body without a soul.", author: "Marcus Tullius Cicero" },
  { text: "You only live once, but if you do it right, once is enough.", author: "Mae West" }
];

// DOM elements
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const newQuoteBtn = document.getElementById("new-quote");
const copyBtn = document.getElementById("copy-quote");
const downloadBtn = document.getElementById("download-quote");

// Generate new quote
function generateQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  quoteText.textContent = `"${quote.text}"`;
  authorText.textContent = `- ${quote.author}`;
}

// Copy quote to clipboard
function copyQuote() {
  const text = `${quoteText.textContent} ${authorText.textContent}`;
  navigator.clipboard.writeText(text).then(() => {
    alert("Quote copied to clipboard!");
  });
}

// Download quote as text file
function downloadQuote() {
  const text = `${quoteText.textContent} ${authorText.textContent}`;
  const blob = new Blob([text], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "quote.txt";
  link.click();
}

// Event listeners
newQuoteBtn.addEventListener("click", generateQuote);
copyBtn.addEventListener("click", copyQuote);
downloadBtn.addEventListener("click", downloadQuote);
