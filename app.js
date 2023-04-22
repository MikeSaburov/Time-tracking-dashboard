async function getDashboardData(url = './data.json') {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

class DashboardItem {
  static PERIODS = {
    daily: 'day',
    weekly: 'week',
    monthly: 'month',
  };

  constructor(data, container = '.dashboard__content', view = 'daily') {
    this.data = data;
    this.container = document.querySelector(container);
    this.view = view;

    this.createMarkup();
  }

  createMarkup() {
    const { title, timeframes } = this.data;
    const id = title.toLocaleLowerCase().replace(/ /g, '-');
    const { current, previous } = timeframes[this.view.toLocaleLowerCase()];

    this.container.insertAdjacentHTML(
      'beforeend',
      `
        <div class="dashboard__item dashboard__item--${id}">
          <article class="tracking-card">
            <header class="tracking-card__header">
              <h4 class="tracking-card__title">${title}</h4>
              <img
                class="tracking-card__menu"
                src="images/icon-ellipsis.svg"
                alt="venu"
              />
            </header>
            <div class="tracking-card__body">
              <div class="tracking-card__time">${current}hrs</div>
              <div class="tracking-card__prev-period">Last ${DashboardItem.PERIODS.view} - ${previous}hrs</div>
            </div>
          </article>
        </div>
    `
    );

    this.time = this.container.querySelector(
      `.dashboard__item--${id} .tracking-card__time`
    );
    this.rev = this.container.querySelector(
      `.dashboard__item--${id} .tracking-card__prev-period`
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  getDashboardData().then((data) => {
    const activities = data.map((activity) => new DashboardItem(activity));
  });
});
