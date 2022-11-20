function genreChanged() {
    this.app();
    this.show();
}
document.addEventListener('DOMContentLoaded', show = () => {
    if (genre.value == 'grocery') {
        genreGrocery.classList.remove('hide')
    } else {
        genreGrocery.classList.add('hide')
    }
})