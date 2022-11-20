function quickViewOpened(product) {
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