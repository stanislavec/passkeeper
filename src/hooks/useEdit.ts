import { useState, useCallback } from "react";
import { DATA } from "./useCreate";
import useData from "./useData";

export default function useEdit(
  values: DATA
): [DATA, (key: string, val: string) => void, () => void] {
  const [data, setData] = useState<DATA>(values);
  const [, , editExisted] = useData();

  const handleData = useCallback((key: string, val: string) => {
    setData((prev) => ({ ...prev, [key]: val }));
  }, []);

  const saveData = useCallback(() => {
    editExisted(data);
  }, [data, editExisted]);

  return [data, handleData, saveData];
}
