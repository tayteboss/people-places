import styled from "styled-components";
import { useEffect, useRef } from "react";
import {
  HomePageType,
  PeopleType,
  PlacesType,
} from "../../../shared/types/types";
import MuxPlayer from "@mux/mux-player-react";
import { motion } from "framer-motion";

const MediaWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 1;

  mux-player {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    position: absolute;
  }
`;

const InnerWrapper = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;

  transition: opacity var(--transition-speed-slow) ease;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    position: relative;
    top: unset;
    left: unset;
  }
`;

type Props = {
  peopleAudio: PeopleType["peopleAudio"];
  placesAudio: PlacesType["placesAudio"];
  heroMedia: HomePageType["heroMedia"];
  peopleIsActive: boolean;
  placesIsActive: boolean;
  readyToInteract: boolean;
  soundIsActive: boolean;
  setPeopleAudioTimeStamp: React.Dispatch<React.SetStateAction<number>>;
  setPlacesAudioTimeStamp: React.Dispatch<React.SetStateAction<number>>;
};

const Media = (props: Props) => {
  const {
    peopleAudio,
    placesAudio,
    heroMedia,
    peopleIsActive,
    placesIsActive,
    readyToInteract,
    setPeopleAudioTimeStamp,
    setPlacesAudioTimeStamp,
    soundIsActive,
  } = props;

  const peopleAudioRef = useRef<HTMLAudioElement | null>(null);
  const placesAudioRef = useRef<HTMLAudioElement | null>(null);

  const peopleAudioIntervalRef = useRef<number | null>(null);
  const placesAudioIntervalRef = useRef<number | null>(null);

  // Handle People Audio Play/Pause and Time Stamp
  useEffect(() => {
    const audioElement = peopleAudioRef.current;

    if (!audioElement) return;

    if (peopleIsActive) {
      audioElement.play();
      peopleAudioIntervalRef.current = window.setInterval(() => {
        setPeopleAudioTimeStamp(audioElement.currentTime);
      }, 100);
    } else {
      audioElement.pause();
      if (peopleAudioIntervalRef.current !== null) {
        clearInterval(peopleAudioIntervalRef.current);
      }
    }

    return () => {
      if (peopleAudioIntervalRef.current !== null) {
        clearInterval(peopleAudioIntervalRef.current);
      }
    };
  }, [peopleIsActive, setPeopleAudioTimeStamp]);

  // Handle Places Audio Play/Pause and Time Stamp
  useEffect(() => {
    const audioElement = placesAudioRef.current;

    if (!audioElement) return;

    if (placesIsActive) {
      audioElement.play();
      placesAudioIntervalRef.current = window.setInterval(() => {
        setPlacesAudioTimeStamp(audioElement.currentTime);
      }, 100);
    } else {
      audioElement.pause();
      if (placesAudioIntervalRef.current !== null) {
        clearInterval(placesAudioIntervalRef.current);
      }
    }

    return () => {
      if (placesAudioIntervalRef.current !== null) {
        clearInterval(placesAudioIntervalRef.current);
      }
    };
  }, [placesIsActive, setPlacesAudioTimeStamp]);

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
            muted={true}
            playsInline={true}
          />
        )}
        <audio
          ref={peopleAudioRef}
          src={peopleAudio?.asset?.url}
          preload="auto"
          loop
          muted={!soundIsActive}
        />
        <audio
          ref={placesAudioRef}
          src={placesAudio?.asset?.url}
          preload="auto"
          loop
          muted={!soundIsActive}
        />
      </InnerWrapper>
    </MediaWrapper>
  );
};

export default Media;
