import React, { useState, useRef } from "react";
import FoodCard from "../SharedComponent/FoodCard";

const MENU_ITEMS = [
  {
    _id: 1,
    title: "Chickpea Pancakes",
    category: "Indian",
    images: [
      "https://static.vecteezy.com/system/resources/thumbnails/038/970/612/small/ai-generated-chicken-biryani-in-a-shiny-silver-bowl-spicy-curry-and-aromatic-flavors-authentic-indian-food-serving-fancy-food-in-a-restaurant-photo.jpg",
      "https://www.indianhealthyrecipes.com/wp-content/uploads/2021/12/chicken-biryani-recipe.jpg",
      "https://i.ytimg.com/vi/J7J6OZuKG6U/maxresdefault.jpg",
    ],
    sizes: [
      { label: 'Small (6")', price: 8.99 },
      { label: 'Medium (9")', price: 10.99 },
      { label: 'Large (12")', price: 13.99 },
    ],
    ingredients: [
      "Basmati rice",
      "Chicken",
      "Yogurt",
      "Onion",
      "Spices",
      "Mint",
      "Coriander",
    ],
    rating: 4.6,
    reviews: 89,
    cookTime: "45 mins",
    servings: 2,
    nutritionFacts: {
      calories: 620,
      protein: "28g",
      fat: "20g",
      carbohydrates: "75g",
    },
  },
  {
    _id: 2,
    title: "South Indian Meal",
    category: "Indian",
    images: [
      "https://static.vecteezy.com/system/resources/thumbnails/038/970/612/small/ai-generated-chicken-biryani-in-a-shiny-silver-bowl-spicy-curry-and-aromatic-flavors-authentic-indian-food-serving-fancy-food-in-a-restaurant-photo.jpg",
      "https://www.indianhealthyrecipes.com/wp-content/uploads/2021/12/chicken-biryani-recipe.jpg",
      "https://i.ytimg.com/vi/J7J6OZuKG6U/maxresdefault.jpg",
    ],
    sizes: [
      { label: "Single Serving", price: 7.99 },
      { label: "Family Pack", price: 19.99 },
    ],
    ingredients: [
      "Basmati rice",
      "Chicken",
      "Yogurt",
      "Onion",
      "Spices",
      "Mint",
      "Coriander",
    ],
    rating: 4.6,
    reviews: 89,
    cookTime: "45 mins",
    servings: 2,
    nutritionFacts: {
      calories: 620,
      protein: "28g",
      fat: "20g",
      carbohydrates: "75g",
    },
  },
  {
    _id: 3,
    title: "Margherita Pizza",
    category: "Italian",
    images: [
      "https://static.vecteezy.com/system/resources/thumbnails/038/970/612/small/ai-generated-chicken-biryani-in-a-shiny-silver-bowl-spicy-curry-and-aromatic-flavors-authentic-indian-food-serving-fancy-food-in-a-restaurant-photo.jpg",
      "https://www.indianhealthyrecipes.com/wp-content/uploads/2021/12/chicken-biryani-recipe.jpg",
      "https://i.ytimg.com/vi/J7J6OZuKG6U/maxresdefault.jpg",
    ],
    sizes: [
      { label: '10"', price: 9.99 },
      { label: '12"', price: 12.99 },
      { label: '14"', price: 15.99 },
      { label: '16"', price: 18.99 },
    ],
    ingredients: [
      "Basmati rice",
      "Chicken",
      "Yogurt",
      "Onion",
      "Spices",
      "Mint",
      "Coriander",
    ],
    rating: 4.6,
    reviews: 89,
    cookTime: "45 mins",
    servings: 2,
    nutritionFacts: {
      calories: 620,
      protein: "28g",
      fat: "20g",
      carbohydrates: "75g",
    },
  },
  {
    _id: 4,
    title: "French Baguette Sandwich",
    category: "French",
    images: [
      "https://static.vecteezy.com/system/resources/thumbnails/038/970/612/small/ai-generated-chicken-biryani-in-a-shiny-silver-bowl-spicy-curry-and-aromatic-flavors-authentic-indian-food-serving-fancy-food-in-a-restaurant-photo.jpg",
      "https://www.indianhealthyrecipes.com/wp-content/uploads/2021/12/chicken-biryani-recipe.jpg",
      "https://i.ytimg.com/vi/J7J6OZuKG6U/maxresdefault.jpg",
    ],
    sizes: [
      { label: "Half", price: 5.99 },
      { label: "Full", price: 10.99 },
    ],
    ingredients: [
      "Basmati rice",
      "Chicken",
      "Yogurt",
      "Onion",
      "Spices",
      "Mint",
      "Coriander",
    ],
    rating: 4.6,
    reviews: 89,
    cookTime: "45 mins",
    servings: 2,
    nutritionFacts: {
      calories: 620,
      protein: "28g",
      fat: "20g",
      carbohydrates: "75g",
    },
  },
  {
    _id: 5,
    title: "Kung Pao Chicken",
    category: "Chinese",
    images: [
      "https://static.vecteezy.com/system/resources/thumbnails/038/970/612/small/ai-generated-chicken-biryani-in-a-shiny-silver-bowl-spicy-curry-and-aromatic-flavors-authentic-indian-food-serving-fancy-food-in-a-restaurant-photo.jpg",
      "https://www.indianhealthyrecipes.com/wp-content/uploads/2021/12/chicken-biryani-recipe.jpg",
      "https://i.ytimg.com/vi/J7J6OZuKG6U/maxresdefault.jpg",
    ],
    sizes: [
      { label: "Small", price: 8.49 },
      { label: "Large", price: 14.99 },
    ],
    ingredients: [
      "Basmati rice",
      "Chicken",
      "Yogurt",
      "Onion",
      "Spices",
      "Mint",
      "Coriander",
    ],
    rating: 4.6,
    reviews: 89,
    cookTime: "45 mins",
    servings: 2,
    nutritionFacts: {
      calories: 620,
      protein: "28g",
      fat: "20g",
      carbohydrates: "75g",
    },
  },
];

const CATEGORIES = ["All", "Indian", "Italian", "French", "Chinese"];

const HomeMenu = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? MENU_ITEMS
      : MENU_ITEMS.filter((i) => i.category === activeCategory);

  return (
    <section className="py-12 px-4 bg-bg-secondary text-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-xs text-primary uppercase mb-2 tracking-wide">
            Taste the Best, Enjoy the Rest
          </p>
          <h2 className="text-3xl font-semibold mb-6">Explore Our Menu</h2>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full border border-primary transition ${
                activeCategory === cat
                  ? "bg-primary text-gray-900"
                  : "text-primary hover:bg-primary hover:text-gray-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Item Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((item) => (
            <FoodCard key={item._id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeMenu;
