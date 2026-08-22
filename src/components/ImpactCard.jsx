import React, { useEffect, useState } from "react";

/**
 * Displays one statistic and animates it counting up from 0 on mount.
 * `value` can be a number (e.g. 12480) or a string with a suffix
 * (e.g. "4.8" is passed as value=4.8 and suffix="Tons").
 */
export default function ImpactCard({ icon, value, suffix = "", label }) {
  const [display, setDisplay] = useState(0);
  const isDecimal = value % 1 !== 0;

  useEffect(() => {
    let frame;
    const duration = 900;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = value * eased;
      setDisplay(isDecimal ? Number(current.toFixed(1)) : Math.floor(current));
      if (progress < 1) frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, isDecimal]);

  return (
    <div className="stat-cell fade-up">
      <div className="stat-number">
        {icon ? `${icon} ` : ""}
        {display.toLocaleString()}
        {suffix}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
}