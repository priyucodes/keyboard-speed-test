const API_URL = 'http://api.quotable.io/random';

const getRandomQuote = async () => {
  const response = await API_URL;
  const data = await response.json();
  console.log(data);
};

getRandomQuote();
