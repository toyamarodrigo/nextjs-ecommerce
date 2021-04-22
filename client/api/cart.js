import { toast } from 'react-toastify';
import { size, includes, remove } from 'lodash';
import { BASE_PATH, CART } from '../utils/constants';

export function getProductsCart() {
  const cart = localStorage.getItem(CART);

  if (!cart) {
    return null;
  } else {
    const products = cart.split(',');
    return products;
  }
}

export function addProductCart(product) {
  const cart = getProductsCart();
  if (!cart) {
    localStorage.setItem(CART, product);
    toast.success('Product added in cart');
  } else {
    const productFound = includes(cart, product);
    if (productFound) {
      toast.warning('Product already in cart');
    } else {
      cart.push(product);
      localStorage.setItem(CART, cart);
      toast.success('Product added successfuly');
    }
  }
}

export function countProductsCart() {
  const cart = getProductsCart();

  if (!cart) {
    return 0;
  } else {
    return size(cart);
  }
}
