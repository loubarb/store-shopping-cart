import items from './items.json'
import formatCurrency from './util/formatCurrency.js'

const shoppingCartButton = document.querySelector('[data-cart-button]')
const shoppingCartContainer = document.querySelector('[data-cart-items-wrapper]')
const cartItemTemplate = document.querySelector('#cart-item-template')
const cartItemContainer = document.querySelector('[data-cart-items]')
let shoppingCart = []


export function setupShoppingCart() {

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