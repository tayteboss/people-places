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

  transition: opacity var(--transition-speed-slow) ease;
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

  const peopleTimestampRef = useRef<number>(0);
  const placesTimestampRef = useRef<number>(0);

  const peopleTimerRef = useRef<number | null>(null);
  const placesTimerRef = useRef<number | null>(null);

  // Function to start manual timestamp updates for People Audio
  const startPeopleTimer = () => {
    if (peopleTimerRef.current !== null) return;
    peopleTimerRef.current = window.setInterval(() => {
      peopleTimestampRef.current += 0.1; // Increment by 0.1 seconds
      if (peopleAudioRef.current) {
        const duration = peopleAudioRef.current.duration;
        if (peopleTimestampRef.current >= duration) {
          peopleTimestampRef.current = 0; // Loop back to start
        }
      }
      setPeopleAudioTimeStamp(peopleTimestampRef.current);
    }, 100);
  };

  // Function to start manual timestamp updates for Places Audio
  const startPlacesTimer = () => {
    if (placesTimerRef.current !== null) return;
    placesTimerRef.current = window.setInterval(() => {
      placesTimestampRef.current += 0.1; // Increment by 0.1 seconds
      if (placesAudioRef.current) {
        const duration = placesAudioRef.current.duration;
        if (placesTimestampRef.current >= duration) {
          placesTimestampRef.current = 0; // Loop back to start
        }
      }
      setPlacesAudioTimeStamp(placesTimestampRef.current);
    }, 100);
  };

  // Handle People Audio Play/Pause and Time Stamp
  useEffect(() => {
    const audioElement = peopleAudioRef.current;

    if (!audioElement) return;

    if (peopleIsActive) {
      if (soundIsActive) {
        audioElement.currentTime = peopleTimestampRef.current;
        audioElement.play();
        if (peopleTimerRef.current !== null) {
          clearInterval(peopleTimerRef.current);
          peopleTimerRef.current = null;
        }
        window.setInterval(() => {
          setPeopleAudioTimeStamp(audioElement.currentTime);
        }, 100);
      } else {
        audioElement.pause();
        startPeopleTimer();
      }
    } else {
      audioElement.pause();
      if (peopleTimerRef.current !== null) {
        clearInterval(peopleTimerRef.current);
        peopleTimerRef.current = null;
      }
    }

    return () => {
      if (peopleTimerRef.current !== null) {
        clearInterval(peopleTimerRef.current);
      }
    };
  }, [peopleIsActive, soundIsActive, setPeopleAudioTimeStamp]);

  // Handle Places Audio Play/Pause and Time Stamp
  useEffect(() => {
    const audioElement = placesAudioRef.current;

    if (!audioElement) return;

    if (placesIsActive) {
      if (soundIsActive) {
        audioElement.currentTime = placesTimestampRef.current;
        audioElement.play();
        if (placesTimerRef.current !== null) {
          clearInterval(placesTimerRef.current);
          placesTimerRef.current = null;
        }
        window.setInterval(() => {
          setPlacesAudioTimeStamp(audioElement.currentTime);
        }, 100);
      } else {
        audioElement.pause();
        startPlacesTimer();
      }
    } else {
      audioElement.pause();
      if (placesTimerRef.current !== null) {
        clearInterval(placesTimerRef.current);
        placesTimerRef.current = null;
      }
    }

    return () => {
      if (placesTimerRef.current !== null) {
        clearInterval(placesTimerRef.current);
      }
    };
  }, [placesIsActive, soundIsActive, setPlacesAudioTimeStamp]);

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
