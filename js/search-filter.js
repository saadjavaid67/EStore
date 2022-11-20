function parseToSearch(products) {
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
    this.listenProduct(products);
}

function addQVItem(product) {
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
        setCartValues(cart);

    });

    function setCartValues(cart) {
        let itemsTotal = 0;
        cart.map(item => {
            itemsTotal += +item.amount
        })
        cartItems.innerText = itemsTotal;
    }


}

function listenProduct(products) {
    searchedProducts.addEventListener('click', () => {
        id = event.target.dataset.id;
        QVCloseBtn.classList.remove('hide');
        quickViewDOM.classList.add('show-qv');
        product = products.find(item => item.id === id);
        quickViewOpened(product);
        this.addQVItem(product);
    })
}

document.addEventListener("DOMContentLoaded", () => {
    const products = new Products();
    //GET ALL PRODUCTS
    products.getProducts().then(products => {
        parseToSearch(products);
    });
});