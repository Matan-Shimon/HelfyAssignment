import { products } from "../mock-data/products"
import { questions } from "../mock-data/questions";

let UNIQUE_ID = 30;


const getDeepCopy = (obj: any) => JSON.parse(JSON.stringify(obj));

//feel free to add funcitons

export interface Ingredient {
    product_id: number;
    quantity: number
}
export interface Product {
    id: number;
    title: string;
    in_stock: boolean;
    ingredients: Ingredient[]
}

export interface Question {
    id: number;
    question: string;
    options: string[];
    correctAnswer: string;
}

const getAllProducts = async (): Promise<Product[]> => {
    //DO NOT EDIT THIS FUNCTION
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(getDeepCopy(products));
        }, 1000);
    })
}

const getProductById = async (id: number): Promise<Product | undefined> => {
    // DO NOT EDIT THIS FUNCTION
    const product = products.find(product => product.id === id);

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(getDeepCopy(product));
        }, 1000);
    })
}


// Function to create a new product (either ingredient or salad)
const createProduct = async (product: Product) => {
    UNIQUE_ID += 1; // Increment the unique ID for the new product
    // If the product has no ingredients, create it as an ingredient
    if (product.ingredients.length === 0) {
        return await createIngredient(product); // Return the result from createIngredient function
    } else {
        // Otherwise, create it as a salad
        return await createSalad(product); // Return the result from createSalad function
    }
};

// Function to create a new ingredient (a product with no ingredients)
async function createIngredient(newIngredient: Product) {
    // Check if the ingredient already exists in the product list (case-insensitive)
    const alreadyExists = products.some(
        (prod) => prod.ingredients.length === 0 && prod.title.toLowerCase() === newIngredient.title.toLowerCase()
    );
    if (alreadyExists) {
        // If the ingredient exists, throw an error
        throw new Error('Ingredient with this name already exists.');
    }

    // Assign a unique ID to the new ingredient
    newIngredient.id = UNIQUE_ID;

    // Add the new ingredient to the products list
    products.push(newIngredient);
    console.log("added new product"); // Log success message

    return { success: true }; // Return success status
}

// Function to create a new salad (a product with ingredients)
async function createSalad(newSalad: Product) {
    // Check if a salad with the same name already exists (case-insensitive)
    const sameNameSalad = products.find(
        (product) =>
            product.ingredients.length > 0 &&
            product.title.toLowerCase() === newSalad.title.toLowerCase()
    );
    if (sameNameSalad) {
        // If a salad with the same name exists, throw an error
        throw new Error('A salad with this name already exists.');
    }

    // Check if a salad with the same set of ingredients already exists (ignoring order and quantity)
    const sameIngredientsSalad = products.find((product) => {
        // If the number of ingredients doesn't match, return false
        if (product.ingredients.length !== newSalad.ingredients.length) return false;
        if (product.ingredients.length === 0) return false;

        // Sort ingredients by product_id and quantity to compare
        const sortedExisting = product.ingredients.sort((a, b) => a.product_id - b.product_id || a.quantity - b.quantity);
        const sortedNew = newSalad.ingredients.sort((a, b) => a.product_id - b.product_id || a.quantity - b.quantity);

        // Check if all ingredients match
        return sortedExisting.every((ing, idx) => 
            ing.product_id === sortedNew[idx].product_id && ing.quantity === sortedNew[idx].quantity
        );
    });

    if (sameIngredientsSalad) {
        // If a salad with the same ingredients exists, throw an error
        throw new Error('A salad with the same ingredients already exists.');
    }

    // Set the in_stock status based on the ingredients' stock status
    newSalad.in_stock = newSalad.ingredients.every(({ product_id }) => {
        const ingredient = products.find((prod) => prod.id === product_id);
        return ingredient ? ingredient.in_stock : false;
    });

    // Assign a unique ID to the new salad
    newSalad.id = UNIQUE_ID;

    // Add the new salad to the products list
    products.push(newSalad);
    return { success: true }; // Return success status
}

// Function to toggle the stock status of a product
const toggleProductInStock = async (id: number) => {
    // Find the product by its ID
    const product = products.find((p) => p.id === id);
    if (!product) {
        // If product is not found, throw an error
        throw new Error(`Product with ID ${id} not found.`);
    }

    // Toggle the in_stock status of the product
    product.in_stock = !product.in_stock;

    // Identify all dishes (products with ingredients) that contain the toggled product
    const impactedDishes = products.filter((dish) =>
        dish.ingredients.some((ingredient) => ingredient.product_id === id)
    );

    // For each impacted dish, re-check if all of its ingredients are in stock
    impactedDishes.forEach((dish) => {
        const allIngredientsInStock = dish.ingredients.every((ingredient) => {
            const ingredientProduct = products.find(
                (p) => p.id === ingredient.product_id
            );
            return ingredientProduct?.in_stock === true; // Check if all ingredients are in stock
        });

        // Update the dish's in_stock status based on its ingredients' status
        dish.in_stock = allIngredientsInStock;
    });
}

const getQuestions = async (): Promise<Question[]> => {

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(questions);
        }, 1000);
    })
}

export const DB = {
    getAllProducts,
    getProductById,
    toggleProductInStock,
    createProduct,
    getQuestions
}

