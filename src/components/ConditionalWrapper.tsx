import type { JSX } from "react";

type Props = {
  children: React.ReactNode;
  condition: boolean;
  wrapper: (children: React.ReactNode) => JSX.Element;
};

const ConditionalWrapper = ({ children, condition, wrapper }: Props) =>
  condition ? wrapper(children) : <>{children}</>;

export default ConditionalWrapper;
