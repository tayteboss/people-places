import styled from "styled-components";
import { useEffect } from "react";
import { HomePageType } from "../../../shared/types/types";
import MuxPlayer from "@mux/mux-player-react";
import { motion } from "framer-motion";

const MediaWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 1;
  background: var(--colour-yellow);

  mux-player {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const InnerWrapper = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;

type Props = {
  heroMedia: HomePageType["heroMedia"];
  heroCaptions: HomePageType["heroCaptions"];
  soundIsActive: boolean;
  setHeroMediaTimestamp: React.Dispatch<React.SetStateAction<number>>;
  readyToInteract: boolean;
};

const Media = ({
  heroMedia,
  heroCaptions,
  readyToInteract,
  soundIsActive,
  setHeroMediaTimestamp,
}: Props) => {
  useEffect(() => {
    const video = document.querySelector<HTMLVideoElement>("mux-player");

    const syncCaptionsAndTimestamp = () => {
      const currentTime = video?.currentTime ?? 0;

      setHeroMediaTimestamp(currentTime);
    };

    if (video) {
      video.addEventListener("timeupdate", syncCaptionsAndTimestamp);
    }

    return () => {
      if (video) {
        video.removeEventListener("timeupdate", syncCaptionsAndTimestamp);
      }
    };
  }, [heroCaptions, setHeroMediaTimestamp]);

  return (
    <MediaWrapper>
      <InnerWrapper
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            duration: 1,
            ease: "easeInOut",
            delay: 1.5,
          },
        }}
      >
        {heroMedia?.asset?.playbackId && (
          <MuxPlayer
            streamType="on-demand"
            playbackId={heroMedia?.asset?.playbackId}
            autoPlay="muted"
            loop={true}
            thumbnailTime={1}
            preload="auto"
            paused={!readyToInteract}
            muted={!soundIsActive}
            playsInline={true}
          />
        )}
      </InnerWrapper>
    </MediaWrapper>
  );
};

export default Media;
