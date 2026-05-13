import { Activity, CheckCircle2, Circle } from "lucide-react";

const StatsCard = ({ habits, completedCount }) => {
  const total = habits.length;
  const pending = total - completedCount;

  return (
    <div className="stats-dashboard">
      <div className="glass-card stat-card">
        <div className="stat-header">
          <Activity className="text-primary" size={20} />
          <span>Total</span>
        </div>
        <div className="stat-value">{total}</div>
      </div>
      
      <div className="glass-card stat-card">
        <div className="stat-header">
          <CheckCircle2 className="text-success" size={20} />
          <span>Listos</span>
        </div>
        <div className="stat-value">{completedCount}</div>
      </div>
      
      <div className="glass-card stat-card">
        <div className="stat-header">
          <Circle className="text-warning" size={20} />
          <span>Faltan</span>
        </div>
        <div className="stat-value">{pending}</div>
      </div>
    </div>
  );
};

export default StatsCard;
