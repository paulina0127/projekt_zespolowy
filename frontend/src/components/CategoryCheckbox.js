import { useState } from "react";

const CategoryCheckbox = ({ category, selectedCategories, setSelectedCategories }) => {
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!checked);
    const categoryId = category.id;
    if (!selectedCategories.includes(categoryId)) {
      setSelectedCategories([...selectedCategories, categoryId]);
    } else {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId));
    }
  }

  if (category.subcategories && category.subcategories.length > 0) {
    return (
      <div className="dropdown-item">
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id={`category-${category.id}`}
            checked={checked}
            onChange={handleCheckboxChange}
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
            id={`category-${category.id}`}
            checked={checked}
            onChange={handleCheckboxChange}
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