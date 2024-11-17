export interface DietaryPreference {
    id: string
    label: string
}

export interface MenuItem {
    name: string;
}

export interface MealSection {
    title: string;
    items: MenuItem[];
}

export interface MealCategory {
    title: string;
    items: {name: string}[];
}