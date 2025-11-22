type SeparatorColor = "dustyBlue" | "gold";

const colorClassMap: Record<SeparatorColor, string> = {
  dustyBlue: "bg-dusty-blue",
  gold: "bg-gold",
};

type Props = {
  color?: SeparatorColor;
};

const VerticalSeparatorLine = ({ color = "dustyBlue" }: Props) => (
  <span className={`w-px self-stretch ${colorClassMap[color]}`} />
);

export default VerticalSeparatorLine;
