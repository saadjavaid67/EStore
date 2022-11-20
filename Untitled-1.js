const subCat = document.querySelectorAll(".level1 a");

function subCat() {
    subCat.forEach(cat => { cat.nextSibling && (cat.querySelectorAll("span").forEach(span => { span.style.pointerEvents = "none" }), cat.addEventListener("click", () => { event.target.href = "javascript:void(0)", event.stopPropagation(), event.target.nextSibling.classList.toggle("show") })) });
    this.subCat();
}
document.querySelector('[toggle-nav]').addEventListener('click', () => { this.subCat() });