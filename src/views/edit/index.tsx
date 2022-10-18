import { DATA } from "../../hooks/useCreate";
import useEdit from "../../hooks/useEdit";
import Button from "../../components/button";
import Input from "../../components/input";

import "./styles.scss";

function Edit({ values, onSave }: { values: DATA; onSave(): void }) {
  const [data, handleData, saveData] = useEdit(values);
  return (
    <div className="edit">
      <Input
        type="text"
        autoComplete="false"
        label="Title"
        value={data.title || ""}
        onChange={(e) => handleData("title", e.target.value || "")}
      />
      <Input
        type="password"
        autoComplete="false"
        label="Password"
        value={data.password || ""}
        onChange={(e) => handleData("password", e.target.value || "")}
      />
      <Input
        type="password"
        autoComplete="false"
        label="Repeat password"
        value={data.repeat || ""}
        onChange={(e) => handleData("repeat", e.target.value || "")}
      />
      <Button
        className="button"
        onClick={() => {
          saveData();
          onSave();
        }}
        disabled={
          !data.title ||
          !data.password ||
          !data.repeat ||
          data.password !== data.repeat
        }
      >
        Save
      </Button>
    </div>
  );
}

export default Edit;
