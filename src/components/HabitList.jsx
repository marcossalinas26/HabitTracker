import { motion, AnimatePresence } from "framer-motion";
import HabitItem from "./HabitItem";
import { Squirrel } from "lucide-react";

const HabitList = ({ habits, toggleHabit, deleteHabit, setEditingHabit }) => {
  if (habits.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card empty-state"
      >
        <div className="empty-icon-wrapper">
          <Squirrel className="text-muted" size={40} />
        </div>
        <p className="text-muted mb-1 fw-semibold">No hay hábitos registrados aquí.</p>
        <p className="small text-muted opacity-75">¡Añade uno nuevo para empezar!</p>
      </motion.div>
    );
  }

  return (
    <div className="habit-list">
      <AnimatePresence mode="popLayout">
        {habits.map((habit) => (
          <HabitItem
            key={habit.id}
            habit={habit}
            toggleHabit={toggleHabit}
            deleteHabit={deleteHabit}
            setEditingHabit={setEditingHabit}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default HabitList;
