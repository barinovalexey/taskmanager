import {createSiteMenuTemplate} from "./components/site-menu.js";
import {generateFilters} from "./mock/filters.js";
import {createFilterTemplate} from "./components/filter.js";
import {createBoardTemplate} from "./components/board.js";
import {generateTask} from "./mock/tasks.js";
import {createTaskTemplate} from "./components/task.js";
import {createTaskEditTemplate} from "./components/task-edit.js";
import {createLoadMoreButtonTemplate} from "./components/more-button.js";
import {TASK_COUNT_SCREEN} from "./const.js";

const TASK_COUNT = 24;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, createSiteMenuTemplate());
render(siteMainElement, createFilterTemplate(generateFilters()));
render(siteMainElement, createBoardTemplate());

const boardElement = siteMainElement.querySelector(`.board`);
const taskListElement = boardElement.querySelector(`.board__tasks`);
const tasks = new Array(TASK_COUNT).fill().map(generateTask);

render(taskListElement, createTaskEditTemplate(tasks[0]));

for (const task of tasks.slice(1, TASK_COUNT_SCREEN + 1)) {
  render(taskListElement, createTaskTemplate(task));
}

let indexOfLastRendering = TASK_COUNT_SCREEN + 1;

render(boardElement, createLoadMoreButtonTemplate());

const moreButton = document.querySelector(`.load-more`);
const onClickMoreButton = () => {
  let lastIndex;
  if (indexOfLastRendering + TASK_COUNT_SCREEN >= tasks.length + 1) {
    lastIndex = tasks.length + 1;
    moreButton.remove();
  } else {
    lastIndex = indexOfLastRendering + TASK_COUNT_SCREEN;
  }
  for (const task of tasks.slice(indexOfLastRendering, lastIndex)) {
    render(taskListElement, createTaskTemplate(task));
  }
  indexOfLastRendering = lastIndex;
};


moreButton.addEventListener(`click`, onClickMoreButton);
