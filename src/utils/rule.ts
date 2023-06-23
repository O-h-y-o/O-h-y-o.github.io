export const comma = (change: number | string, digit = 2): string => {
  return Number(change).toLocaleString(undefined, {
    maximumFractionDigits: digit,
  });
};

export const colors = {
  up: "#D24F45",
  down: "#1261C4",
  same: "#000",
};
