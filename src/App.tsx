import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";

import Create from "views/create";
import List from "views/list";
import useView, { VIEWS } from "hooks/useView";
import { useDataHook, DataContext } from "hooks/useData";
import Edit from "views/edit";
import { DATA } from "hooks/useCreate";

import "bootstrap/dist/css/bootstrap.min.css";

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
      {/* <div className="App"> */}
      <Container className="py-5">
        <Button
          variant="outline-primary"
          onClick={() => {
            setView(view !== VIEWS.HOME ? VIEWS.HOME : VIEWS.CREATE);
            setEdited(undefined);
          }}
          className="mb-4"
        >
          {view !== VIEWS.HOME ? "Back" : "Create"}
        </Button>
        {view === VIEWS.CREATE && <Create onSave={onSaveOrUpdate} />}
        {view === VIEWS.HOME && <List setEdited={handleEdit} />}
        {view === VIEWS.EDIT && edited && (
          <Edit values={edited} onSave={onSaveOrUpdate} />
        )}
      </Container>
      {/* </div> */}
    </DataContext.Provider>
  );
}

export default App;
