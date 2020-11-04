import {humanizeTaskDueDate} from "../utlils.js";

export const createTaskTemplate = (task) => {
  let taskDate = ``;
  let taskTime = ``;

  const {color, description, isArchive, isFavorites, date, repeatingDays} = task;
  if (date !== null) {
    [taskDate, taskTime] = humanizeTaskDueDate(date);
  }
  const isDeadline = date !== null ? (date <= new Date()) : false;
  const isRepeat = Object.values(repeatingDays).some(Boolean);

  return (
    `<article class="card card--${color}${isDeadline ? ` card--deadline` : ``}${isRepeat ? ` card--repeat` : ``}">
      <div class="card__form">
        <div class="card__inner">
          <div class="card__control">
            <button type="button" class="card__btn card__btn--edit">
              edit
            </button>
            <button type="button" class="card__btn card__btn--archive${isArchive ? ` card__btn--disabled` : ``}">
              archive
            </button>
            <button
              type="button"
              class="card__btn card__btn--favorites${isFavorites ? ` card__btn--disabled` : ``}"
            >
              favorites
            </button>
          </div>

          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>

          <div class="card__textarea-wrap">
            <p class="card__text">${description}</p>
          </div>

          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <div class="card__date-deadline">
                  <p class="card__input-deadline-wrap">
                    <span class="card__date">${taskDate}</span>
                    <span class="card__time">${taskTime}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>`
  );
};


