import { useState, useEffect } from 'react';
import { supabase } from '../../assets/lib/supabaseClient';
import DeleteIcon from "../../assets/images/delete-icon.png";

export function CreateCategories({setCategory}) {
  const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState("");
  
    const [fillCategory, setFillCategory] = useState(null)

    useEffect(() => {
      const fetchCategories = async () => {
        const {data} = await supabase
          .from('categories')
          .select();
  
        
        setCategories(data);
      };
  
      fetchCategories();
    }, []);

  const createCategory = async () => {
    if (newCategory === "") {
      setFillCategory('please insert a category name')
      return
    }
    else {
      const {data, error} = await supabase
        .from("categories")
        .insert([{name: newCategory}])
        .select();

      setFillCategory(null);
    }  
  }

  return (
    <div className="category-picker">
      <p className="category-picker-label">Category</p>
      {categories.map((category) => {
        return (
          <label
            key={category.id}
            className="radio-option"
            onChange={(e) => setCategory(e.target.value)}
          >
            <div className="created-category">
              <input type="radio" name="category" value={category.id} />
              {category.name}
            </div>

            <button className="delete-icon-button">
              <img className="delete-icon" src={DeleteIcon} />
            </button>
          </label>
        );
      })}
      <input
        className="new-category-input"
        type="text"
        name="new-category"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        placeholder="New category name"
      />
      {fillCategory && <p>{fillCategory}</p>}
      <button
        className="create-category-button"
        type="button"
        onClick={createCategory}
      >
        Create Category
      </button>
    </div>
  );
}
