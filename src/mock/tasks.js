import {getRandomArrElement, getRandomNumber} from "../utlils.js";
import {COLORS} from "../const.js";

const descriptions = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`,
];

const generateRepeatingDays = function () {
  return {
    'mo': Math.random() > 0.5,
    'tu': Math.random() > 0.5,
    'we': Math.random() > 0.5,
    'th': Math.random() > 0.5,
    'fr': Math.random() > 0.5,
    'sa': Math.random() > 0.5,
    'su': Math.random() > 0.5,
  };
};

const getRandomDate = () => {
  const isDate = Math.random() > 0.5;
  if (!isDate) {
    return null;
  }
  const date = new Date();
  date.setDate(getRandomNumber(30));
  date.setHours(getRandomNumber(24));
  date.setMinutes(getRandomNumber(60));
  return date;
};

export const generateTask = () => {
  const date = getRandomDate();
  const repeatingDays = date === null
    ? generateRepeatingDays()
    : {
      mo: false,
      tu: false,
      we: false,
      th: false,
      fr: false,
      sa: false,
      su: false
    };
  return {
    description: getRandomArrElement(descriptions),
    color: getRandomArrElement(COLORS),
    date,
    isArchive: Math.random() > 0.5,
    isFavorites: Math.random() > 0.5,
    repeatingDays,
  };
};
