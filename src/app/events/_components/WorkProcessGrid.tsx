import React from "react";
import {
  FiCamera,
  FiDownloadCloud,
  FiEdit,
  FiMessageSquare,
} from "react-icons/fi";

const WORK_PROCESS_STEPS: {
  description: string;
  icon: React.ReactElement;
  title: string;
}[] = [
  {
    description:
      "Defining goals, visual style, and key moments that must be captured.",
    icon: <FiMessageSquare size={32} className="text-accent" />,
    title: "01. Client Briefing",
  },
  {
    description:
      "Discrete, professional, and comprehensive documentation of your event.",
    icon: <FiCamera size={32} className="text-accent" />,
    title: "02. Event Coverage",
  },
  {
    description:
      "Color grading, editing, and cinematic retouching to our studio standard.",
    icon: <FiEdit size={32} className="text-accent" />,
    title: "03. Post-Production",
  },
  {
    description:
      "Full resolution digital gallery and cinematic highlight reel delivered.",
    icon: <FiDownloadCloud size={32} className="text-accent" />,
    title: "04. Delivery",
  },
];

const WorkProcessGrid = () => (
  <div className="flex flex-col md:flex-row w-full border-border border">
    {WORK_PROCESS_STEPS.map((step, index) => (
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
