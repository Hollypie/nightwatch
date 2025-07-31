export async function renderRandomQuote(containerId = 'quote') {
  try {
    const response = await fetch('./json/quotes.json');
    if (!response.ok) {
      throw new Error('Failed to load quotes');
    }

    const quotes = await response.json();
    const random = quotes[Math.floor(Math.random() * quotes.length)];

    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = `
        <p>"${random.quote}"</p>
        <p><em>- ${random.author}</em></p>
      `;
    }
  } catch (error) {
    console.error('Error rendering quote:', error);
  }
}
