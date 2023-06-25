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

export const objSort = (data: any, target: any, sort?: string) => {
  const changeObj: any = {};
  if (sort === "desc") {
    new Map(
      Object.entries(data).sort((a: any, b: any): any => {
        return a[1][target] < b[1][target]
          ? 1
          : a[1][target] > b[1][target]
          ? -1
          : 0;
      })
    ).forEach((v: any, k: any) => {
      changeObj[k] = v;
    });
  } else {
    new Map(
      Object.entries(data).sort((a: any, b: any): any => {
        return a[1][target] > b[1][target]
          ? 1
          : a[1][target] < b[1][target]
          ? -1
          : 0;
      })
    ).forEach((v: any, k: any) => {
      changeObj[k] = v;
    });
  }
  return changeObj;
};
