export interface Product {
  slug: string;
  name: string;
  description: string;
  ingredients: string[];
  nutrition: {
    calories: number;
    fat: string;
    carbs: string;
    protein: string;
  };
  rating: number;
  reviews: number;
  price: string;
  image: string;
  color?: string; // Tailwind gradient classes for signature items
  isSignature?: boolean;
}

export const products: Product[] = [
  {
    slug: "classic-tomato",
    name: "Classic Tomato",
    description: "A timeless masterpiece. Hand-selected heritage tomatoes slow-roasted to perfection, then dusted over our artisan, kettle-cooked crisps for a vibrant, tangy bite.",
    ingredients: ["Potatoes", "Sunflower Oil", "Tomato Powder", "Sea Salt", "Onion Extract", "Garlic"],
    nutrition: { calories: 140, fat: "8g", carbs: "16g", protein: "2g" },
    rating: 4.8,
    reviews: 210,
    price: "$4.50",
    image: "/images/anatomy_red.png",
    color: "from-red-950 to-black",
    isSignature: true,
  },
  {
    slug: "spicy-masala",
    name: "Spicy Masala",
    description: "An exotic blend of toasted Indian spices. Cumin, coriander, and fiery chili pepper combine to create a bold, aromatic heat that builds with every crunch.",
    ingredients: ["Potatoes", "Sunflower Oil", "Spices (Cumin, Coriander, Chili, Turmeric)", "Sea Salt", "Mango Powder"],
    nutrition: { calories: 130, fat: "7g", carbs: "17g", protein: "2g" },
    rating: 4.9,
    reviews: 305,
    price: "$4.50",
    image: "/images/anatomy_orange.png",
    color: "from-orange-900 to-black",
    isSignature: true,
  },
  {
    slug: "truffle-cheese",
    name: "Truffle Cheese",
    description: "The ultimate indulgence. Real black summer truffles aged alongside vintage parmesan, delivering an earthy, umami-rich decadence that melts in your mouth.",
    ingredients: ["Potatoes", "Sunflower Oil", "Parmesan Cheese", "Black Truffle Extract", "Sea Salt", "Natural Flavors"],
    nutrition: { calories: 150, fat: "9g", carbs: "15g", protein: "3g" },
    rating: 5.0,
    reviews: 450,
    price: "$6.00",
    image: "/images/anatomy_black.png",
    color: "from-yellow-900 to-black",
    isSignature: true,
  },
  {
    slug: "sea-salt-balsamic",
    name: "Sea Salt & Balsamic",
    description: "Crisp and sharp. We age our balsamic vinegar in oak barrels before dehydrating it into a tart powder, balanced perfectly with hand-harvested Celtic sea salt.",
    ingredients: ["Potatoes", "Sunflower Oil", "Balsamic Vinegar Powder", "Sea Salt", "Maltodextrin"],
    nutrition: { calories: 140, fat: "8g", carbs: "16g", protein: "2g" },
    rating: 5.0,
    reviews: 142,
    price: "$4.20",
    image: "/images/anatomy_black.png",
  },
  {
    slug: "vintage-cheddar",
    name: "Vintage Cheddar",
    description: "Sharp and creamy. Made with cheddar aged for 24 months, providing a deep, robust dairy profile.",
    ingredients: ["Potatoes", "Sunflower Oil", "Aged Cheddar Powder", "Sea Salt", "Onion Powder"],
    nutrition: { calories: 150, fat: "9g", carbs: "15g", protein: "3g" },
    rating: 4.8,
    reviews: 125,
    price: "$5.00",
    image: "/images/anatomy_orange.png",
  },
  {
    slug: "sweet-chili",
    name: "Sweet Chili",
    description: "A perfect balance of sweet and heat. Tangy red peppers and brown sugar provide a satisfying kick without overwhelming the palate.",
    ingredients: ["Potatoes", "Sunflower Oil", "Sugar", "Chili Powder", "Sea Salt", "Paprika Extract"],
    nutrition: { calories: 140, fat: "8g", carbs: "17g", protein: "2g" },
    rating: 4.9,
    reviews: 112,
    price: "$3.63",
    image: "/images/anatomy_red.png",
  },
  {
    slug: "rosemary-thyme",
    name: "Rosemary & Thyme",
    description: "A walk through a Mediterranean garden. Freshly dried herbs impart a subtle, woody fragrance.",
    ingredients: ["Potatoes", "Sunflower Oil", "Rosemary", "Thyme", "Sea Salt", "Black Pepper"],
    nutrition: { calories: 130, fat: "7g", carbs: "16g", protein: "2g" },
    rating: 4.7,
    reviews: 168,
    price: "$6.50",
    image: "/images/anatomy_black.png",
  },
  {
    slug: "himalayan-pink-salt",
    name: "Himalayan Pink Salt",
    description: "Purity at its finest. Just our premium potatoes, sunflower oil, and ancient pink salt for a clean, classic crunch.",
    ingredients: ["Potatoes", "Sunflower Oil", "Himalayan Pink Salt"],
    nutrition: { calories: 130, fat: "7g", carbs: "16g", protein: "2g" },
    rating: 4.9,
    reviews: 189,
    price: "$4.50",
    image: "/images/anatomy_orange.png",
  },
  {
    slug: "smoked-paprika",
    name: "Smoked Paprika",
    description: "Oak-smoked Spanish paprika brings a warm, smoky sweetness that lingers.",
    ingredients: ["Potatoes", "Sunflower Oil", "Smoked Paprika", "Sea Salt", "Garlic Powder"],
    nutrition: { calories: 140, fat: "8g", carbs: "16g", protein: "2g" },
    rating: 4.8,
    reviews: 134,
    price: "$5.20",
    image: "/images/anatomy_orange.png",
  }
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}
