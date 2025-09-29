
const baseURL = "http://localhost:5000/api";

export const getAllCategory = async () => {
    const result = await fetch(`${baseURL}/category/getCategory`);

    if (!result.ok) {
        throw new Error("Category not found.");
    };

    return result.json();
};

export const getAllWriter = async () => {
    const result = await fetch(`${baseURL}/writer/getWriter`);

    if (!result.ok) {
        throw new Error("Writer not found.");
    };

    return result.json();
};

export const getAllBooks = async () => {
    const result = await fetch(`${baseURL}/book/getAllBooks?page=1&limit=10`);

    if (!result.ok) {
        throw new Error("Books not found.");
    };

    return result.json();
};

export const getCategoryBooks = async (id: string) => {
    const result = await fetch(`${baseURL}/book/getCategoryBook/${id}`);

    if (!result.ok) {
        throw new Error("Category not found.");
    };

    return result.json();
};