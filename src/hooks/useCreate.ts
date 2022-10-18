import { useState, useCallback } from "react";
import useData from "./useData";

export type DATA = {
  uuid: string;
  title: string;
  password: string;
  repeat: string;
};

const initial = {
  uuid: "",
  title: "",
  password: "",
  repeat: "",
};

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default function useCreate(): [
  DATA,
  (key: string, val: string) => void,
  () => void
] {
  const [data, setData] = useState<DATA>(initial);
  const [, addNewToList] = useData();

  const handleData = useCallback((key: string, val: string) => {
    setData((prev) => ({ ...prev, [key]: val }));
  }, []);

  const addNew = useCallback(() => {
    const uid = uuidv4();
    addNewToList({ ...data, uuid: uid });
  }, [addNewToList, data]);

  return [data, handleData, addNew];
}
