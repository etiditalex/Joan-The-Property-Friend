const palette = ["#c6a15b", "#16140f", "#8d6b32", "#5f6b4a", "#c4b49a", "#3c3b32", "#a68448", "#8a857d"];

export function chartColor(index) {
  return palette[index % palette.length];
}

export function PieChart({ slices }) {
  const total = slices.reduce((sum, slice) => sum + slice.value, 0);
  if (!total) return <p className="chart-empty">Nothing to chart yet.</p>;
  let angle = -Math.PI / 2;
  const arcs = slices.map((slice) => {
    const sweep = (slice.value / total) * Math.PI * 2;
    const start = angle;
    angle += sweep;
    return { ...slice, start, end: angle, sweep };
  });

  return (
    <div className="pie">
      <svg viewBox="0 0 160 160" role="img" aria-label={slices.map((slice) => `${slice.label} ${slice.value}`).join(", ")}>
        {arcs.map((slice) => {
          if (slice.sweep >= Math.PI * 2 - 0.001) {
            return <circle key={slice.label} cx="80" cy="80" r="70" fill={slice.color} />;
          }
          const x1 = 80 + Math.cos(slice.start) * 70;
          const y1 = 80 + Math.sin(slice.start) * 70;
          const x2 = 80 + Math.cos(slice.end) * 70;
          const y2 = 80 + Math.sin(slice.end) * 70;
          const large = slice.sweep > Math.PI ? 1 : 0;
          return (
            <path
              key={slice.label}
              d={`M 80 80 L ${x1} ${y1} A 70 70 0 ${large} 1 ${x2} ${y2} Z`}
              fill={slice.color}
            />
          );
        })}
      </svg>
      <ul>
        {slices.map((slice) => (
          <li key={slice.label}>
            <i style={{ background: slice.color }} />
            <span>{slice.label}</span>
            <strong>{slice.value}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ColumnChart({ bars }) {
  const max = Math.max(1, ...bars.map((bar) => bar.value));
  return (
    <div className="chart-columns" role="img" aria-label={bars.map((bar) => `${bar.label} ${bar.value}`).join(", ")}>
      {bars.map((bar) => (
        <div key={bar.key || bar.label} className="chart-column">
          <span>{bar.value || ""}</span>
          <div style={{ height: `${bar.value ? Math.max(8, (bar.value / max) * 140) : 4}px` }} />
          <small>{bar.label}</small>
        </div>
      ))}
    </div>
  );
}

export function BarList({ rows }) {
  const max = Math.max(1, ...rows.map((row) => row.value));
  if (!rows.length) return <p className="chart-empty">No property visits yet.</p>;
  return (
    <ol className="bar-list">
      {rows.map((row) => (
        <li key={row.label}>
          <span>{row.label}</span>
          <div><i style={{ width: `${Math.max(6, (row.value / max) * 100)}%` }} /></div>
          <strong>{row.value}</strong>
        </li>
      ))}
    </ol>
  );
}
