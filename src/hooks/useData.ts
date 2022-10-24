import { useState, useCallback, createContext, useContext } from "react";
import { DATA } from "./useCreate";
import passkeeper from "../modules";

const { readFromJson, writeJson } = passkeeper;

export const DataContext = createContext({});

export default function useData() {
  return useContext<
    [DATA[], (item: DATA) => void, (item: DATA) => void, (item: DATA) => void]
  >(DataContext as any);
}

export function useDataHook(): [
  DATA[],
  (item: DATA) => void,
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
    writeJson(newData);
  }, []);

  const editExisted = useCallback(
    (item: DATA) => {
      const newData = data.map((d) => (d.uuid === item.uuid ? item : d));

      setData(newData);
      writeJson(newData);
    },
    [data]
  );

  const removeExisted = useCallback(
    (item: DATA) => {
      const newData = data.filter((d) => d.uuid !== item.uuid);

      setData(newData);
      writeJson(newData);
    },
    [data]
  );

  return [data, addNew, editExisted, removeExisted];
}
