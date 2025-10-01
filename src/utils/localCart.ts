export const getLocalCart = () => {
    const getCart = localStorage.getItem("cart");
    let cart = [];
    if (getCart) {
        cart = JSON.parse(getCart);
    };
    return cart.length;
}

export const addToLocalCart = ({ productId }: { productId: string }) => {
    const getCart = localStorage.getItem("cart");
    let cart = <any>[];
    if (getCart) {
        const data = JSON.parse(getCart);
        cart = [...data, { productId, id: data.length + 1 }]
    }
    else {
        cart = [{ productId, id: 1 }]
    }

    localStorage.setItem("cart", JSON.stringify(cart));
}