import {MONTHS} from "./const";

export const getRandomArrElement = (array) => {
  return array[getRandomNumber(array.length)];
};

export const getRandomNumber = (max) => {
  return Math.floor(Math.random() * max);
};

export const humanizeTaskDueDate = (date) => {
  const taskDate = `${date.getDate()} ${MONTHS[date.getMonth()]}`;
  const taskTime = `${date.getHours() < 10 ? `0` : ``}${date.getHours()}:${date.getMinutes() < 10 ? `0` : ``}${date.getMinutes()}`;
  return [taskDate, taskTime];
};

