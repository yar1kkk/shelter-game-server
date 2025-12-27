const getRandomUnique = (array, quantity = 2) => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, quantity);
};

module.exports = getRandomUnique;
