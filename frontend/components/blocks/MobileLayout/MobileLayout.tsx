import styled from "styled-components";
import {
  CaptionType,
  HomePageType,
  PeopleType,
  PlacesType,
  SiteSettingsType,
} from "../../../shared/types/types";
import { VideoSlot } from "../Media/Media";
import pxToRem from "../../../utils/pxToRem";
import SubTitles from "../SubTitles";
import { LocationSection, Section } from "../Credits/Credits";
import { motion } from "framer-motion";

const MobileLayoutWrapper = styled.div`
  display: none;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    position: fixed;
    z-index: 20;
    background: var(--colour-yellow);
  }
`;

const MobileTriggerWrapper = styled.div<{
  $isActive: boolean;
  $useScroll?: boolean;
}>`
  width: 100%;
  flex: ${(props) => (props.$isActive ? "7" : "1")};
  height: 100%;
  position: relative;
  overflow-y: ${(props) => props.$isActive && props.$useScroll && "auto"};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  transition: all var(--transition-speed-slow) var(--transition-ease);

  &:not(:first-child) {
    border-top: 1px solid var(--colour-black);
  }
`;

const Trigger = styled.button<{ $readyToInteract: boolean; $hide?: boolean }>`
  white-space: pre;
  text-align: center;
  pointer-events: ${(props) => (props.$readyToInteract ? "all" : "none")};
  opacity: ${(props) => props.$hide && "0"};
  z-index: 10;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    &.type-h1 {
      font-size: ${pxToRem(32)};
      line-height: ${pxToRem(37)};
    }
  }
`;

const MediaInnerWrapper = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;

  mux-player {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const InformationInner = styled.div<{ $isActive: boolean }>`
  margin: 0 auto;
  opacity: ${(props) => (props.$isActive ? 1 : 0)};
  width: 100%;
  padding: ${pxToRem(24)};
`;

const InformationScroll = styled.div`
  max-height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${pxToRem(48)};
`;

const wrapperVariants = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
      delay: 0,
    },
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
      delay: 0.4,
    },
  },
};

type Props = {
  peopleIsActive: boolean;
  placesIsActive: boolean;
  informationIsActive: boolean;
  setPeopleIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  setPlacesIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  setInformationIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  introduction: SiteSettingsType["introduction"];
  team: SiteSettingsType["team"];
  services: SiteSettingsType["services"];
  clients: SiteSettingsType["clients"];
  peopleLocationTitle: HomePageType["peopleSection"]["peopleLocationTitle"];
  peopleLocationAddress: HomePageType["peopleSection"]["peopleLocationAddress"];
  placesLocationTitle: HomePageType["placesSection"]["placesLocationTitle"];
  placesLocationAddress: HomePageType["placesSection"]["placesLocationAddress"];
  acknowledgementOfCountry: SiteSettingsType["acknowledgementOfCountry"];
  peopleMedia: PeopleType["peopleMedia"];
  placesMedia: PlacesType["placesMedia"];
  setPeopleVideoTimeStamp: React.Dispatch<React.SetStateAction<number>>;
  setPlacesVideoTimeStamp: React.Dispatch<React.SetStateAction<number>>;
  peopleVideoTimeStamp: number;
  placesVideoTimeStamp: number;
  peopleCaptions: CaptionType[];
  placesCaptions: CaptionType[];
  readyToInteract: boolean;
};

const MobileLayout = (props: Props) => {
  const {
    setPlacesIsActive,
    setPeopleIsActive,
    setInformationIsActive,
    placesIsActive,
    peopleIsActive,
    informationIsActive,
    peopleMedia,
    placesMedia,
    setPeopleVideoTimeStamp,
    setPlacesVideoTimeStamp,
    peopleVideoTimeStamp,
    placesVideoTimeStamp,
    peopleCaptions,
    placesCaptions,
    introduction,
    team,
    services,
    clients,
    peopleLocationTitle,
    peopleLocationAddress,
    placesLocationTitle,
    placesLocationAddress,
    acknowledgementOfCountry,
    readyToInteract,
  } = props;

  return (
    <MobileLayoutWrapper>
      {/* PEOPLE BELOW */}
      <MobileTriggerWrapper
        onClick={() => {
          setPeopleIsActive(!peopleIsActive);
          setPlacesIsActive(false);
          setInformationIsActive(false);
        }}
        $isActive={peopleIsActive}
      >
        <Trigger
          className="type-h1 outline-text"
          $readyToInteract={readyToInteract}
          $hide={false}
        >
          People
        </Trigger>
        <MediaInnerWrapper
          variants={wrapperVariants}
          initial="hidden"
          animate={peopleIsActive ? "visible" : "hidden"}
        >
          <VideoSlot
            playbackId={peopleMedia?.asset?.playbackId}
            isActive={peopleIsActive}
            setVideoTimeStamp={setPeopleVideoTimeStamp}
          />
        </MediaInnerWrapper>
        {peopleIsActive && (
          <SubTitles
            peopleVideoTimeStamp={peopleVideoTimeStamp}
            placesVideoTimeStamp={placesVideoTimeStamp}
            peopleIsActive={peopleIsActive}
            placesIsActive={placesIsActive}
            peopleCaptions={peopleCaptions}
            placesCaptions={placesCaptions}
          />
        )}
      </MobileTriggerWrapper>

      {/* PLACES BELOW */}
      <MobileTriggerWrapper
        onClick={() => {
          setPlacesIsActive(!placesIsActive);
          setPeopleIsActive(false);
          setInformationIsActive(false);
        }}
        $isActive={placesIsActive}
      >
        <Trigger
          className="type-h1 outline-text"
          $readyToInteract={readyToInteract}
          $hide={false}
        >
          Places
        </Trigger>
        <MediaInnerWrapper
          variants={wrapperVariants}
          initial="hidden"
          animate={placesIsActive ? "visible" : "hidden"}
        >
          <VideoSlot
            playbackId={placesMedia?.asset?.playbackId}
            isActive={placesIsActive}
            setVideoTimeStamp={setPlacesVideoTimeStamp}
          />
        </MediaInnerWrapper>
        {placesIsActive && (
          <SubTitles
            peopleVideoTimeStamp={peopleVideoTimeStamp}
            placesVideoTimeStamp={placesVideoTimeStamp}
            peopleIsActive={peopleIsActive}
            placesIsActive={placesIsActive}
            peopleCaptions={peopleCaptions}
            placesCaptions={placesCaptions}
          />
        )}
      </MobileTriggerWrapper>

      {/* INFORMATION BELOW */}
      <MobileTriggerWrapper
        onClick={() => {
          setInformationIsActive(!informationIsActive);
          setPlacesIsActive(false);
          setPeopleIsActive(false);
        }}
        $isActive={informationIsActive}
        $useScroll={true}
      >
        <Trigger
          className="type-h1 outline-text"
          $readyToInteract={readyToInteract}
          $hide={informationIsActive}
        >
          Information
        </Trigger>
        {informationIsActive && (
          <InformationInner $isActive={informationIsActive}>
            <InformationScroll>
              <Section title="People, Places" content={introduction} useDark />
              <Section title="Team" list={team} />
              <LocationSection
                title1={peopleLocationTitle}
                title2={placesLocationTitle}
                address1={peopleLocationAddress}
                address2={placesLocationAddress}
              />
              <Section title="Services" list={services} />
              <Section title="Clients" list={clients} />
              <Section
                title="Acknowledgement of Country"
                content={acknowledgementOfCountry}
                useDark
              />
            </InformationScroll>
          </InformationInner>
        )}
      </MobileTriggerWrapper>
    </MobileLayoutWrapper>
  );
};

export default MobileLayout;
