import { useState, useCallback, createContext, useContext } from "react";
import { DATA } from "./useCreate";
const fs = window.require?.("fs");

const readFromJson = () => {
  try {
    const row = fs.readFileSync("./backup.json");
    return JSON.parse(row);
  } catch (e) {
    return [];
  }
};

export const DataContext = createContext({});

export default function useData() {
  return useContext<[DATA[], (item: DATA) => void, (item: DATA) => void]>(
    DataContext as any
  );
}

export function useDataHook(): [
  DATA[],
  (item: DATA) => void,
  (item: DATA) => void
] {
  const [data, setData] = useState<DATA[]>(readFromJson());

  const addNew = useCallback((item: DATA) => {
    let newData = [] as DATA[];
    setData((prev) => {
      newData = [...prev, item];
      return newData;
    });
    if (!fs) return;
    fs.writeFile("./backup.json", JSON.stringify(newData), (err: any) => {
      if (err) console.log("Error writing file:", err);
    });
  }, []);

  const editExisted = useCallback(
    (item: DATA) => {
      const newData = data.map((d) => (d.uuid === item.uuid ? item : d));

      setData(newData);
      console.log(fs);
      if (!fs) return;
      fs.writeFile("./backup.json", JSON.stringify(newData), (err: any) => {
        if (err) console.log("Error writing file:", err);
      });
    },
    [data]
  );

  return [data, addNew, editExisted];
}
