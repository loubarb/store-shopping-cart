import items from './items.json'
import { addToCart } from './shoppingCart'
import formatCurrency from './util/formatCurrency.js'
import addGlobalEventListener from './util/eventListener.js'

const storeItemTemplate = document.querySelector('#store-item-template')
const storeItemContainer = document.querySelector('[data-store-container]')

export function setupStore() {
  if (storeItemContainer == null) return
  
  addGlobalEventListener('click', '[data-add-to-cart-button]', (e) => {
    const id = e.target.closest('[data-store-item]').dataset.itemId
    addToCart(parseInt(id))
  })
  items.forEach(renderStoreItem)
}

function renderStoreItem(item) {
  const storeItem = storeItemTemplate.content.cloneNode(true)

  const container = storeItem.querySelector('[data-store-item]')
  container.dataset.itemId = item.id 

  const name = storeItem.querySelector('[data-name]')
  name.innerText = item.name

  const category = storeItem.querySelector('[data-category]')
  category.innerText = item.category

  const price = storeItem.querySelector('[data-price]')
  price.innerText = formatCurrency(item.priceCents / 100)

  const image = storeItem.querySelector('[data-image]')
  image.src = `https://dummyimage.com/420x260/${item.imageColor}/${item.imageColor}`

  storeItemContainer.appendChild(storeItem)
}