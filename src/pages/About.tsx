import { Link } from "react-router-dom";
export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-text mb-4">
          About RecipeKeeper
        </h2>
        <p className="text-lg text-text/70 max-w-2xl mx-auto">
          Your personal culinary companion for organizing, discovering, and
          mastering recipes.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-card rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
            <svg
              className="w-6 h-6 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-text mb-3">Our Mission</h3>
          <p className="text-text/70">
            We believe cooking should be joyful and organized. RecipeKeeper
            helps you collect, organize, and track your favorite recipes in one
            beautiful place.
          </p>
        </div>

        <div className="bg-card rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
            <svg
              className="w-6 h-6 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-text mb-3">Key Features</h3>
          <ul className="text-text/70 space-y-2">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
              Smart recipe organization
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
              Favorite & status tracking
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
              Powerful search & filtering
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
              Easy recipe management
            </li>
          </ul>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-card rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700 text-center">
        <div className="grid grid-cols-3 gap-8">
          <div>
            <div className="text-3xl font-bold text-primary mb-2">∞</div>
            <div className="text-sm text-text/70">Unlimited Recipes</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">⚡</div>
            <div className="text-sm text-text/70">Lightning Fast</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">🎨</div>
            <div className="text-sm text-text/70">Beautiful Design</div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-12">
        <p className="text-text/70 mb-6">
          Ready to organize your culinary journey?
        </p>
        <Link to={"/"}>
          <button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-medium transition-colors">
            Start Cooking
          </button>
        </Link>
      </div>
    </main>
  );
}
