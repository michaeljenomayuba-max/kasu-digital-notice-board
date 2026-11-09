export function FeedCategories({categories, setSelectedCategory}) {
  return (
    <div className="categories-container">
      <button className="category-button category-button-active" type="button" onClick={() => {setSelectedCategory("All")}}>
        All
      </button>
      {categories.map((category) => {
        return (
          <button key={category.id} className="category-button" type="button" onClick={() => {setSelectedCategory(category.name)}}>
            {category.name}
          </button>
        )
      })}
    </div>
  );
}
