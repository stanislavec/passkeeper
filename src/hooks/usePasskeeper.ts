import { useState, useCallback } from "react";
import constate from "constate";
import passkeeper from "../modules";

const { readFromJson, writeJson } = passkeeper;

export enum VIEWS {
  HOME,
  CREATE,
  EDIT,
}

export type PasskeeperEntity = {
  uuid: string;
  title: string;
  password: string;
  repeat: string;
  description: string;
};

interface IPasskeeperState {
  view: VIEWS;
  data: PasskeeperEntity[];
  edited: PasskeeperEntity | undefined;
}

interface IPasskeeperActions {
  createNew(item: PasskeeperEntity): void;
  editExisted(): void;
  removeExisted(): void;
  setView: React.Dispatch<React.SetStateAction<VIEWS>>;
  setEdited: React.Dispatch<React.SetStateAction<PasskeeperEntity | undefined>>;
  setItemToEdit(item: PasskeeperEntity): void;
}

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function usePasskeeperHook(): [IPasskeeperState, IPasskeeperActions] {
  const [view, setView] = useState<VIEWS>(VIEWS.HOME);
  const [data, setData] = useState<PasskeeperEntity[]>(readFromJson());
  const [edited, setEdited] = useState<PasskeeperEntity | undefined>();

  console.log(data);

  const setItemToEdit = useCallback((el: PasskeeperEntity) => {
    setEdited(el);
    setView(VIEWS.EDIT);
  }, []);

  const createNew = useCallback((item: PasskeeperEntity) => {
    const newItem = { ...item, uuid: uuidv4() };
    let newData = [] as PasskeeperEntity[];
    setData((prev) => {
      newData = [...prev, newItem];
      return newData;
    });
    writeJson(newData);
    setEdited(undefined);
    setView(VIEWS.HOME);
  }, []);

  const editExisted = useCallback(() => {
    const newData = data.map((d) => (d.uuid === edited?.uuid ? edited : d));

    setData(newData);
    writeJson(newData);
    setEdited(undefined);
    setView(VIEWS.HOME);
  }, [data, edited]);

  const removeExisted = useCallback(() => {
    const newData = data.filter((d) => d.uuid !== edited?.uuid);

    setData(newData);

    writeJson(newData);
    setEdited(undefined);
    setView(VIEWS.HOME);
  }, [data, edited?.uuid]);

  return [
    { view, data, edited },
    {
      createNew,
      editExisted,
      removeExisted,
      setView,
      setEdited,
      setItemToEdit,
    },
  ];
}

const [PasskeeperProvider, usePasskeeper] = constate(usePasskeeperHook);

export { PasskeeperProvider, usePasskeeper };
