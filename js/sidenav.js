function navBtn() {
    var x = document.querySelector('.navbtn')
    x.classList.toggle("change");
}

function togglebtn() {
    var x = document.querySelector(".nav-wrapper");

    if (x.style.width <= "220px") {
        this.navBtn();
        cover.style.display = 'block';
        x.style.width = "230px";
    } else {
        this.navBtn();
        cover.style.display = 'none';
        x.style.width = "0px";
        groceryFlyout.style.width = '0px';
        quickViewDOM.classList.remove('show-qv');
    }
}
cover.addEventListener('click', () => {
    if (navWrapper.style.width == "230px") {
        this.navBtn();
        cover.style.display = 'none';
        navWrapper.style.width = "0px";
        QVCloseBtn.classList.add('hide');
        groceryFlyout.style.width = '0px';
        quickViewDOM.classList.remove('show-qv');
    }
});
navOptions.addEventListener('click', () => {
    if (event.target.dataset.id == 'grocery') {
        groceryFlyoutBtn.href = '#';
        groceryFlyout.style.width = '230px';
    }
});
backBtn.addEventListener('click', () => {
    groceryFlyout.style.width = '0px';
});
document.querySelector('.searchbtn').addEventListener('click', () => {
    this.togglebtn();
    inputSearch.focus();
})