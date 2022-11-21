import styles from "./Table.module.scss";

type ColumnWithDataContent = {
  key: string;
  title: string;
  render?: never;
};

type ColumnWithRenderContent<T> = {
  key?: never;
  title?: string;
  render: (item: T) => React.ReactNode;
};

type TableProps<T> = {
  data: T[];
  columns: (ColumnWithDataContent | ColumnWithRenderContent<T>)[];
  onRowClick?: (item: T) => void;
  emptyMessage?: string;
};

export default function Table<T extends { [key: string]: any }>({
  data,
  columns,
  onRowClick,
  emptyMessage = "Nenhum item encontrado",
}: TableProps<T>) {
  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((col, i) => (
              <th key={i}>{col.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={i} onClick={() => (onRowClick ? onRowClick(item) : null)}>
              {columns.map((col, j) => (
                <td key={j}>
                  {col.render
                    ? col.render(item)
                    : (col.key.split(".").reduce((p, prop) => p[prop], item) as unknown as string)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {data.length === 0 && <span className={styles.emptyMessage}>{emptyMessage}</span>}
    </>
  );
}
