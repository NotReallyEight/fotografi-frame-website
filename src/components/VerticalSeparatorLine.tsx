type SeparatorColor = "dustyBlue" | "gold";

type Props = {
  color?: SeparatorColor;
};

const VerticalSeparatorLine = ({ color = "dustyBlue" }: Props) => (
  <span className={`w-px self-stretch bg-${color}`} />
);

export default VerticalSeparatorLine;
