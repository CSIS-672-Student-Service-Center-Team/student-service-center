import {
    DietaryPreference,
    MealCategory
} from "@/lib/dining-utils";


export const dietaryOptions: DietaryPreference[] = [
    { id: "gluten-free", label: "Gluten-free" },
    { id: "vegetarian", label: "Vegetarian" },
    { id: "vegan", label: "Vegan" },
    { id: "halal", label: "Halal" },
    { id: "dairy-free", label: "Dairy-free" },
    { id: "nut-free", label: "Nut-free" }
]; // NOTE: This will need to be loaded asynchronously later

export const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export const mealsData: Record<string, MealCategory[]> = {
    Bistro: [
        {
            title: "Breakfast",
            items: [
                { name: "Scrambled Eggs" },
                { name: "Pancakes" },
                { name: "Fresh Fruit" },
                { name: "Yogurt" }
            ]
        },
        {
            title: "Lunch",
            items: [
                { name: "Salad Bar" },
                { name: "Sandwich Bar" },
                { name: "Cheeseburger & Fries" },
                { name: "Rice & Pulled Pork" }
            ]
        },
        {
            title: "Dinner",
            items: [
                { name: "Salad Bar" },
                { name: "Pasta with Red Sauce" },
                { name: "Chicken Parm" },
                { name: "Beef Meatballs" }
            ]
        }
    ],
    Liberty: [
        {
            title: "Breakfast",
            items: [
                { name: "Omelette" },
                { name: "Bagels" },
                { name: "Fruit Salad" },
                { name: "Cereal" }
            ]
        },
        {
            title: "Lunch",
            items: [
                { name: "Pasta Salad" },
                { name: "Chicken Sandwich" },
                { name: "Vegetable Stir Fry" },
                { name: "Pulled Pork Tacos" }
            ]
        },
        {
            title: "Dinner",
            items: [
                { name: "Vegetarian Lasagna" },
                { name: "BBQ Ribs" },
                { name: "Baked Salmon" },
                { name: "Rice Pilaf" }
            ]
        }
    ]
};// NOTE: this will need to be loaded asynchronously later


