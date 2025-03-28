export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("da-DK", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};
