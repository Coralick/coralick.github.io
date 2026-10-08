const variants = {
  100: {
    label: '100 г',
    sku: '01306',
    oldPrice: 349.20,
    price: 326.40,
  },
  500: {
    label: '500 г',
    sku: '01307',
    oldPrice: 1646,
    price: 1432,
  },
  1000: {
    label: '1000 г',
    sku: '01308',
    oldPrice: 2592,
    price: 2064,
  },
  5000: {
    label: '5000 г',
    sku: '01309',
    oldPrice: 8710,
    price: 6320,
  },
};

const formatPrice = (value) => new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
  maximumFractionDigits: 2,
}).format(value);

const weightInputs = document.querySelectorAll('input[name="weight"]');
const selectedWeight = document.querySelector('#selected-weight');
const currentPrice = document.querySelector('#current-price');
const oldPrice = document.querySelector('#old-price');
const saving = document.querySelector('#saving');
const sku = document.querySelector('#sku');
const purchaseForm = document.querySelector('.purchase');
const toast = document.querySelector('.toast');
const toastCopy = document.querySelector('#toast-copy');
const cartCount = document.querySelector('.cart-link__count');
const favoriteButton = document.querySelector('.favorite-button');
const menuToggle = document.querySelector('.menu-toggle');
const primaryNav = document.querySelector('.primary-nav');

let activeVariant = variants[100];
let toastTimer;

const updateVariant = (value) => {
  activeVariant = variants[value];
  selectedWeight.textContent = activeVariant.label;
  currentPrice.textContent = formatPrice(activeVariant.price);
  oldPrice.textContent = formatPrice(activeVariant.oldPrice);
  saving.textContent = `Экономия ${formatPrice(activeVariant.oldPrice - activeVariant.price)}`;
  sku.textContent = activeVariant.sku;
};

weightInputs.forEach((input) => {
  input.addEventListener('change', (event) => updateVariant(event.target.value));
});

purchaseForm.addEventListener('submit', (event) => {
  event.preventDefault();
  toastCopy.textContent = `${activeVariant.label} · ${formatPrice(activeVariant.price)}`;
  cartCount.textContent = '1';
  document.querySelector('.cart-link').setAttribute('aria-label', 'Корзина, товаров: 1');
  toast.classList.add('is-visible');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 2800);
});

favoriteButton.addEventListener('click', () => {
  const isPressed = favoriteButton.getAttribute('aria-pressed') === 'true';
  favoriteButton.setAttribute('aria-pressed', String(!isPressed));
  favoriteButton.setAttribute('aria-label', isPressed ? 'Добавить в избранное' : 'Удалить из избранного');
});

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  primaryNav.classList.toggle('is-open', !isOpen);
});

primaryNav.addEventListener('click', (event) => {
  if (event.target.matches('a') && primaryNav.classList.contains('is-open')) {
    menuToggle.setAttribute('aria-expanded', 'false');
    primaryNav.classList.remove('is-open');
  }
});
