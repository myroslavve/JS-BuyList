let products = [
  { name: 'Banana', amount: 2, bought: false, id: 1 },
  { name: 'Apple', amount: 1, bought: true, id: 2 },
  { name: 'Milk', amount: 1, bought: false, id: 3 },
];
let productElement;
let statisticsElement;

document.addEventListener('DOMContentLoaded', () => {
  productElement = document.querySelector('.product-item').cloneNode(true);
  productElement.querySelector('.product-item__name-input').disabled = false;
  productElement.querySelector('.product-item__controls-buy').textContent =
    'Bought';
  productElement.querySelector('.product-item__controls-buy').dataset.tooltip =
    'Buy this item';
  productElement.classList = 'product-item';

  statisticsElement = document
    .querySelector('.items-summary__item')
    .cloneNode(true);

  render();
});

const render = () => {
  const boughtList = document.querySelector('#bought-items');
  const notBoughtList = document.querySelector('#not-bought-items');
  const boughtStatistics = document.querySelector('#bought-statistics');
  const notBoughtStatistics = document.querySelector('#not-bought-statistics');
  boughtList.innerHTML = '';
  notBoughtList.innerHTML = '';
  boughtStatistics.innerHTML = '';
  notBoughtStatistics.innerHTML = '';

  products.forEach((product) => {
    const element = getProductElement(product);
    const statisticsElement = getStatisticsItem(product);
    if (product.bought) {
      boughtList.appendChild(element);
      boughtStatistics.appendChild(statisticsElement);
    } else {
      notBoughtList.appendChild(element);
      notBoughtStatistics.appendChild(statisticsElement);
    }
  });
};

const getProductElement = (product) => {
  const element = productElement.cloneNode(true);

  element.querySelector('.product-item__name-input').value = product.name;
  element.querySelector('.product-item__amount').textContent = product.amount;

  if (product.bought) {
    element.classList = 'product-item bought';
    element.querySelector('.product-item__name-input').disabled = true;
    element.querySelector('.product-item__controls-buy').textContent =
      'Not bought';
    element.querySelector('.product-item__controls-buy').dataset.tooltip =
      'Unbuy this item';
  }
  if (product.amount === 1) {
    element.querySelector('.product-item__amount-decrease').disabled = true;
  }

  element
    .querySelector('.product-item__controls-buy')
    .addEventListener('click', () => {
      toggleBought(product.id);
    });
  element
    .querySelector('.product-item__controls-remove')
    .addEventListener('click', () => {
      removeProduct(product.id);
    });
  element
    .querySelector('.product-item__amount-decrease')
    .addEventListener('click', () => {
      decreaseAmount(product.id);
    });
  element
    .querySelector('.product-item__amount-increase')
    .addEventListener('click', () => {
      increaseAmount(product.id);
    });
  element
    .querySelector('.product-item__name-input')
    .addEventListener('focusout', (event) => {
      if (event.target.value.trim() === '') {
        event.target.value = product.name;
        return;
      }
      product.name = event.target.value.trim();
      render();
    });

  return element;
};

const getStatisticsItem = (product) => {
  const element = statisticsElement.cloneNode(true);
  element.querySelector('.items-summary__item-name').textContent = product.name;
  element.querySelector('.items-summary__item-amount').textContent =
    product.amount;
  return element;
};

const addProduct = () => {
  const form = document.getElementById('add-product');
  const input = form.querySelector('input');

  if (input.value.trim() === '') {
    return;
  }

  const product = {
    name: input.value.trim(),
    amount: 1,
    bought: false,
    id: new Date().getTime(),
  };

  input.value = '';
  products.push(product);
  render();
};

const removeProduct = (id) => {
  products = products.filter((product) => product.id !== id);
  render();
};

const toggleBought = (id) => {
  const product = products.find((product) => product.id === id);
  product.bought = !product.bought;
  render();
};

const increaseAmount = (id) => {
  const product = products.find((product) => product.id === id);
  product.amount++;
  render();
};

const decreaseAmount = (id) => {
  const product = products.find((product) => product.id === id);
  if (product.amount > 1) {
    product.amount--;
  }
  render();
};
