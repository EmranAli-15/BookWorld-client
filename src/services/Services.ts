
const baseURL = "http://localhost:5000/api";

export const getAllCategory = async () => {
    const result = await fetch(`${baseURL}/category/getCategory`);

    if(!result.ok){
        throw new Error("Category not found.");
    };

    return result.json();
}