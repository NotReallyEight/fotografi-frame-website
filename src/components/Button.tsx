import React, { Activity } from "react";

type Props = {
  className?: string;
  fullWidth?: boolean;
  href?: string;
  icon?: React.ReactElement;
  text: string;
  onClick?: () => void;
  primary?: boolean;
};

const Button = ({
  className,
  fullWidth,
  href,
  icon,
  text,
  onClick,
  primary = true,
}: Props) => {
  if (href)
    return (
      <a
        className={`
        ${
          primary
            ? "bg-white text-primary hover:bg-primary hover:text-white"
            : "bg-primary text-white hover:bg-white hover:text-primary"
        }
        p-4 font-family-button
        ${fullWidth ? "w-full" : "w-fit"} h-fit
        border-2 border-white
        duration-(--transition-duration)
        cursor-pointer
        flex flex-row items-center justify-center space-x-4
        ${className ?? ""}
      `}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Activity mode={icon !== undefined ? "visible" : "hidden"}>
          <div>{icon}</div>
        </Activity>
        <div>{text}</div>
      </a>
    );

  return (
    <button
      className={`
        ${
          primary
            ? "bg-white text-primary hover:bg-primary hover:text-white"
            : "bg-primary text-white hover:bg-white hover:text-primary"
        }
        p-4 font-family-button
        ${fullWidth ? "w-full" : "w-fit"} h-fit
        border-2 border-white
        duration-(--transition-duration)
        cursor-pointer
        flex flex-row items-center justify-center space-x-4
        ${className ?? ""}
      `}
      type="submit"
      onClick={onClick}
    >
      <Activity mode={icon !== undefined ? "visible" : "hidden"}>
        <div>{icon}</div>
      </Activity>
      <div>{text}</div>
    </button>
  );
};

export default Button;
