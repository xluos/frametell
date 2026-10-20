/* Math animation · generated pack for the open-source Studio.  */
window.STYLE = {
  id: 'math',
  roughScale: 0.12, bowScale: 0.1, sw: 2.2, single: true,
  palette: {
  "ink": "#ffffff",
  "soft": "#bcbcbd",
  "muted": "#7d7d7f",
  "faint": "#434446",
  "paper": "#1f2023",
  "blue": "#58b9e6",
  "blueF": "#2f5b71",
  "orange": "#f4d66b",
  "orangeF": "#75693a",
  "red": "#58b9e6",
  "redF": "#2f5b71",
  "green": "#f4d66b",
  "greenF": "#75693a",
  "purple": "#58b9e6",
  "purpleF": "#2f5b71",
  "yellow": "#f4d66b",
  "yellowF": "#75693a",
  "inkF": "#0c0d0f",
  "softF": "#0b0c0e",
  "mutedF": "#0a0b0d",
  "faintF": "#08090b"
},
  background: (stage) => [
    'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px) 0 0 / 56px 56px',
    'linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px) 0 0 / 56px 56px',
    `radial-gradient(${stage.w}px ${stage.h * 0.9}px at 50% 40%, #1c1d20, #1f2023 60%, #090a0c)`,
  ].join(','),
};