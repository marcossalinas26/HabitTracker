import { useState, useEffect, useCallback } from "react";
import confetti from "canvas-confetti";
import { 
  Moon, 
  Sun, 
  Layout, 
  CheckCircle, 
  Clock, 
  ListTodo
} from "lucide-react";
import HabitForm from "./components/HabitForm";
import HabitList from "./components/HabitList";
import QuoteBanner from "./components/QuoteBanner";
import StatsCard from "./components/StatsCard";
import "./App.css";

function App() {
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem("mis-habitos");
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState("all");
  const [theme, setTheme] = useState(
    () => localStorage.getItem("habit-theme") || "light",
  );
  const [editingHabit, setEditingHabit] = useState(null);

  useEffect(() => {
    localStorage.setItem("mis-habitos", JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("habit-theme", theme);
  }, [theme]);

  const triggerConfetti = useCallback(() => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#7c3aed", "#10b981", "#f59e0b"],
    });
  }, []);

  const addHabit = (text, category) => {
    const newHabit = {
      id: Date.now(),
      text,
      category: category || "General",
      completed: false,
      date: new Date().toLocaleDateString(),
      lastCompleted: null,
      streak: 0,
    };
    setHabits([...habits, newHabit]);
  };

  const updateHabit = (id, newText, newCategory) => {
    setHabits(
      habits.map((h) =>
        h.id === id ? { ...h, text: newText, category: newCategory } : h
      )
    );
    setEditingHabit(null);
  };

  const toggleHabit = (id) => {
    const updatedHabits = habits.map((h) => {
      if (h.id === id) {
        const isCompleting = !h.completed;
        const today = new Date().toLocaleDateString();
        let newStreak = h.streak;

        if (isCompleting) {
          if (h.lastCompleted !== today) {
            newStreak = h.streak + 1;
          }
          return {
            ...h,
            completed: true,
            streak: newStreak,
            lastCompleted: today,
          };
        } else {
          return {
            ...h,
            completed: false,
            streak: Math.max(0, h.streak - 1),
          };
        }
      }
      return h;
    });

    setHabits(updatedHabits);

    const allCompleted = updatedHabits.length > 0 && updatedHabits.every(h => h.completed);
    if (allCompleted) {
      triggerConfetti();
    }
  };

  const deleteHabit = (id) => {
    if (window.confirm("¿Seguro que quieres eliminar este hábito?")) {
      setHabits(habits.filter((h) => h.id !== id));
    }
  };

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const completedCount = habits.filter((h) => h.completed).length;
  const percentage =
    habits.length > 0 ? Math.round((completedCount / habits.length) * 100) : 0;

  const filteredHabits = habits.filter((h) => {
    if (filter === "pending") return !h.completed;
    if (filter === "completed") return h.completed;
    return true;
  });

  const getMotivationMessage = () => {
    if (habits.length === 0) return "¡Define tus metas y empieza hoy! 🚀";
    if (percentage === 0) return "El primer paso es el más importante. 💪";
    if (percentage < 50) return "¡Vas por buen camino! ✨";
    if (percentage < 100) return "¡Casi completado! ¡No pares! 🔥";
    return "¡Increíble! Has dominado el día. 🏆";
  };

  return (
    <div className="app-container">
      <button className="btn glass-card theme-toggle" onClick={toggleTheme}>
        {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
      </button>

      <header className="app-header">
        <div className="glass-card app-logo-container">
          <img
            src="/logo.png"
            alt="Habit Hub Logo"
            className="app-logo"
          />
        </div>
        <h1 className="app-title">Habit Hub</h1>
        <p className="app-subtitle">Forja tu mejor versión, un hábito a la vez.</p>
      </header>

      <QuoteBanner />

      <StatsCard habits={habits} completedCount={completedCount} />

      <div className="glass-card p-4 mb-4">
        <HabitForm
          addHabit={addHabit}
          editingHabit={editingHabit}
          updateHabit={updateHabit}
          setEditingHabit={setEditingHabit}
        />
      </div>

      <section className="progress-section">
        <div className="progress-info">
          <span className="progress-label">Tu progreso hoy</span>
          <span className="progress-percentage">{percentage}%</span>
        </div>
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ "--progress-width": `${percentage}%` }}
          ></div>
        </div>
        <p className="motivation-text">
          {getMotivationMessage()}
        </p>
      </section>

      <div className="filter-bar">
        {[
          { id: "all", icon: <ListTodo size={16} />, label: "Todos" },
          { id: "pending", icon: <Clock size={16} />, label: "Pendientes" },
          { id: "completed", icon: <CheckCircle size={16} />, label: "Listos" },
        ].map((f) => (
          <button
            key={f.id}
            className={`btn glass-card filter-btn ${filter === f.id ? "active" : ""}`}
            onClick={() => setFilter(f.id)}
          >
            {f.icon} {f.label}
          </button>
        ))}
      </div>

      <HabitList
        habits={filteredHabits}
        toggleHabit={toggleHabit}
        deleteHabit={deleteHabit}
        setEditingHabit={setEditingHabit}
      />

      <footer className="app-footer">
        <div className="footer-socials">
          <a
            href="https://github.com/marcossalinas26/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label="GitHub"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
          </a>
          <a
            href="https://www.linkedin.com/in/marcos-mauricio-salinas-delgado-b1b47a212/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label="LinkedIn"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
        </div>
        <p className="footer-copy">
          © 2026 Habit Hub
        </p>
      </footer>
    </div>
  );
}

export default App;
