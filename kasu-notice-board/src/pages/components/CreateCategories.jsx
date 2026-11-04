import { useState, useEffect } from 'react';
import { supabase } from '../../assets/lib/supabaseClient';
import { updateDelete } from '../../utils';
import DeleteIcon from "../../assets/images/delete-icon.png";

export function CreateCategories({category, setCategory}) {
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

      setCategories([...categories, data[0]])
      setNewCategory("")
      setFillCategory(null);
    }  
  }

  const deleteCategory = async (categoryId) => {
    await supabase
      .from('notices')
      .delete()
      .eq('category_id', categoryId)

    await supabase
      .from('categories')
      .delete()
      .eq('id', categoryId)

    setCategories(updateDelete(categoryId, categories))
  }

  return (
    <div className="category-picker">
      <p className="category-picker-label">Category</p>
      {categories.map((cat) => {
        return (
          <label
            key={cat.id}
            className="radio-option"
            onChange={(e) => setCategory(e.target.value)}
          >
            <div className="created-category">
              <input type="radio" name="category" value={cat.id} checked={category === cat.id} onChange={() => setCategory(cat.id)}/>
              {cat.name}
            </div>

            <button type='button' className="delete-icon-button" onClick={() => {deleteCategory(cat.id)}}>
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
