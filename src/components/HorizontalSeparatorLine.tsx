type SeparatorColor = "gold" | "white";

const colorClassMap: Record<SeparatorColor, string> = {
  white: "bg-white",
  gold: "bg-gold",
};

type Props = {
  color?: SeparatorColor;
  hideOnDesktop?: boolean;
};

const HorizontalSeparatorLine = ({
  color = "gold",
  hideOnDesktop = true,
}: Props) => (
  <span
    className={`h-px w-full ${colorClassMap[color]} ${hideOnDesktop ? "lg:hidden" : ""}`}
  />
);

export default HorizontalSeparatorLine;
