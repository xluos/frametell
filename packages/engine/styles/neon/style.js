/* Neon Noir · generated pack for the open-source Studio.  */
window.STYLE = {
  id: 'neon',
  roughScale: 0.1, bowScale: 0.08, sw: 2.4, single: true,
  palette: {
  "ink": "#ffffff",
  "soft": "#bab9bb",
  "muted": "#79797c",
  "faint": "#3e3d42",
  "paper": "#18171e",
  "red": "#22e5ff",
  "redF": "#136a7a",
  "orange": "#9b5cff",
  "orangeF": "#4a2d7a",
  "green": "#22e5ff",
  "greenF": "#136a7a",
  "blue": "#9b5cff",
  "blueF": "#4a2d7a",
  "purple": "#22e5ff",
  "purpleF": "#136a7a",
  "yellow": "#9b5cff",
  "yellowF": "#4a2d7a",
  "inkF": "#06050b",
  "softF": "#05050a",
  "mutedF": "#050409",
  "faintF": "#040408"
},
  background: (stage) => [
    'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px) 0 0 / 56px 56px',
    'linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px) 0 0 / 56px 56px',
    `radial-gradient(${stage.w}px ${stage.h * 0.9}px at 50% 40%, #16151c, #18171e 60%, #050408)`,
  ].join(','),
};