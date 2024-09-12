import styled from "styled-components";
import pxToRem from "../../../utils/pxToRem";
import { CaptionType } from "../../../shared/types/types";
import { motion } from "framer-motion";

const SubTitlesWrapper = styled(motion.div)`
  position: fixed;
  bottom: ${pxToRem(32)};
  left: 50%;
  text-align: center;
  transform: translateX(-50%);
  width: 100%;
  max-width: ${pxToRem(900)};
  width: 100%;
  padding: 0 ${pxToRem(32)};
  z-index: 20;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    bottom: 50%;
    transform: translate(-50%, 50%);
  }
`;

const Captions = styled.h2``;

const wrapperVariants = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
      delay: 1,
    },
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
      delay: 1,
    },
  },
};

type Props = {
  peopleAudioTimeStamp: number;
  placesAudioTimeStamp: number;
  peopleIsActive: boolean;
  placesIsActive: boolean;
  peopleCaptions: CaptionType[];
  placesCaptions: CaptionType[];
};

const SubTitles = (props: Props) => {
  const {
    peopleAudioTimeStamp,
    placesAudioTimeStamp,
    peopleIsActive,
    placesIsActive,
    peopleCaptions,
    placesCaptions,
  } = props;

  // Function to get the current subtitle based on the timestamp and the captions array
  const getCurrentSubtitle = (
    captions: CaptionType[],
    currentTime: number
  ): string => {
    const currentSub = captions.find(
      (subtitle) => currentTime >= subtitle.start && currentTime <= subtitle.end
    );
    return currentSub ? currentSub.caption : "";
  };

  // Get the current subtitles for both people and places videos
  const peopleSubtitle = getCurrentSubtitle(
    peopleCaptions,
    peopleAudioTimeStamp
  );
  const placesSubtitle = getCurrentSubtitle(
    placesCaptions,
    placesAudioTimeStamp
  );

  return (
    <SubTitlesWrapper
      variants={wrapperVariants}
      initial="hidden"
      animate={peopleIsActive || placesIsActive ? "visible" : "hidden"}
    >
      {peopleIsActive && (
        <Captions className="outline-text">{peopleSubtitle}</Captions>
      )}
      {placesIsActive && (
        <Captions className="outline-text">{placesSubtitle}</Captions>
      )}
    </SubTitlesWrapper>
  );
};

export default SubTitles;
