//VARIBELS
const url = window.location.search.substring(1);
const selector = document.querySelector('#genre')
const grocerySelector = document.querySelector('#genre-grocery')
const urlParams = new URLSearchParams(url);
const departmentParam = urlParams.get('department');
const catagoryParam = urlParams.get('catagory');
const QVCloseBtn = document.querySelector('.quickview-close-btn');
const selectedImg = document.querySelector('.qv-product-main-img')
const navOptions = document.querySelector('.nav-options')
const groceryFlyout = document.querySelector('.grocery-flyout')
const backBtn = document.querySelector('.back')
const navWrapper = document.querySelector(".nav-wrapper")
const cover = document.querySelector('.cover')
const inputSearch = document.querySelector('.searchbar')
const searchedProducts = document.querySelector('.searchedproducts')
const preLoader = document.querySelector('#preloader');
const genreGrocery = document.querySelector('#genre-grocery')
const itemTotal = document.querySelector('.item-total');
const productsDOM = document.querySelector('.products-center');
const genre = document.querySelector('#genre');
const sort = document.querySelector('#sort-products');
const heading = document.querySelector('#products-heading');
const quickViewDOM = document.querySelector('.product-quick-view-wrapper');
const QVProductDOM = document.querySelector('.quickview-product');
const groceryFlyoutBtn = document.querySelector('#grocery');
const cartItems = document.querySelector('.cart-items');
const cartBtnDOM = document.querySelector('.cart-btn-wrapper');



//getting the products
class Products {
    async getProducts() {
        try {
            let result = await fetch("products.json")
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
        this.observing();
    }
    observing() {
        const images = document.querySelectorAll("[data-src]");

        function preloadImage(img) {
            const src = img.getAttribute('data-src');
            if (src) {
                var bigImage = document.createElement("img")
                bigImage.onload = function() {
                    img.src = this.src;
                }
                bigImage.src = src
            }
        }

        const imgOptions = {};

        const imgObserver = new IntersectionObserver((entries, imgObserver) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    return;
                } else {
                    preloadImage(entry.target);
                    imgObserver.unobserve(entry.target);
                }
            })
        }, imgOptions);

        images.forEach(image => {
            imgObserver.observe(image);
        })
    }
    changeHeading() {
        heading.innerHTML = ''
        if (genre.value === genreGrocery.value) {
            heading.innerHTML += genre.value
        } else {
            heading.innerHTML += genre.value + ' &#8250; ' + genreGrocery.value;
        }
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


//END OF URL PARAMETERS
document.addEventListener("DOMContentLoaded", app = () => {
    const ui = new UI();
    const products = new Products();
    //setup application 
    ui.setupAPP();
    //GET ALL PRODUCTS
    products.getProducts().then(products => {
        ui.displayProducts(products);
        ui.parseToSearch(products);
        // Storage.saveProducts(products);
        ui.quickViewButtons(products);
    });
});