import React from "react";
import cn from "classnames";
import "./styles.scss";

interface IInput
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
}

function Input(props: IInput) {
  const { label, ...rest } = props;
  return (
    <div className={cn("input", props.className)}>
      {label && <span>{label}</span>}
      <input {...rest}></input>
    </div>
  );
}

export default Input;
