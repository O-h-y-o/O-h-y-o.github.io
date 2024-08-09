---
date: 2024-08-09
category:
  - Quasar
  - export csv
tag:
  - export csv
  - typescript
order: 1
---

# Quasar 에서 엑셀 다운로드 하기

코드 전체입니다.

`exportData`로 엑셀 다운로드를 할 수 있습니다.

타입이 지저분하고 any가 많은데 어쩔수가 없습니다.

```ts
// functions.ts
const wrapCsvValue = (
  val: string,
  formatFn?: (arg0: string, arg1: RowData | undefined) => string | undefined,
  row?: RowData
) => {
  let formatted = formatFn ? formatFn(val, row) : val;

  formatted =
    formatted === undefined || formatted === null ? "" : String(formatted);

  formatted = formatted.split('"').join('""');

  return `"${formatted}"`;
};

export const exportData = (columns: any, rows: any) => {
  const content = [
    columns.map((col: { label: string }) => wrapCsvValue(col.label)),
  ]
    .concat(
      rows.map((row: { [x: string]: any }) =>
        columns
          .map((col: any) => {
            const value =
              typeof col.field === "function"
                ? col.field(row)
                : row[col.field === void 0 ? col.name : col.field];

            if (value instanceof Date || dayjs.isDayjs(value)) {
              return wrapCsvValue(
                dayjs(value).format("YYYY.MM.DD HH:mm"),
                col.format,
                row
              );
            }

            return wrapCsvValue(value, col.format, row);
          })
          .join(",")
      )
    )
    .join("\r\n");

  const bom = "\uFEFF";

  const status = exportFile("table-export.csv", bom + content, "text/csv");

  if (status !== true) {
    commonNotify(
      {
        message: "Browser denied file download...",
      },
      "negative"
    );
  }
};
```
