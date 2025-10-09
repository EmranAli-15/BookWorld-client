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
    let isAdded = false;
    let cart = <any>[];
    if (getCart) {
        const data = JSON.parse(getCart);

        const isExist = data.some((book: any) => book._id === forLocalCart._id);
        if (!isExist) {
            cart = [...data, forLocalCart];
            isAdded = true;
        }else{
            cart = data;
        }
    }
    else {
        cart = [{ ...forLocalCart }]
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    return isAdded
}

export const getLocalCartData = () => {
    const getCart = localStorage.getItem("cart");
    let cart = [];
    if (getCart) {
        cart = JSON.parse(getCart);
    };
    return cart;
}