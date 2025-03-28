export const colorMap: Record<string, string> = {
  rød: "#ffa1ad",
  blå: "#8ec5ff",
  grøn: "#7bf1a8",
  gul: "#ffdf20",
  lilla: "#dab2ff",
  orange: "#ffb86a",
};

export const getColor = (tagColor: string | null): string | null => {
  const defaultColor = "#808080";
  return colorMap[tagColor?.toLowerCase() || "defaultColor"] || defaultColor;
};

// Function to darken a hex color for text
export const getDarkerColor = (hex: string, percent: number = 100): string => {
  const num = parseInt(hex.replace("#", ""), 16);
  let r = (num >> 16) - percent;
  let g = ((num >> 8) & 0x00ff) - percent;
  let b = (num & 0x0000ff) - percent;

  r = r < 0 ? 0 : r;
  g = g < 0 ? 0 : g;
  b = b < 0 ? 0 : b;

  return `rgb(${r}, ${g}, ${b})`;
};
