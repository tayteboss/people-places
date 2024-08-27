import styled from "styled-components";
import {
  HomePageType,
  ListItemType,
  SiteSettingsType,
} from "../../../shared/types/types";
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";
import pxToRem from "../../../utils/pxToRem";
import formatHTML from "../../../utils/formatHTML";
import { useEffect, useState } from "react";

const CreditsWrapper = styled.div<{ $isInactive: boolean }>`
  position: relative;
  z-index: 10;
  padding-top: calc(100vh + 80px);
  padding-bottom: calc(100vh + 80px);
  opacity: ${(props) => (props.$isInactive ? 0 : 1)};

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
  gap: ${pxToRem(48)};
`;

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
  isInactive: boolean;
};

const Credits = (props: Props) => {
  const {
    introduction,
    team,
    services,
    clients,
    peopleLocationTitle,
    peopleLocationAddress,
    placesLocationTitle,
    placesLocationAddress,
    acknowledgementOfCountry,
    isInactive,
    destroyScroll,
  } = props;

  const [isReady, setIsReady] = useState(false);

  const lenis = useLenis();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (lenis) {
      lenis.options.infinite = true; // Enable infinite scroll
      lenis.options.syncTouch = true; // Sync touch scroll
      lenis.scrollTo(0, 0, 0);
      timer = setTimeout(() => {
        lenis.stop();
      }, 1000);
      timer = setTimeout(() => {
        lenis.start();
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [lenis]);

  useEffect(() => {
    if (destroyScroll && lenis) {
      lenis.destroy();
    }
  }, [destroyScroll, lenis]);

  return (
    <>
      <CreditsWrapper $isInactive={isInactive || !isReady}>
        <ReactLenis root>
          <Inner>
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
          </Inner>
        </ReactLenis>
      </CreditsWrapper>
    </>
  );
};

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${pxToRem(48)};
  width: 30vw;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    width: 100%;
  }
`;

const SectionTitle = styled.h4`
  color: var(--colour-black);
  text-transform: uppercase;
`;

const SectionContent = styled.p<{ $useDark: boolean }>`
  opacity: ${(props) => !props.$useDark && "0.25"};
  text-align: center;
`;

const ListWrapper = styled.div`
  width: 100%;
`;

const ListInner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${pxToRem(10)};
`;

const ListTitle = styled.p`
  opacity: 0.25;
  flex: 1;
  text-align: right;
  white-space: nowrap;
`;

const ListLink = styled.a`
  text-decoration: none;
  flex: 1;
  white-space: nowrap;

  &:hover {
    text-decoration: underline;
  }
`;

const ListName = styled.p`
  flex: 1;
  white-space: nowrap;
`;

export const Section = (props: {
  title: string;
  content?: string;
  list?: ListItemType[];
  useDark?: boolean;
}) => {
  const { title, content, list, useDark } = props;
  return (
    <SectionWrapper>
      <SectionTitle className="type-p">{title}</SectionTitle>
      {content && <SectionContent $useDark={useDark}>{content}</SectionContent>}
      {list && list.length > 0 && (
        <ListWrapper>
          {list.map((item: ListItemType, i: number) => (
            <ListInner key={i}>
              {item?.title && <ListTitle>{item?.title}</ListTitle>}
              {item?.link && (
                <ListLink href={item?.link || ""} target="_blank">
                  {item?.name || ""}
                </ListLink>
              )}
              {item?.name && !item?.link && <ListName>{item?.name}</ListName>}
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
`;

const LocationContent = styled.div`
  opacity: 0.25;
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

export default Credits;
