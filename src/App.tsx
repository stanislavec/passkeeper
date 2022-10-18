import React, { useState } from "react";
import Create from "./views/create";
import List from "./views/list";
import useView, { VIEWS } from "./hooks/useView";
import "./styles.scss";
import { useDataHook, DataContext } from "./hooks/useData";
import Button from "./components/button";
import Edit from "./views/edit";
import { DATA } from "./hooks/useCreate";

function App() {
  const [view, setView] = useView();
  const dataHook = useDataHook();

  const [edited, setEdited] = useState<DATA>();

  const handleEdit = (item: DATA) => {
    setEdited(item);
    setView(VIEWS.EDIT);
  };

  const onSaveOrUpdate = () => {
    setView(VIEWS.HOME);
    setEdited(undefined);
  };

  return (
    <DataContext.Provider value={dataHook}>
      <div className="App">
        <Button
          className="create-btn"
          onClick={() => {
            setView(view !== VIEWS.HOME ? VIEWS.HOME : VIEWS.CREATE);
            setEdited(undefined);
          }}
        >
          {view !== VIEWS.HOME ? "Back" : "Create"}
        </Button>
        {view === VIEWS.CREATE && <Create onSave={onSaveOrUpdate} />}
        {view === VIEWS.HOME && <List setEdited={handleEdit} />}
        {view === VIEWS.EDIT && edited && (
          <Edit values={edited} onSave={onSaveOrUpdate} />
        )}
      </div>
    </DataContext.Provider>
  );
}

export default App;
