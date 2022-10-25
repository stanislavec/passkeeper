import useCreate from "hooks/useCreate";
import { Button, Form } from "react-bootstrap";

function Create({ onSave }: { onSave(): void }) {
  const [data, handleData, addNew] = useCreate();
  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={data.title || ""}
            onChange={(e) => handleData("title", e.target.value || "")}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={data.password || ""}
            onChange={(e) => handleData("password", e.target.value || "")}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Repeat password</Form.Label>
          <Form.Control
            type="password"
            value={data.repeat || ""}
            onChange={(e) => handleData("repeat", e.target.value || "")}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Additional information</Form.Label>
          <Form.Control
            as="textarea"
            value={data.description || ""}
            onChange={(e) => handleData("description", e.target.value || "")}
            rows={2}
          />
        </Form.Group>
      </Form>
      <div className="d-flex justify-content-end align-items-start">
        <Button
          variant="success"
          className="me-2"
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
    </>
  );
}

export default Create;
