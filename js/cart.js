//variables
const cover = document.querySelector('.cover');
const navOptions = document.querySelector('.nav-options');
const itemTotal = document.querySelector('.item-total');
const cartCheckoutBtn = document.querySelector('.cart-checkout-btn');
const checkoutBtn = document.querySelector('.btn-checkout');
const printCartItems = document.querySelector('.cart-container');
const clearCartBtn = document.querySelector('.clear-cart-btn');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const cartContent = document.querySelector('.cart-content');
const backBtn = document.querySelector('.back');
const inputSearch = document.querySelector('.searchbar');
const searchedProducts = document.querySelector('.searchedproducts');
const QVCloseBtn = document.querySelector('.quickview-close-btn');
const selectedImg = document.querySelector('.qv-product-main-img');
const quickViewDOM = document.querySelector('.product-quick-view-wrapper');
const QVProductDOM = document.querySelector('.quickview-product');
const cartBtnDOM = document.querySelector('.cart-btn-wrapper');
const groceryFlyoutBtn = document.querySelector('#grocery');
const groceryFlyout = document.querySelector('.grocery-flyout');
const navWrapper = document.querySelector(".nav-wrapper");
const emptyCartDOM = document.querySelector(".empty-cart-content");
//getting the products
class Products {
    async getProducts() {
        try {
            let result = await fetch("/products.json")
            let data = await result.json();

            let products = data.items;
            products = products.map(item => {
                const { title, description, minimage, type, price } = item.fields;
                const { id } = item.sys;
                const image = item.fields.image.fields.file.url;
                return { title, price, id, image, minimage, type, description }
            });
            return products;
        } catch (error) {
            console.log(error);
        }
    }
}
//cart
let cart = [];


//display products
class UI {
    getBagButtons() {
        const buttons = [...document.querySelectorAll('.cart-btn')];
        buttonsDOM = buttons;
        buttons.forEach(button => {
            let id = button.dataset.id;
            let inCart = cart.find(item => item.id === id);
            if (inCart) {
                button.innerText = "inCart";
                button.disabled = true;
            }
            button.addEventListener('click', (event) => {
                event.target.innerText = 'In Cart';
                event.target.disabled = true;
                //getting product from products
                let cartItem = {...Storage.getProduct(id), amount: 1 };
                //add product to cart
                cart = [...cart, cartItem];
                //save cart in localstorage
                Storage.saveCart(cart);
                //set cart values
                this.setCartValues(cart);
                //display cart items
                this.addCartItem(cartItem);
                //show the cart
            });
        });
    }
    setCartValues(cart) {
        let tempTotal = 0;
        let itemsTotal = 0;
        cart.map(item => {
            tempTotal += +item.price * item.amount;
            itemsTotal += +item.amount;
        })
        cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
        itemTotal.innerText = parseFloat(tempTotal.toFixed(2));
        cartItems.innerText = itemsTotal;
    }
    addCartItem(item) {
        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML = `
        <img class="cart-product-img" src=${item.image[0]} alt="">
        <div class="product-description">
        <div class="product-title">${item.title}</div>
       <div class="product-id"><span>Id: </span>${item.id}</div>
       <div class="product-price"><span>Price: </span>RS: ${item.price}</div>
       <span class="qty"><span>Qty:</span><div class="product-quantity">
                    <i class="fas fa-chevron-up" data-id=${item.id}></i>
                    <p class="item-amount">${item.amount}</p>
                    <i class="fas fa-chevron-down" data-id=${item.id}></i></div></div></span>
                <div class="total-price "><button class="cart-remove-btn" data-id=${item.id}>remove</button></div>`;
        cartContent.appendChild(div);
    }
    setupAPP() {
        cart = Storage.getCart();
        this.setCartValues(cart);
        this.populateCart(cart);
        this.checkIfcartEmpty(cart);
    }
    checkIfcartEmpty() {
        if (cartContent.innerText === "") {
            emptyCartDOM.classList.add('show');
            clearCartBtn.style.display = 'none';
            cartCheckoutBtn.disabled = true;
        }
    }
    populateCart(cart) {
        cart.forEach(item => this.addCartItem(item));
    }
    cartLogic() {
        //clear cart button
        clearCartBtn.addEventListener('click', () => {
            this.clearCart()
        });
        //clear functionality
        cartContent.addEventListener("click", event => {
            if (event.target.classList.contains("cart-remove-btn")) {
                let removeItem = event.target;
                let id = removeItem.dataset.id;
                cartContent.removeChild(removeItem.parentElement.parentElement);
                this.removeItem(id);
            } else if (event.target.classList.contains("fa-chevron-up")) {
                let addAmount = event.target;
                let id = addAmount.dataset.id;
                let tempItem = cart.find(item => item.id === id);
                tempItem.amount = +tempItem.amount + 1;
                Storage.saveCart(cart);
                this.setCartValues(cart);
                addAmount.nextElementSibling.innerText = tempItem.amount;
            } else if (event.target.classList.contains("fa-chevron-down")) {
                let lowerAmount = event.target;
                let id = lowerAmount.dataset.id;
                let tempItem = cart.find(item => item.id === id);
                tempItem.amount = tempItem.amount - 1;
                if (tempItem.amount > 0) {
                    Storage.saveCart(cart);
                    this.setCartValues(cart);
                    lowerAmount.previousElementSibling.innerText = tempItem.amount;
                } else {
                    let removeItem = event.target;
                    let id = removeItem.dataset.id;
                    this.removeItem(id);
                }
            }
        });
        cartCheckoutBtn.addEventListener('click', () => {
            this.purchaseItem()
        });

    }
    clearCart() {
        let cartItems = cart.map(item => item.id);
        cartItems.forEach(id => this.removeItem(id))

        while (cartContent.children.lenght > 0) {
            cartContent.removeChild(cartContent.childern[0])
        }

    }
    removeItem(id) {
            cart = cart.filter(item => item.id !== id);
            this.setCartValues(cart);
            Storage.saveCart(cart);
            location.reload();
        }
        //PURCHASE BUTTON FUCNTIONALITY
    purchaseItem() {
        window.location.href = "/cart/invoice.html"
    }
    parseToSearch(products) {
        inputSearch.addEventListener('keyup', () => {
            let result = "";
            var b = inputSearch.value.toUpperCase().split(' ');
            products.forEach(product => {
                var a = product.title.toUpperCase();

                if (inputSearch.value == "") {
                    searchedProducts.style.display = 'none';
                } else {
                    if (b.every(item => a.includes(item))) {
                        searchedProducts.style.display = 'block';
                        result += `<li data-id=${product.id} class="searchedproduct"><img data-id=${product.id} src=${product.minimage}><h1 data-id=${product.id} >${product.title}</h1></li>`;
                    }
                }
            });
            searchedProducts.innerHTML = result;
        });
        inputSearch.addEventListener('focus', () => {
            searchedProducts.style.display = 'block';
        });
        searchedProducts.addEventListener('click', () => {
            let id = event.target.dataset.id;
            QVCloseBtn.classList.remove('hide');
            searchedProducts.style.display = 'none';
            quickViewDOM.classList.add('show-qv');
            let product = products.find(item => item.id === id);
            this.quickViewOpened(product);
            this.addQVItem(product);
        });
    }
    quickViewButtons(products) {
        const buttons = [...document.querySelectorAll('.quick-view-btn')];
        buttonsDOM = buttons;
        buttons.forEach(button => {
            let id = button.dataset.id;

            button.addEventListener('click', () => {
                //getting product from products
                quickViewDOM.classList.add('show-qv');
                QVCloseBtn.classList.remove('hide');
                document.querySelector('.cover').style.display = 'block';
                let product = products.find(product => product.id === id);
                this.addQVItem(product);
                this.quickViewOpened(product);
            });
        });
    }
    quickViewOpened(Product) {
        QVCloseBtn.addEventListener('click', () => {
            if (quickViewDOM.classList.contains('show-qv')) {
                QVCloseBtn.classList.add('hide');
                quickViewDOM.classList.remove('show-qv');
                document.querySelector('.cover').style.display = 'none';
            }
        });
        cover.addEventListener('click', () => {
            if (quickViewDOM.classList.contains('show-qv')) {
                QVCloseBtn.classList.add('hide');
                quickViewDOM.classList.remove('show-qv');
                document.querySelector('.cover').style.display = 'none';
            }
        });
        const QVPImgs = document.querySelectorAll('.qv-product-img')
        QVPImgs.forEach(img => {
            img.addEventListener('click', (img) => {
                selectedImg.src = img.target.src;
                QVPImgs.forEach(img => {
                    img.classList.remove('selected')
                });
                img.target.classList.add('selected');
            });
        });
    }
    addQVItem(product) {
        const QVPTitle = document.querySelector('.qv-product-title')
        const QVPPath = document.querySelector('.qv-product-path')
        const QVPId = document.querySelector('.qv-product-id')
        const QVPPrice = document.querySelector('.qv-product-price')
        const QVPImgs = document.querySelector('.product-images-wrapper')
        const QVPQtyDOM = document.querySelector('.qv-product-quantity')
        const QVPDescriptionDOM = document.querySelector('.qvp-description')
            //getting img of product 
        let imgs = "";
        Array.from(product.image).forEach((img, index) => {
            imgs += `<img class="qv-product-img" src="${product.image[index]}" alt="">`;
        });
        //adding add to cart btn
        let cartbtn = `<button class="qvcartbtn" data-id=${product.id}>
                    add to cart
                </button>`;
        //adding product qty
        product.amount = '1';
        let productQty = `<i class="fas fa-plus" data-id="${product.id}" aria-hidden="true"></i>
                        <span class="item-amount">${product.amount}</span>
                        <i class="fas fa-minus" data-id="${product.id}" aria-hidden="true"></i>`;
        //adding product description
        let QVPDescription = product.description;
        //writing vaues to innerhtml
        QVPTitle.innerHTML = product.title;
        QVPPath.innerHTML = product.type[1].replace(' ', '&#8250;');
        QVPId.innerHTML = '<span>Id: </span>' + product.id;
        QVPPrice.innerHTML = '<span>RS: </span>' + product.price;
        QVPImgs.innerHTML = imgs;
        QVPQtyDOM.innerHTML = productQty;
        QVPDescriptionDOM.innerHTML = QVPDescription;
        selectedImg.src = product.image[0];
        cartBtnDOM.innerHTML = cartbtn;
        //add to cart btn functionality
        QVPQtyDOM.addEventListener('click', () => {
            if (event.target.classList.contains("fa-plus")) {
                if (product.amount < 20) {
                    let addAmount = event.target;
                    product.amount = +product.amount + 1;
                    addAmount.nextElementSibling.innerText = product.amount;
                }
            } else if (event.target.classList.contains("fa-minus")) {
                let lowerAmount = event.target;
                if (product.amount > 1) {
                    product.amount = +product.amount - 1;
                    lowerAmount.previousElementSibling.innerText = product.amount;
                }
            }
        });
        const qvcartbtn = document.querySelector('.qvcartbtn')
        let inCart = cart.find(item => item.id === product.id);
        if (inCart) {
            qvcartbtn.innerText = "In Cart";
            qvcartbtn.disabled = true;
        }
        qvcartbtn.addEventListener('click', (event) => {

            event.target.innerText = 'In Cart';
            event.target.disabled = true;
            //getting product from products
            let item = {...product };
            //add product to cart
            cart = [...cart, item];
            //save cart in localstorage
            Storage.saveCart(cart);
            //set cart values
            this.setCartValues(cart);
            this.addCartItem(item);
        });
    }
}

//local storage
class Storage {
    static saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    static getCart() {
        return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI();
    const products = new Products();
    //setup application 
    ui.setupAPP();
    products.getProducts().then(products => {
        ui.parseToSearch(products);
        ui.cartLogic();
    });
});