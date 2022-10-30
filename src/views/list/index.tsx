import React, { useState, useRef } from "react";
import { Alert, ListGroup, Badge, Tooltip, Overlay } from "react-bootstrap";
import copy from "copy-to-clipboard";

import { PasskeeperEntity, usePasskeeper } from "hooks/usePasskeeper";

const CopyComponent: React.FC<{ onCopy(): void; show: boolean }> = ({
  onCopy,
  show,
}) => {
  const target = useRef(null);

  return (
    <>
      <Badge bg="dark" pill onClick={onCopy} ref={target}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_229_215)">
            <path
              d="M7 6V3C7 2.73478 7.10536 2.48043 7.29289 2.29289C7.48043 2.10536 7.73478 2 8 2H20C20.2652 2 20.5196 2.10536 20.7071 2.29289C20.8946 2.48043 21 2.73478 21 3V17C21 17.2652 20.8946 17.5196 20.7071 17.7071C20.5196 17.8946 20.2652 18 20 18H17V21C17 21.552 16.55 22 15.993 22H4.007C3.87513 22.0008 3.7444 21.9755 3.62232 21.9256C3.50025 21.8757 3.38923 21.8022 3.29566 21.7093C3.20208 21.6164 3.12779 21.5059 3.07705 21.3841C3.02632 21.2624 3.00013 21.1319 3 21L3.003 7C3.003 6.448 3.453 6 4.009 6H7ZM5.002 8L5 20H15V8H5.002ZM9 6H17V16H19V4H9V6ZM7 11H13V13H7V11ZM7 15H13V17H7V15Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_229_215">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </Badge>
      <Overlay target={target.current} show={show} placement="right">
        {(props) => (
          <Tooltip id="copy-tooltip" {...props}>
            Copied!
          </Tooltip>
        )}
      </Overlay>
    </>
  );
};

export default function List() {
  const [{ data: list }, { setItemToEdit }] = usePasskeeper();
  const [copied, setCopied] = useState<string[]>([]);

  const handleCopy = (el: PasskeeperEntity) => {
    copy(el.password);
    let newData = [];
    setCopied((p) => {
      newData = [...p, el.uuid];
      return newData;
    });
    setTimeout(() => {
      setCopied((prev) => prev.filter((i) => i !== el.uuid));
    }, 3000);
  };

  if (!list.length)
    return <Alert variant="secondary">No saved data. Create New one!</Alert>;

  return (
    <ListGroup as="ul">
      {list.map((el) => (
        <ListGroup.Item
          key={el.uuid}
          as="li"
          className="d-flex justify-content-between align-items-start"
        >
          <div className="ms-2 me-auto">
            <div className="fw-bold mb-2">{el.title}</div>
            {el.username && (
              <div className="d-flex align-items-start mb-1">
                <i className="bi bi-person-circle me-2"></i>
                {el.username}
              </div>
            )}
            {el.description && (
              <small className="d-flex align-items-start">
                <i className="bi bi-info-circle me-2"></i>
                {el.description}
              </small>
            )}
          </div>
          <Badge
            bg="dark"
            className="me-2"
            pill
            onClick={() => setItemToEdit(el)}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_229_133)">
                <path
                  d="M12.9 6.85796L17.142 11.101L7.242 21H3V16.757L12.9 6.85696V6.85796ZM14.314 5.44396L16.435 3.32196C16.6225 3.13449 16.8768 3.02917 17.142 3.02917C17.4072 3.02917 17.6615 3.13449 17.849 3.32196L20.678 6.15096C20.8655 6.33849 20.9708 6.5928 20.9708 6.85796C20.9708 7.12313 20.8655 7.37743 20.678 7.56496L18.556 9.68596L14.314 5.44396Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_229_133">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </Badge>
          <CopyComponent
            onCopy={() => handleCopy(el)}
            show={copied.includes(el.uuid)}
          />
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
