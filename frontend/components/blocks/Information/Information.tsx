import styled from "styled-components";
import {
  HomePageType,
  ListItemType,
  SiteSettingsType,
} from "../../../shared/types/types";
import pxToRem from "../../../utils/pxToRem";
import formatHTML from "../../../utils/formatHTML";
import { AnimatePresence, motion } from "framer-motion";

const InformationWrapper = styled(motion.section)`
  position: relative;
  z-index: 10;
  padding-top: 20vh;
  padding-bottom: 20vh;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    display: none;
  }
`;

const Inner = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${pxToRem(24)};
`;

const wrapperVariants = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

type Props = {
  introduction: SiteSettingsType["introduction"];
  team: SiteSettingsType["team"];
  services: SiteSettingsType["services"];
  clients: SiteSettingsType["clients"];
  peopleLocationTitle: HomePageType["peopleSection"]["peopleLocationTitle"];
  peopleLocationAddress: HomePageType["peopleSection"]["peopleLocationAddress"];
  placesLocationTitle: HomePageType["placesSection"]["placesLocationTitle"];
  placesLocationAddress: HomePageType["placesSection"]["placesLocationAddress"];
  acknowledgementOfCountry: SiteSettingsType["acknowledgementOfCountry"];
  isActive: boolean;
};

const Information = (props: Props) => {
  const {
    isActive,
    introduction,
    team,
    services,
    clients,
    peopleLocationTitle,
    peopleLocationAddress,
    placesLocationTitle,
    placesLocationAddress,
    acknowledgementOfCountry,
  } = props;

  return (
    <AnimatePresence>
      {isActive && (
        <InformationWrapper
          variants={wrapperVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <Inner>
            <Section title="People, Places" content={introduction} />
            <Section title="Team" list={team} />
            <LocationSection
              title1={peopleLocationTitle}
              title2={placesLocationTitle}
              address1={peopleLocationAddress}
              address2={placesLocationAddress}
            />
            <Section title="Services" list={services} useColumn />
            <Section title="Clients" list={clients} useCenter />
            {acknowledgementOfCountry && (
              <Section
                title="Acknowledgement of Country"
                content={acknowledgementOfCountry}
              />
            )}
          </Inner>
        </InformationWrapper>
      )}
    </AnimatePresence>
  );
};

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${pxToRem(24)};
  width: 30vw;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    width: 100%;
  }
`;

const SectionTitle = styled.h4`
  color: var(--colour-yellow);
  text-transform: uppercase;
  position: relative;

  &.type-p {
    font-family: var(--font-default);
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 1px;
    background: var(--colour-yellow);
    transform-origin: left;
    transition: transform 0.3s ease;
  }
`;

const SectionContent = styled.p`
  text-align: center;
  color: var(--colour-yellow);
  font-family: var(--font-default);
`;

const ListWrapper = styled.div`
  width: 100%;
`;

const ListInner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${pxToRem(12)};
`;

const ListTitle = styled.p`
  flex: 1;
  text-align: right;
  white-space: nowrap;
  color: var(--colour-yellow);
  font-family: var(--font-default);
`;

const ListLink = styled.a<{ $useCenter: boolean }>`
  text-decoration: none;
  flex: 1;
  white-space: nowrap;
  color: var(--colour-yellow);
  font-family: var(--font-default);
  text-align: ${(props) => props.$useCenter && "center"};

  &:hover {
    text-decoration: underline;
  }
`;

const ListName = styled.p<{ $useCenter: boolean }>`
  flex: 1;
  white-space: nowrap;
  color: var(--colour-yellow);
  font-family: var(--font-default);
  text-align: ${(props) => props.$useCenter && "center"};
`;

const ColumnWrapper = styled.div`
  columns: 3;
  column-gap: ${pxToRem(12)};
`;

const Column = styled.div`
  min-width: ${pxToRem(150)};
`;

export const Section = (props: {
  title: string;
  content?: string;
  list?: ListItemType[];
  useCenter?: boolean;
  useColumn?: boolean;
}) => {
  const { title, content, list, useCenter, useColumn } = props;
  return (
    <SectionWrapper>
      <SectionTitle className="type-p">{title}</SectionTitle>
      {content && <SectionContent>{content}</SectionContent>}
      {useColumn && list && list.length > 0 && (
        <ColumnWrapper>
          {list.map((item, i) => (
            <Column key={i}>
              <ListName $useCenter={true}>
                <>{item || ""}</>
              </ListName>
            </Column>
          ))}
        </ColumnWrapper>
      )}
      {!useColumn && list && list.length > 0 && (
        <ListWrapper>
          {list.map((item: ListItemType, i: number) => (
            <ListInner key={i}>
              {item?.title && <ListTitle>{item?.title}</ListTitle>}
              {item?.link && (
                <ListLink
                  $useCenter={useCenter || false}
                  href={item?.link || ""}
                  target="_blank"
                >
                  {item?.name || ""}
                </ListLink>
              )}
              {item?.name && !item?.link && (
                <ListName $useCenter={useCenter || false}>
                  {item?.name}
                </ListName>
              )}
            </ListInner>
          ))}
        </ListWrapper>
      )}
    </SectionWrapper>
  );
};

const LocationSectionWrapper = styled.div`
  display: flex;
  width: 33vw;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    width: 100%;
  }
`;

const LocationInner = styled.div`
  flex: 1;
  width: 50%;
  text-align: center;
`;

const LocationTitle = styled.h4`
  margin-bottom: ${pxToRem(10)};
  text-transform: uppercase;
  font-family: var(--font-default);
  color: var(--colour-yellow);
  text-decoration: underline;
`;

const LocationContent = styled.div`
  * {
    font-family: var(--font-default);
    color: var(--colour-yellow);
  }
`;

export const LocationSection = (props: {
  title1: string;
  title2: string;
  address1: string;
  address2: string;
}) => {
  const { title1, title2, address1, address2 } = props;
  return (
    <LocationSectionWrapper>
      <LocationInner>
        <LocationTitle className="type-p">{title1}</LocationTitle>
        {address1 && (
          <LocationContent
            dangerouslySetInnerHTML={{ __html: formatHTML(address1) }}
          />
        )}
      </LocationInner>
      <LocationInner>
        <LocationTitle className="type-p">{title2}</LocationTitle>
        {address2 && (
          <LocationContent
            dangerouslySetInnerHTML={{ __html: formatHTML(address2) }}
          />
        )}
      </LocationInner>
    </LocationSectionWrapper>
  );
};

export default Information;
