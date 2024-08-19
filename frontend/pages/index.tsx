import styled from "styled-components";
import { NextSeo } from "next-seo";
import {
  HomePageType,
  SiteSettingsType,
  TransitionsType,
} from "../shared/types/types";
import { motion } from "framer-motion";
import client from "../client";
import {
  homePageQueryString,
  siteSettingsQueryString,
} from "../lib/sanityQueries";
import Content from "../components/blocks/Content";
import Media from "../components/blocks/Media";
import { useState } from "react";

const PageWrapper = styled(motion.div)`
  height: 100lvh;
  position: relative;
`;

type Props = {
  data: HomePageType;
  siteSettings: SiteSettingsType;
  pageTransitionVariants: TransitionsType;
};

const Page = (props: Props) => {
  const { data, siteSettings, pageTransitionVariants } = props;

  const [peopleIsActive, setPeopleIsActive] = useState(false);
  const [placesIsActive, setPlacesIsActive] = useState(false);

  console.log("data", data);
  console.log("siteSettings", siteSettings);

  return (
    <PageWrapper
      variants={pageTransitionVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <NextSeo
        title={data?.seoTitle || ""}
        description={data?.seoDescription || ""}
      />
      <Content
        peopleTagline={data?.peopleSection?.peopleTagline}
        placesTagline={data?.projectSection?.projectTagline}
        setPlacesIsActive={setPlacesIsActive}
        setPeopleIsActive={setPeopleIsActive}
        peopleIsActive={peopleIsActive}
        placesIsActive={placesIsActive}
      />
      <Media
        peopleMedia={data?.peopleSection?.peopleMedia}
        placesMedia={data?.projectSection?.projectMedia}
        peopleIsActive={peopleIsActive}
        placesIsActive={placesIsActive}
      />
    </PageWrapper>
  );
};

export async function getStaticProps() {
  const siteSettings = await client.fetch(siteSettingsQueryString);
  const data = await client.fetch(homePageQueryString);

  return {
    props: {
      data,
      siteSettings,
    },
  };
}

export default Page;
