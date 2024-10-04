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
  padding: 0 ${pxToRem(32)};
  z-index: 20;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    bottom: 50%;
    transform: translate(-50%, 50%);
  }
`;

const Captions = styled.h2<{ $isActive: boolean }>`
  opacity: ${(props) => (props.$isActive ? 1 : 0)};

  transition: all var(--transition-speed-default) var(--transition-ease);
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

type Props = {
  heroCaptions: CaptionType[];
  heroMediaTimestamp: number;
  isActive: boolean;
};

const SubTitles = ({ heroCaptions, heroMediaTimestamp, isActive }: Props) => {
  const getCurrentSubtitle = (
    captions: CaptionType[],
    currentTime: number
  ): string => {
    const currentSub = captions.find(
      (subtitle) => currentTime >= subtitle.start && currentTime <= subtitle.end
    );
    return currentSub ? currentSub.caption : "";
  };

  const currentSubtitle = getCurrentSubtitle(heroCaptions, heroMediaTimestamp);

  return (
    <SubTitlesWrapper
      variants={wrapperVariants}
      initial="hidden"
      animate={currentSubtitle ? "visible" : "hidden"}
    >
      {currentSubtitle && (
        <Captions className="outline-text" $isActive={isActive}>
          {currentSubtitle}
        </Captions>
      )}
    </SubTitlesWrapper>
  );
};

export default SubTitles;
