import { useState } from "react";

export enum VIEWS {
  HOME,
  CREATE,
  EDIT,
}

export default function useView(): [VIEWS, (view: VIEWS) => void] {
  const [view, setView] = useState<VIEWS>(VIEWS.HOME);

  return [view, setView];
}
