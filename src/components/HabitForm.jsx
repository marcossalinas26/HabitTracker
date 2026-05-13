import { useState, useEffect } from "react";
import { Plus, Save, X, Heart, Briefcase, User, Star } from "lucide-react";

const categories = [
  { name: "General", icon: <Star size={18} />, slug: "general" },
  { name: "Salud", icon: <Heart size={18} />, slug: "salud" },
  { name: "Trabajo", icon: <Briefcase size={18} />, slug: "trabajo" },
  { name: "Personal", icon: <User size={18} />, slug: "personal" },
];

const HabitForm = ({ addHabit, editingHabit, updateHabit, setEditingHabit }) => {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("General");

  useEffect(() => {
    if (editingHabit) {
      setText(editingHabit.text);
      setCategory(editingHabit.category);
    } else {
      setText("");
      setCategory("General");
    }
  }, [editingHabit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    if (editingHabit) {
      updateHabit(editingHabit.id, text, category);
    } else {
      addHabit(text, category);
      setText("");
      setCategory("General");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">
          {editingHabit ? "Editar Hábito" : "Nuevo Hábito"}
        </label>
        <input
          type="text"
          className="form-input"
          placeholder="Ej: Meditar 10 minutos..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Categoría</label>
        <div className="category-list">
          {categories.map((cat) => (
            <button
              key={cat.name}
              type="button"
              className={`btn glass-card category-item ${cat.slug} ${
                category === cat.name ? "active" : ""
              }`}
              onClick={() => setCategory(cat.name)}
            >
              {cat.icon}
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="form-actions">
        <button className="btn btn-primary submit-btn" type="submit">
          {editingHabit ? (
            <>
              <Save size={18} /> Guardar Cambios
            </>
          ) : (
            <>
              <Plus size={18} /> Añadir Hábito
            </>
          )}
        </button>
        {editingHabit && (
          <button 
            className="btn glass-card p-2" 
            type="button" 
            onClick={() => setEditingHabit(null)}
          >
            <X size={20} />
          </button>
        )}
      </div>
    </form>
  );
};

export default HabitForm;
