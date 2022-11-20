//cart
let cart = [];
//buttons
let buttonsDOM = [];
//display products
class UI {
    async displayProducts(products) {
        if (sort.value == 'title-asc') {
            function alphabeticSort(x, y) {
                if (x.title < y.title)
                    return -1;
                if (x.title > y.title)
                    return 1;
                return 0;
            }
            products.sort(alphabeticSort)
        } else if (sort.value == 'title-dsc') {
            function alphabeticSort(x, y) {
                if (x.title < y.title)
                    return -1;
                if (x.title > y.title)
                    return 1;
                return 0;
            }
            products.sort(alphabeticSort);
            products.reverse();
        } else if (sort.value == 'price-dsc') {
            function alphabeticSort(x, y) {
                if (x.price < y.price)
                    return -1;
                if (x.price > y.price)
                    return 1;
                return 0;
            }
            products.sort(alphabeticSort);
            products.reverse();
        } else if (sort.value == 'price-asc') {
            function alphabeticSort(x, y) {
                if (x.price < y.price)
                    return -1;
                if (x.price > y.price)
                    return 1;
                return 0;
            }
            products.sort(alphabeticSort);
        }

        let genreValues = [];
        genreValues.push(genre.value)
        if (genre.value == 'grocery') { if (genreValues.indexOf(genreGrocery.value) === -1) { genreValues.push(genreGrocery.value) } }
        let result = "";
        products.forEach(product => {
            var a = product.type;
            var b = genreValues.toString().replace(',', ' ');


            function check(genreVal) {
                return genreVal === b;
            }
            if (a.filter(check) == b) {
                result += `
            <!-- single product -->
            <article class="product ${product.type}" name=${product.type}>
            <div class="img-container">
                    <img 
                    src=${product.minimage}
                    data-src=${product.image[0]}
                    alt="product"
                    class="product-img"> <i class="fas fa-heart wishlist-btn"></i>
                    <button class="quick-view-btn" 
                    data-id=${product.id}>
                        Quick View
                    </button>
                </div>
                <h3>${product.title}</h3>
                <h4>RS: ${product.price}</h4>
            </article>
            <!-- end of single product -->
            `;
            }
        });
        productsDOM.innerHTML = result;
        this.changeHeading();
        observing();

    }
    changeHeading() {
        heading.innerHTML = ''
        heading.innerHTML += genre.value;
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
                quickViewOpened(product);
            });
        });

    }
    addQVItem(product) {
        const QVPTitle = document.querySelector('.qv-product-title')
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
            let cartItem = {...product };
            //add product to cart
            cart = [...cart, cartItem];
            //save cart in localstorage
            Storage.saveCart(cart);
            //set cart values
            this.setCartValues(cart);

        });


    }

    setCartValues(cart) {
        let itemsTotal = 0;
        cart.map(item => {
            itemsTotal += +item.amount
        })
        cartItems.innerText = itemsTotal;
    }
    setupAPP() {
        cart = Storage.getCart();
        this.setCartValues(cart);
    }

}
//local storage
class Storage {
    // static saveProducts(products) {
    //     localStorage.setItem("products", JSON.stringify(products));
    // }
    // static getProduct(id) {
    //     let products = JSON.parse(localStorage.getItem('products'));
    //     return products.find(product => product.id === id);
    // }
    static saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    static getCart() {
        return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
    }
}

document.addEventListener("DOMContentLoaded", app = () => {
    const ui = new UI();
    const products = new Products();
    //setup application 
    ui.setupAPP();
    //GET ALL PRODUCTS
    products.getProducts().then(products => {
        ui.displayProducts(products);
        // Storage.saveProducts(products);
        ui.quickViewButtons(products);
    });
});