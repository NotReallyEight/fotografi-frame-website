import React from "react";

type Props = {
  className?: string;
  title: string;
  videoId: string;
};

const YouTubeEmbed: React.FC<Props> = ({ className, title, videoId }) => (
  <iframe
    src={`https://www.youtube.com/embed/${videoId}`}
    title={title}
    className={["aspect-video w-[90dvw] md:w-[80dvw]", className].join(" ")}
  />
);

export default YouTubeEmbed;
