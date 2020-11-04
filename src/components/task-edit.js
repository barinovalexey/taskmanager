import {COLORS} from "../const";
import {humanizeTaskDueDate} from "../utlils.js";

const isRepeating = (repeating) => {
  return Object.values(repeating).some(Boolean);
};

const createTaskEditDateTemplate = (dueDate) => {
  const [taskDate, taskTime] = humanizeTaskDueDate(dueDate);
  return `<button class="card__date-deadline-toggle" type="button">
      date: <span class="card__date-status">${dueDate !== null ? `yes` : `no`}</span>
    </button>
    ${dueDate !== null ? `<fieldset class="card__date-deadline">
      <label class="card__input-deadline-wrap">
        <input
          class="card__date"
          type="text"
          placeholder=""
          name="date"
          value="${taskDate} ${taskTime}"
        />
      </label>
    </fieldset>` : ``}
  `;
};

const createTaskEditRepeatingTemplate = (repeating) => {
  return `<button class="card__repeat-toggle" type="button">
    repeat:<span class="card__repeat-status">${isRepeating(repeating) ? `yes` : `no`}</span>
  </button>
  ${isRepeating(repeating) ? `<fieldset class="card__repeat-days">
    <div class="card__repeat-days-inner">
      ${Object.entries(repeating).map(([day, repeat]) => `<input
        class="visually-hidden card__repeat-day-input"
        type="checkbox"
        id="repeat-${day}"
        name="repeat"
        value="${day}"
        ${repeat ? `checked` : ``}
      />
      <label class="card__repeat-day" for="repeat-${day}"
        >${day}</label
      >`).join(``)}
    </div>
  </fieldset>` : ``}`;
};

const createTaskEditColorTemplate = (color) => {
  return (`
            <div class="card__colors-inner">
              <h3 class="card__colors-title">Color</h3>
              <div class="card__colors-wrap">
                ${COLORS.map((it) => `
                <input
                  type="radio"
                  id="color-${it}-4"
                  class="card__color-input card__color-input--${it} visually-hidden"
                  name="color"
                  value="${it}"
                  ${color === it ? `checked` : ``}
                />
                <label
                  for="color-${it}-4"
                  class="card__color card__color--${it}"
                  >${it}</label
                >`).join(`\n`)}
              </div>
            </div>`);
};

export const createTaskEditTemplate = (task) => {
  const {color, description, date, repeatingDays} = task;
  const isDeadline = date !== null ? (date <= new Date()) : false;
  const isRepeat = Object.values(repeatingDays).some(Boolean);

  return (
    `<article class="card card--edit card--${color}${isDeadline ? ` card--deadline` : ``}${isRepeat ? ` card--repeat` : ``}"">
      <form class="card__form" method="get">
        <div class="card__inner">
          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>

          <div class="card__textarea-wrap">
            <label>
              <textarea
                class="card__text"
                placeholder="Start typing your text here..."
                name="text"
              >${description}</textarea>
            </label>
          </div>

          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                ${createTaskEditDateTemplate(date)}
                ${createTaskEditRepeatingTemplate(repeatingDays)}
              </div>
            </div>
            ${createTaskEditColorTemplate(color)}
          </div>

          <div class="card__status-btns">
            <button class="card__save" type="submit">save</button>
            <button class="card__delete" type="button">delete</button>
          </div>
        </div>
      </form>
    </article>`
  );
};
