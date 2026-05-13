import { motion } from "framer-motion";
import { Trash2, Edit2, Flame, Heart, Briefcase, User, Star } from "lucide-react";

const categoryConfig = {
  General: { icon: <Star size={16} />, slug: "general" },
  Salud: { icon: <Heart size={16} />, slug: "salud" },
  Trabajo: { icon: <Briefcase size={16} />, slug: "trabajo" },
  Personal: { icon: <User size={16} />, slug: "personal" },
};

const HabitItem = ({ habit, toggleHabit, deleteHabit, setEditingHabit }) => {
  const config = categoryConfig[habit.category] || categoryConfig.General;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className={`glass-card habit-card ${habit.completed ? "completed" : ""}`}
    >
      <div className="habit-main">
        <input
          type="checkbox"
          className="habit-checkbox"
          checked={habit.completed}
          onChange={() => toggleHabit(habit.id)}
        />
        <div className="habit-info">
          <div className="habit-meta">
            <span className={`category-tag ${config.slug}`}>
              {habit.category}
            </span>
            {habit.streak > 0 && (
              <span className="streak-badge">
                <Flame size={12} className="me-1" fill="currentColor" />
                {habit.streak}
              </span>
            )}
          </div>
          <span className={`habit-name ${habit.completed ? "completed" : ""}`}>
            {habit.text}
          </span>
        </div>
      </div>

      <div className="habit-actions">
        <button
          onClick={() => setEditingHabit(habit)}
          className="btn btn-link"
          title="Editar"
        >
          <Edit2 size={18} />
        </button>
        <button
          onClick={() => deleteHabit(habit.id)}
          className="btn btn-link text-danger"
          title="Eliminar"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </motion.div>
  );
};

export default HabitItem;
