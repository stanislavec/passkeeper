import useCreate from "../../hooks/useCreate";
import Button from "../../components/button";
import Input from "../../components/input";

import "./styles.scss";

function Create({ onSave }: { onSave(): void }) {
  const [data, handleData, addNew] = useCreate();
  return (
    <div className="create">
      <Input
        type="text"
        autoComplete="false"
        label="Title"
        onChange={(e) => handleData("title", e.target.value || "")}
      />
      <Input
        type="password"
        autoComplete="false"
        label="Password"
        onChange={(e) => handleData("password", e.target.value || "")}
      />
      <Input
        type="password"
        autoComplete="false"
        label="Repeat password"
        onChange={(e) => handleData("repeat", e.target.value || "")}
      />
      <Button
        className="button"
        onClick={() => {
          addNew();
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

export default Create;
