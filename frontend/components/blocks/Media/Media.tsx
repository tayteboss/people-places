import styled from "styled-components";
import { PeopleType, PlacesType } from "../../../shared/types/types";
import MuxPlayer from "@mux/mux-player-react";

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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
};

const Media = (props: Props) => {
  const { peopleMedia, placesMedia, peopleIsActive, placesIsActive } = props;

  return (
    <MediaWrapper>
      <InnerWrapper $isActive={peopleIsActive}>
        <MuxPlayer
          streamType="on-demand"
          playbackId={peopleMedia?.asset?.playbackId}
          autoPlay="muted"
          loop={true}
          paused={!peopleIsActive}
          thumbnailTime={1}
          preload="auto"
          muted
          playsInline={true}
          // poster={`${posterUrl}`}
        />
      </InnerWrapper>
      <InnerWrapper $isActive={placesIsActive}>
        <MuxPlayer
          streamType="on-demand"
          playbackId={placesMedia?.asset?.playbackId}
          autoPlay="muted"
          loop={true}
          paused={!placesIsActive}
          thumbnailTime={1}
          preload="auto"
          muted
          playsInline={true}
          // poster={`${posterUrl}`}
        />
      </InnerWrapper>
    </MediaWrapper>
  );
};

export default Media;
