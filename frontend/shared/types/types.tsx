export type MediaType = {
  asset: { playbackId: string };
};

export type TransitionsType = {
  hidden: {
    opacity: number;
    transition: {
      duration: number;
    };
  };
  visible: {
    opacity: number;
    transition: {
      duration: number;
      delay?: number;
    };
  };
};

export type ButtonType = {
  url: string;
  pageReference: {
    _ref: string;
  };
  title: string;
};

export type SlugType = {
  current: string;
};

export type SiteSettingsType = {};

export type HomePageType = {
  seoTitle: string;
  seoDescription: string;
  peopleSection: PeopleType;
  projectSection: PlacesType;
};

export type WorkPageType = {
  seoTitle: string;
  seoDescription: string;
};

export type PlacesType = {
  projectMedia: MediaType;
  projectTagline: string;
};

export type PeopleType = {
  peopleMedia: MediaType;
  peopleTagline: string;
};
