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