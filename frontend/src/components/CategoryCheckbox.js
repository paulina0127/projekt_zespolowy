
const CategoryCheckbox = ({ category, selectedCategories, setSelectedCategories }) => {

  if (category.subcategories && category.subcategories.length > 0) {
    return (
      <div className="dropdown-item">
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id={`category-${category.id}`}
            name="category"
            value={Number(category.id)}
            checked={selectedCategories.includes(category.id)}
            onChange={e => setSelectedCategories(e)}
          />
          <label className="form-check-label" htmlFor={`category-${category.id}`}>
            {category.name}
          </label>
        </div>
        <div className="dropdown-submenu">
          {category.subcategories.map((subcategory) => (
            <CategoryCheckbox 
              key={subcategory.id} 
              category={subcategory} 
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="dropdown-item">
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            name="category"
            id={`category-${category.id}`}
            value={Number(category.id)}
            checked={selectedCategories.includes(category.id)}
            onChange={e => setSelectedCategories(e)}
          />
          <label className="form-check-label" htmlFor={`category-${category.id}`}>
            {category.name}
          </label>
        </div>
      </div>
    );
  }
}

export default CategoryCheckbox;