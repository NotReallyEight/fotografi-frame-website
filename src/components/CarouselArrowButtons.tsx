"use client";

import type { PropsWithChildren } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

type PropType = PropsWithChildren<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
>;

export const PrevButton: React.FC<PropType> = (props) => {
  const { children, disabled, ...restProps } = props;

  return (
    <button
      className={disabled ?? false ? "cursor-not-allowed" : "cursor-pointer"}
      type="button"
      {...restProps}
    >
      <FaArrowLeft
        className={
          disabled ?? false ? "carousel-icon-disabled" : "carousel-icon-enabled"
        }
      />
      {children}
    </button>
  );
};

export const NextButton: React.FC<PropType> = (props) => {
  const { children, disabled, ...restProps } = props;

  return (
    <button
      className={disabled ?? false ? "cursor-not-allowed" : "cursor-pointer"}
      type="button"
      {...restProps}
    >
      <FaArrowRight
        className={
          disabled ?? false ? "carousel-icon-disabled" : "carousel-icon-enabled"
        }
      />
      {children}
    </button>
  );
};
