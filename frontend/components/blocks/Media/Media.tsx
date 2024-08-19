import styled from "styled-components";
import { PeopleType, PlacesType } from "../../../shared/types/types";
import MuxPlayer from "@mux/mux-player-react";

const MediaWrapper = styled.div`
  position: absolute;
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
`;

const InnerWrapper = styled.div<{ $isActive: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  opacity: ${(props) => (props.$isActive ? 1 : 0)};
`;

type Props = {
  peopleMedia: PeopleType["peopleMedia"];
  placesMedia: PlacesType["projectMedia"];
  peopleIsActive: boolean;
  placesIsActive: boolean;
};

const Media = (props: Props) => {
  const { peopleMedia, placesMedia, peopleIsActive, placesIsActive } = props;

  console.log("placesMedia", placesMedia);
  console.log("placesIsActive", placesIsActive);

  return (
    <MediaWrapper>
      <InnerWrapper $isActive={peopleIsActive}>
        <MuxPlayer
          streamType="on-demand"
          playbackId={peopleMedia?.asset?.playbackId}
          autoPlay="muted"
          loop={true}
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
