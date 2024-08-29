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
    position: absolute;
  }
`;

const Captions = styled.h2``;

const TimestampHelperWrapper = styled.div`
  position: absolute;
  top: -50px;
  left: 50%;
  transform: translateX(-50%);
  background: white;
`;

const TimestampHelper = styled.p`
  color: red;
`;

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

type Subtitle = {
  start: number;
  end: number;
  content: string;
};

type Props = {
  peopleVideoTimeStamp: number;
  placesVideoTimeStamp: number;
  peopleIsActive: boolean;
  placesIsActive: boolean;
  peopleCaptions: CaptionType[];
  placesCaptions: CaptionType[];
};

const SubTitles = (props: Props) => {
  const {
    peopleVideoTimeStamp,
    placesVideoTimeStamp,
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
    peopleVideoTimeStamp
  );
  const placesSubtitle = getCurrentSubtitle(
    placesCaptions,
    placesVideoTimeStamp
  );

  return (
    <SubTitlesWrapper
      variants={wrapperVariants}
      initial="hidden"
      animate={peopleIsActive || placesIsActive ? "visible" : "hidden"}
    >
      {/* <TimestampHelperWrapper>
        <TimestampHelper>
          People Media Timestamp: {peopleVideoTimeStamp}
        </TimestampHelper>
        <TimestampHelper>
          Places Media Timestamp: {placesVideoTimeStamp}
        </TimestampHelper>
      </TimestampHelperWrapper> */}
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
