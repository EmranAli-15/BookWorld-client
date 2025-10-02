export const getLocalCart = () => {
    const getCart = localStorage.getItem("cart");
    let cart = [];
    if (getCart) {
        cart = JSON.parse(getCart);
    };
    return cart.length;
}

export const addToLocalCart = ({ forLocalCart }: { forLocalCart: any }) => {
    const getCart = localStorage.getItem("cart");
    let cart = <any>[];
    if (getCart) {
        const data = JSON.parse(getCart);
        cart = [...data, forLocalCart]
    }
    else {
        cart = [{ ...forLocalCart }]
    }

    localStorage.setItem("cart", JSON.stringify(cart));
}

export const getLocalCartData = () => {
    const getCart = localStorage.getItem("cart");
    let cart = [];
    if (getCart) {
        cart = JSON.parse(getCart);
    };
    return cart;
}