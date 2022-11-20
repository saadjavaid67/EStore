function observing() {
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