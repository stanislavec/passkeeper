import React from "react";
import cn from "classnames";
import "./styles.scss";

interface IButton
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children?: React.ReactNode;
}

function Button(props: IButton) {
  const { children, ...rest } = props;

  const handleClick = !rest.disabled && rest.onClick ? rest.onClick : undefined;

  return (
    <button
      {...rest}
      onClick={handleClick}
      className={cn("button", props.className)}
    >
      {children}
    </button>
  );
}

export default Button;
