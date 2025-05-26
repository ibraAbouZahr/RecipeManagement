# 🥘 Recipe Management System

A modern web application for managing your favorite recipes. Easily add, edit, and delete recipes with details such as name, ingredients, instructions, and cuisine type. You can also search for recipes by name, cuisine type, or specific ingredients.

Built using React, Tailwind CSS, and Font Awesome, this app delivers a clean and responsive user experience.

# 🚀 Features

✅ Add new recipes with name, ingredients, instructions, and cuisine type

📝 Edit existing recipes with updated details

❌ Delete recipes with ease

🔍 Search recipes by:

Recipe name

Cuisine type

Ingredients

🎨 Modern, responsive UI with Tailwind CSS

💡 Intuitive design and fluid animations using Framer Motion

📦 Modular and scalable architecture

# 🛠️ Installation & Setup

1. Clone the repository
   bash
   Copy
   Edit
   git clone https://github.com/your-username/recipe-management-system.git
   cd recipe-management-system

2. Install dependencies
   Run the following commands to install all required packages:

```
npm install @fortawesome/fontawesome-svg-core
npm install @fortawesome/free-solid-svg-icons
npm install @fortawesome/react-fontawesome
npm install @tailwindcss/vite
npm install @types/react-router-dom
npm install font-awesome
npm install framer-motion
npm install lucide-react
npm install react-icons
npm install react-router-dom
npm install tailwindcss
```

Or install them all at once:

```
npm install @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome @tailwindcss/vite @types/react-router-dom font-awesome framer-motion lucide-react react-icons react-router-dom tailwindcss

```

3. Set up Tailwind CSS
   If not pre-configured, run:

```
npx tailwindcss init -p
```

Add the following content paths to your tailwind.config.js:

```
content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
],
```

Then include Tailwind directives in your index.css:

```
@tailwind base;
@tailwind components;
@tailwind utilities;

```

# 📁 Project Structure

```
Recipe/
│
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├
│   ├── App.tsx
│   └── main.tsx
├── tailwind.config.js
└── package.json
```
