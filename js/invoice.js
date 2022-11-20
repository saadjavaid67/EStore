//cart
let invoice = [];

//display products
class UI {

    setInvoiceValues(invoice) {
        let tempTotal = 0;
        let itemsTotal = 0;
        invoice.map(item => {
            tempTotal += item.price * item.amount;
            itemsTotal += item.amount;
        })
        invoiceTotal.innerText = parseFloat(tempTotal.toFixed(2));
        amountDue.innerText = parseFloat(tempTotal.toFixed(2));
    }
    addInvoiceItem(item) {
        const tr = document.createElement('tr');
        tr.classList.add('invoice-item');
        tr.innerHTML = `
                <td class="invoice-id">${item.id}</td>
                <td class="invoice-img"><img class="invoice-product-img" src="http://snoocberlin0.000webhostapp.com${item.image}"alt=""></td>
                <td class="invoice-name">${item.title}</td>
                <td class="invoice-qty">${item.amount}</td>
                <td class="align-right">RS:${item.price}</td>`;
        invoiceItems.appendChild(tr);
    }
    setupAPP() {
        invoice = Storage.getCart();
        this.setInvoiceValues(invoice);
        this.populateInvoice(invoice);
        this.date();
        this.checkoutForm();
    }
    populateInvoice(invoice) {
        invoice.forEach(item => this.addInvoiceItem(item));
    }
    date() {
        let date = new Date()
        invoiceDate.innerHTML = date
    }
    checkoutForm() {
        continueCheckout.addEventListener('click', () => {
            checkoutDOM.style.display = "flex";
            checkoutDOM.scrollIntoView();
            continueCheckout.style.display = "none";
        });
    }

}

//local storage
class Storage {
    static getCart() {
        return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI();
    //setup application 
    ui.setupAPP();
});