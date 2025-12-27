const abilities = require("../data/character/abilities");
const info = require("../data/character/info");
const items = require("../data/character/items");
const phobias = require("../data/character/phobias");
const personality = require("../data/character/personality");
const hobbies = require("../data/character/hobbies");
const health = require("../data/character/health");
const bodies = require("../data/character/bodies");

const getRandomArrayValue = require("../utils/getRandomArrayValue");

const generatePlayersStats = (playersIds) => {
  const getHealth = () => {
    if (Math.random() < 0.3) {
      return "Здоровий";
    } else {
      return getRandomArrayValue(health);
    }
  };

  return playersIds.map((playerId) => {
    return {
      id: playerId,
      sex: {
        value:
          getRandomArrayValue(["чоловік", "Жінка"]) +
          `(Вік: ${Math.floor(Math.random() * 101)})`,
        visible: false,
      },
      bodyType: {
        value:
          getRandomArrayValue(bodies) +
          `(Ріст: ${Math.floor(Math.random() * 201)})` +
          `(Раса: ${getRandomArrayValue([
            "білий",
            "чорний",
            "азіат",
            "москаль",
          ])})`,
        visible: false,
      },
      health: { value: getHealth(), visible: false },
      hobby: {
        value:
          getRandomArrayValue(hobbies) +
          `(${getRandomArrayValue([
            "Новачок",
            "Аматор",
            "Досвідчений",
            "Професіонал",
            "Майстер",
          ])})`,
        visible: false,
      },
      personality: { value: getRandomArrayValue(personality), visible: false },
      phobia: { value: getRandomArrayValue(phobias), visible: false },
      item: { value: getRandomArrayValue(items), visible: false },
      info: { value: getRandomArrayValue(info), visible: false },
      isChildFree: {
        value: getRandomArrayValue(["так", "ні"]),
        visible: false,
      },
      ability1: { value: getRandomArrayValue(abilities), visible: false },
      ability2: { value: getRandomArrayValue(abilities), visible: false },
    };
  });
};

module.exports = generatePlayersStats;
