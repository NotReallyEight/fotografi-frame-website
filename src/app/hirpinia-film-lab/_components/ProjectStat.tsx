type Props = {
  stat: [string, string];
  index: number;
};

const ProjectStat = ({ stat, index }: Props) => (
  <div
    key={`project-stat-${index}`}
    className="flex flex-col items-center justify-center stat"
  >
    <div
      className={`font-family-secondary lg:font-family-header ${index % 2 === 0 ? "text-red-300" : ""}`}
    >
      0
    </div>
    <div
      className="font-family-regular-lg
              text-base md:text-xl lg:text-2xl
              font-bold uppercase text-white"
    >
      {stat[1]}
    </div>
  </div>
);

export default ProjectStat;
