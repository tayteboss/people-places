import styled from "styled-components";
import { PeopleType, PlacesType } from "../../../shared/types/types";
import MuxPlayer from "@mux/mux-player-react";
import { useEffect, useRef, useState } from "react";

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

const InnerWrapper = styled.div<{ $isActive: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  opacity: ${(props) => (props.$isActive ? 1 : 0)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    position: relative;
    top: unset;
    left: unset;
  }
`;

type Props = {
  peopleMedia: PeopleType["peopleMedia"];
  placesMedia: PlacesType["placesMedia"];
  peopleIsActive: boolean;
  placesIsActive: boolean;
  setPeopleVideoTimeStamp: React.Dispatch<React.SetStateAction<number>>;
  setPlacesVideoTimeStamp: React.Dispatch<React.SetStateAction<number>>;
  muted: boolean;
};

export const Media = (props: Props) => {
  const {
    peopleMedia,
    placesMedia,
    peopleIsActive,
    placesIsActive,
    setPeopleVideoTimeStamp,
    setPlacesVideoTimeStamp,
    muted,
  } = props;

  return (
    <MediaWrapper>
      <InnerWrapper $isActive={peopleIsActive}>
        <VideoSlot
          playbackId={peopleMedia?.asset?.playbackId}
          isActive={peopleIsActive}
          setVideoTimeStamp={setPeopleVideoTimeStamp}
          muted={muted}
        />
      </InnerWrapper>
      <InnerWrapper $isActive={placesIsActive}>
        <VideoSlot
          playbackId={placesMedia?.asset?.playbackId}
          isActive={placesIsActive}
          setVideoTimeStamp={setPlacesVideoTimeStamp}
          muted={muted}
        />
      </InnerWrapper>
    </MediaWrapper>
  );
};

type SlotProps = {
  playbackId: string;
  isActive: boolean;
  setVideoTimeStamp: React.Dispatch<React.SetStateAction<number>>;
  muted: boolean;
};

export const VideoSlot = ({
  playbackId,
  isActive,
  setVideoTimeStamp,
  muted,
}: SlotProps) => {
  const playerRef = useRef<any>(null);
  const [hasHovered, setHasHovered] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current && isActive) {
        setVideoTimeStamp(playerRef.current.currentTime);
      }
    }, 250);

    return () => clearInterval(interval);
  }, [playerRef, isActive, setVideoTimeStamp]);

  useEffect(() => {
    if (isActive && !hasHovered) {
      // First hover, reset video to start
      if (playerRef.current) {
        playerRef.current.currentTime = 0;
      }
      setHasHovered(true);
    }
  }, [isActive, hasHovered]);

  useEffect(() => {
    if (muted) {
      if (playerRef.current) {
        playerRef.current.muted = true;
      }
    } else {
      if (playerRef.current) {
        playerRef.current.muted = false;
      }
    }
  }, [muted, playerRef]);

  return (
    <>
      {playbackId && (
        <MuxPlayer
          ref={playerRef}
          streamType="on-demand"
          playbackId={playbackId}
          autoPlay="muted"
          loop={true}
          paused={!isActive}
          thumbnailTime={1}
          preload="auto"
          muted={muted}
          playsInline={true}
        />
      )}
    </>
  );
};
