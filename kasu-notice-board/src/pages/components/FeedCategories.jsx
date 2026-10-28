export function FeedCategories({categories}) {
  return (
    <div className="categories-container">
      <button className="category-button category-button-active" type="button">
        All
      </button>
      {categories.map((category) => {
        return (
          <button className="category-button" type="button">
            {category.name}
          </button>
        )
      })}
    </div>
  );
}
