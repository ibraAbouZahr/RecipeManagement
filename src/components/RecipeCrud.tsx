import { useState, useMemo } from "react";

interface Recipe {
  id: string;
  name: string;
  ingredients: string[];
  instructions: string[];
  metadata: {
    prepTime: string;
    cookTime: string;
    servings: number;
    difficulty: "Easy" | "Medium" | "Hard";
    cuisine: string;
  };
  status: {
    isFavorite: boolean;
    wantToTry: boolean;
    haveMade: boolean;
  };
  createdAt: Date;
}

export default function RecipeManagement() {
  const [recipes, setRecipes] = useState<Recipe[]>([
    {
      id: "1",
      name: "Spaghetti Carbonara",
      ingredients: [
        "400g spaghetti",
        "200g pancetta",
        "4 eggs",
        "100g parmesan",
        "Black pepper",
        "Salt",
      ],
      instructions: [
        "Boil pasta",
        "Cook pancetta",
        "Mix eggs and cheese",
        "Combine everything",
        "Serve hot",
      ],
      metadata: {
        prepTime: "15 min",
        cookTime: "20 min",
        servings: 4,
        difficulty: "Medium",
        cuisine: "Italian",
      },
      status: {
        isFavorite: true,
        wantToTry: false,
        haveMade: true,
      },
      createdAt: new Date("2024-01-15"),
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isAddingRecipe, setIsAddingRecipe] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [filterStatus, setFilterStatus] = useState<
    "all" | "favorites" | "toTry" | "made"
  >("all");

  const [formData, setFormData] = useState<Omit<Recipe, "id" | "createdAt">>({
    name: "",
    ingredients: [""],
    instructions: [""],
    metadata: {
      prepTime: "",
      cookTime: "",
      servings: 1,
      difficulty: "Easy",
      cuisine: "",
    },
    status: {
      isFavorite: false,
      wantToTry: false,
      haveMade: false,
    },
  });

  const filteredRecipes = useMemo(() => {
    let filtered = recipes.filter(
      (recipe) =>
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.ingredients.some((ingredient) =>
          ingredient.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        recipe.metadata.cuisine.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filterStatus !== "all") {
      filtered = filtered.filter((recipe) => {
        switch (filterStatus) {
          case "favorites":
            return recipe.status.isFavorite;
          case "toTry":
            return recipe.status.wantToTry;
          case "made":
            return recipe.status.haveMade;
          default:
            return true;
        }
      });
    }

    return filtered;
  }, [recipes, searchTerm, filterStatus]);

  const resetForm = () => {
    setFormData({
      name: "",
      ingredients: [""],
      instructions: [""],
      metadata: {
        prepTime: "",
        cookTime: "",
        servings: 1,
        difficulty: "Easy",
        cuisine: "",
      },
      status: {
        isFavorite: false,
        wantToTry: false,
        haveMade: false,
      },
    });
  };

  const handleAddRecipe = () => {
    if (!formData.name.trim()) return; // Ensure name is not empty

    const newRecipe: Recipe = {
      ...formData,
      id: Date.now().toString(),
      createdAt: new Date(),
      ingredients: formData.ingredients.filter((ing) => ing.trim() !== ""),
      instructions: formData.instructions.filter((inst) => inst.trim() !== ""),
    };

    setRecipes([...recipes, newRecipe]); // Add new recipe to the list
    setIsAddingRecipe(false);
    resetForm(); // Call reset form function
  };

  const handleEditRecipe = () => {
    if (!editingRecipe || !formData.name.trim()) return;

    const updatedRecipes = recipes.map((recipe) =>
      recipe.id === editingRecipe.id
        ? {
            ...formData,
            id: editingRecipe.id,
            createdAt: editingRecipe.createdAt,
            ingredients: formData.ingredients.filter(
              (ing) => ing.trim() !== ""
            ),
            instructions: formData.instructions.filter(
              (inst) => inst.trim() !== ""
            ),
          }
        : recipe
    );

    setRecipes(updatedRecipes);
    setEditingRecipe(null);
    resetForm();
  };

  const handleDeleteRecipe = (id: string) => {
    setRecipes(recipes.filter((recipe) => recipe.id !== id)); // Filter recipe list with the recipe to delete
  };

  const toggleRecipeStatus = (
    id: string,
    statusType: keyof Recipe["status"]
  ) => {
    setRecipes(
      recipes.map((recipe) =>
        recipe.id === id
          ? {
              ...recipe,
              status: {
                ...recipe.status,
                [statusType]: !recipe.status[statusType],
              },
            }
          : recipe
      )
    );
  };

  const startEditing = (recipe: Recipe) => {
    setEditingRecipe(recipe);
    setFormData({
      name: recipe.name,
      ingredients: [...recipe.ingredients],
      instructions: [...recipe.instructions],
      metadata: { ...recipe.metadata },
      status: { ...recipe.status },
    }); // set form data to the recipe being edited
    setIsAddingRecipe(true);
  };

  const addIngredient = () => {
    // Add a new empty ingredient field
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, ""],
    });
  };

  const removeIngredient = (index: number) => {
    setFormData({
      ...formData,
      ingredients: formData.ingredients.filter((_, i) => i !== index),
    });
  };

  const updateIngredient = (index: number, value: string) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = value;
    setFormData({
      ...formData,
      ingredients: newIngredients,
    });
  };

  const addInstruction = () => {
    setFormData({
      ...formData,
      instructions: [...formData.instructions, ""],
    });
  };

  const removeInstruction = (index: number) => {
    setFormData({
      ...formData,
      instructions: formData.instructions.filter((_, i) => i !== index),
    });
  };

  const updateInstruction = (index: number, value: string) => {
    const newInstructions = [...formData.instructions];
    newInstructions[index] = value;
    setFormData({
      ...formData,
      instructions: newInstructions,
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-bg min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Recipe Management System
        </h1>

        {/* Search and Filter Bar */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search recipes, ingredients, or cuisine..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Recipes</option>
            <option value="favorites">Favorites</option>
            <option value="toTry">Want to Try</option>
            <option value="made">Have Made</option>
          </select>
          <button
            onClick={() => {
              setIsAddingRecipe(true);
              setEditingRecipe(null);
              resetForm();
            }}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Recipe
          </button>
        </div>

        {/* Add/Edit Recipe Form */}
        {isAddingRecipe && (
          <div className="mb-6 p-6 bg-gray-50 rounded-lg border">
            <h2 className="text-xl font-semibold mb-4">
              {editingRecipe ? "Edit Recipe" : "Add New Recipe"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Recipe Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter recipe name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cuisine
                  </label>
                  <input
                    type="text"
                    value={formData.metadata.cuisine}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        metadata: {
                          ...formData.metadata,
                          cuisine: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Italian, Mexican"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Prep Time
                    </label>
                    <input
                      type="text"
                      value={formData.metadata.prepTime}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          metadata: {
                            ...formData.metadata,
                            prepTime: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 15 min"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cook Time
                    </label>
                    <input
                      type="text"
                      value={formData.metadata.cookTime}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          metadata: {
                            ...formData.metadata,
                            cookTime: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 30 min"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Servings
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={formData.metadata.servings}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          metadata: {
                            ...formData.metadata,
                            servings: Number.parseInt(e.target.value) || 1,
                          },
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Difficulty
                    </label>
                    <select
                      value={formData.metadata.difficulty}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          metadata: {
                            ...formData.metadata,
                            difficulty: e.target.value as any,
                          },
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>
                </div>

                {/* Status Checkboxes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.status.isFavorite}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            status: {
                              ...formData.status,
                              isFavorite: e.target.checked,
                            },
                          })
                        }
                        className="mr-2"
                      />
                      Favorite
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.status.wantToTry}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            status: {
                              ...formData.status,
                              wantToTry: e.target.checked,
                            },
                          })
                        }
                        className="mr-2"
                      />
                      Want to Try
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.status.haveMade}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            status: {
                              ...formData.status,
                              haveMade: e.target.checked,
                            },
                          })
                        }
                        className="mr-2"
                      />
                      Have Made
                    </label>
                  </div>
                </div>
              </div>

              {/* Ingredients and Instructions */}
              <div className="space-y-4">
                {/* Ingredients */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ingredients
                  </label>
                  {formData.ingredients.map((ingredient, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={ingredient}
                        onChange={(e) =>
                          updateIngredient(index, e.target.value)
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter ingredient"
                      />
                      <button
                        onClick={() => removeIngredient(index)}
                        className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                        disabled={formData.ingredients.length === 1}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={addIngredient}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                  >
                    Add Ingredient
                  </button>
                </div>

                {/* Instructions */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Instructions
                  </label>
                  {formData.instructions.map((instruction, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <textarea
                        value={instruction}
                        onChange={(e) =>
                          updateInstruction(index, e.target.value)
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={`Step ${index + 1}`}
                        rows={2}
                      />
                      <button
                        onClick={() => removeInstruction(index)}
                        className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                        disabled={formData.instructions.length === 1}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={addInstruction}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                  >
                    Add Step
                  </button>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex gap-4 mt-6">
              <button
                onClick={editingRecipe ? handleEditRecipe : handleAddRecipe}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {editingRecipe ? "Update Recipe" : "Add Recipe"}
              </button>
              <button
                onClick={() => {
                  setIsAddingRecipe(false);
                  setEditingRecipe(null);
                  resetForm();
                }}
                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Recipe List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-gray-800">
                  {recipe.name}
                </h3>
                <div className="flex gap-1">
                  {recipe.status.isFavorite && (
                    <span className="text-red-500 text-xl">♥</span>
                  )}
                  {recipe.status.wantToTry && (
                    <span className="text-blue-500 text-sm">📝</span>
                  )}
                  {recipe.status.haveMade && (
                    <span className="text-green-500 text-sm">✓</span>
                  )}
                </div>
              </div>

              <div className="text-sm text-gray-600 mb-3">
                <p>
                  <strong>Cuisine:</strong> {recipe.metadata.cuisine}
                </p>
                <p>
                  <strong>Time:</strong> {recipe.metadata.prepTime} prep,{" "}
                  {recipe.metadata.cookTime} cook
                </p>
                <p>
                  <strong>Servings:</strong> {recipe.metadata.servings} |{" "}
                  <strong>Difficulty:</strong> {recipe.metadata.difficulty}
                </p>
              </div>

              <div className="mb-3">
                <h4 className="font-medium text-gray-700 mb-1">Ingredients:</h4>
                <ul className="text-sm text-gray-600 list-disc list-inside">
                  {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                  {recipe.ingredients.length > 3 && (
                    <li className="text-gray-400">
                      ...and {recipe.ingredients.length - 3} more
                    </li>
                  )}
                </ul>
              </div>

              {/* Status Toggle Buttons */}
              <div className="flex gap-2 mb-3">
                <button
                  onClick={() => toggleRecipeStatus(recipe.id, "isFavorite")}
                  className={`px-2 py-1 text-xs rounded ${
                    recipe.status.isFavorite
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-600 hover:bg-red-50"
                  }`}
                >
                  ♥ Favorite
                </button>
                <button
                  onClick={() => toggleRecipeStatus(recipe.id, "wantToTry")}
                  className={`px-2 py-1 text-xs rounded ${
                    recipe.status.wantToTry
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-600 hover:bg-blue-50"
                  }`}
                >
                  📝 Try
                </button>
                <button
                  onClick={() => toggleRecipeStatus(recipe.id, "haveMade")}
                  className={`px-2 py-1 text-xs rounded ${
                    recipe.status.haveMade
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600 hover:bg-green-50"
                  }`}
                >
                  ✓ Made
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => startEditing(recipe)}
                  className="flex-1 px-3 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteRecipe(recipe.id)}
                  className="flex-1 px-3 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredRecipes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No recipes found matching your criteria.
            </p>
            <p className="text-gray-400">
              Try adjusting your search or filter settings.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
