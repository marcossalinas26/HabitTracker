import { useState, useEffect } from 'react';
import { Quote } from 'lucide-react';

const QuoteBanner = () => {
  const [quote, setQuote] = useState("Cargando motivación...");

  useEffect(() => {
    fetch('https://api.adviceslip.com/advice')
      .then(res => res.json())
      .then(data => setQuote(data.slip.advice))
      .catch(() => setQuote("No te detengas hasta que estés orgulloso."));
  }, []);

  return (
    <div className="glass-card quote-banner">
      <div className="quote-icon-container">
        <Quote size={20} className="text-primary" />
      </div>
      <div className="quote-content">
        <span className="quote-label">Consejo del día</span>
        <p className="quote-text">"{quote}"</p>
      </div>
    </div>
  );
};

export default QuoteBanner;