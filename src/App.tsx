import { Container, Button } from "react-bootstrap";

import Create from "views/create";
import List from "views/list";
import { PasskeeperProvider, usePasskeeper, VIEWS } from "hooks/usePasskeeper";
import Edit from "views/edit";

import "bootstrap/dist/css/bootstrap.min.css";

const AppComponents = () => {
  const [{ view, edited }, { setView, setEdited }] = usePasskeeper();

  return (
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
      {view === VIEWS.CREATE && <Create />}
      {view === VIEWS.HOME && <List />}
      {view === VIEWS.EDIT && edited && <Edit />}
    </Container>
  );
};

function App() {
  return (
    <PasskeeperProvider>
      <AppComponents />
    </PasskeeperProvider>
  );
}

export default App;
