import React from "react";

type Props = {
  steps: {
    description: string;
    icon: React.ReactElement;
    title: string;
  }[];
};

const WorkProcessGrid = ({ steps }: Props) => (
  <div className="flex flex-col md:flex-row w-full border-border border">
    {steps.map((step, index) => (
      <div
        className={`
						flex flex-col
						gap-4 p-8
						${index !== 0 ? "border-t md:border-t-0 md:border-l border-border" : ""}
					`}
        key={`work-process-step-${index}`}
      >
        {step.icon}
        <div
          className={`
						text-white
						font-family-regular-lg
						text-lg md:text-xl lg:text-2xl
						font-bold uppercase
					`}
        >
          {step.title}
        </div>
        <div
          className={`
						font-family-regular-md
						w-[75%] md:w-full
					`}
        >
          {step.description}
        </div>
      </div>
    ))}
  </div>
);

export default WorkProcessGrid;
