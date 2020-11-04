const createOneFilter = (name, count, isActive = false) => {
  return (
    `<input
        type="radio"
        id="filter__${name}"
        class="filter__input visually-hidden"
        name="filter"
        ${isActive ? `checked` : ``}
      />
      <label for="filter__${name}" class="filter__label">
        ${name} <span class="filter__${name}-count">${count}</span></label
      >`
  );
};

export const createFilterTemplate = (filters) => {
  const filterMarkup = filters.map((it, index) =>
    createOneFilter(it.name, it.count, !index)).join(`\n`);
  return (
    `<section class="main__filter filter container">
      ${filterMarkup}
    </section>`
  );
};
