function setCartValues(cart) {
    let itemsTotal = 0;
    cart.map(item => {
        itemsTotal += +item.amount
    })
    cartItems.innerText = itemsTotal;
}

let setupAPP = function() {
    cart = Storage.getCart();
    this.setCartValues(cart);
}
class Storage {
    static getCart() {
        return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
    }
}
document.addEventListener('DOMContentLoaded', () => {
    setupAPP()
});