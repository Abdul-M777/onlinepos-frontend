export const colorMap: Record<string, string> = {
  rød: "#ff0000",
  blå: "#0000ff",
  grøn: "#008000",
  gul: "#ffff00",
  sort: "#000000",
  hvid: "#ffffff",
  lilla: "#800080",
  orange: "#ffa500",
};

export const getColor = (tagColor: string | null): string | null => {
  const defaultColor = "#808080";
  return colorMap[tagColor?.toLowerCase()] || defaultColor;
};
