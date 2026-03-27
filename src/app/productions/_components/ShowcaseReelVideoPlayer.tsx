"use client";

import { createPlayer, videoFeatures } from "@videojs/react";
import { VideoSkin, Video } from "@videojs/react/video";
import { useMemo } from "react";

const REEL_VIDEO: {
  poster: string;
  src: string;
} = {
  poster:
    "https://cdn.antoniowang.dev/Screenshot%202026-03-24%20at%2022.27.59.png",
  src: "https://cdn.antoniowang.dev/Soggetti%20Erotici%20-%20Ah%20ah%20ah%20(Official%20Video)%20%5BKWAXNLzGk9g%5D.webm",
};

const ShowcaseReelVideoPlayer = () => {
  const Player = useMemo(
    () =>
      createPlayer({
        features: videoFeatures.filter(
          (feature) => !["pip", "playbackRate"].includes(feature.name ?? "")
        ),
      }),
    []
  );

  return (
    <Player.Provider>
      <VideoSkin poster={REEL_VIDEO.poster} className="border-none">
        <Video src={REEL_VIDEO.src} playsInline muted />
      </VideoSkin>
    </Player.Provider>
  );
};

export default ShowcaseReelVideoPlayer;
