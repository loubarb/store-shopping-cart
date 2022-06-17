import items from './items.json'
import formatCurrency from './util/formatCurrency.js'

const shoppingCartButton = document.querySelector('[data-cart-button]')
const shoppingCartContainer = document.querySelector('[data-cart-items-wrapper]')
const cartItemTemplate = document.querySelector('#cart-item-template')
const cartItemContainer = document.querySelector('[data-cart-items]')
const cartItemQuantity = document.querySelector('[data-cart-quantity]')
const cartItemTotal = document.querySelector('[data-cart-total]')
let shoppingCart = []

export function setupShoppingCart() {
  renderCart()
}

shoppingCartButton.addEventListener('click', () => {
  shoppingCartContainer.classList.toggle('invisible')
})

export function addToCart(id) {
  const existingItem = shoppingCart.find(entry => entry.id === id)
  if (existingItem) {
    existingItem.quantity++
  } else {
    shoppingCart.push({ id: id, quantity: 1 })
  }
  renderCart()
}

function renderCart() {
  if (shoppingCart.length === 0) {
    shoppingCartContainer.classList.add('invisible')
  } else {
    renderCartItems()
  }
}

function renderCartItems() {
  
  const totalCents = shoppingCart.reduce((sum, entry) => {
    const item = items.find(i => entry.id === i.id)
    return sum + item.priceCents * entry.quantity
  }, 0)
  cartItemTotal.innerText = formatCurrency(totalCents / 100)

  const quantity = shoppingCart.map(i => {
    return i.quantity
  })
  const itemSum = quantity.reduce(function (x, y) {
    return x + y
  }, 0)

  cartItemQuantity.innerText = itemSum
  cartItemContainer.innerHTML = ''

  shoppingCart.forEach(entry => {
    const item = items.find(i => entry.id === i.id)
    const cartItem = cartItemTemplate.content.cloneNode(true)

    const container = cartItem.querySelector('[data-item]')
    container.dataset.itemId = item.id 
  
    const name = cartItem.querySelector('[data-name]')
    name.innerText = item.name
  
    const price = cartItem.querySelector('[data-price]')
    price.innerText = formatCurrency(item.priceCents * entry.quantity / 100)

    if (entry.quantity > 1){
      const quantity = cartItem.querySelector('[data-quantity]')
      quantity.innerText = `x${entry.quantity}`
    }
  
    const image = cartItem.querySelector('[data-image]')
    image.src = `https://dummyimage.com/210x130/${item.imageColor}/${item.imageColor}`
  
    cartItemContainer.appendChild(cartItem)
  })
}