export const mediaString = `
	...,
	mediaType,
	image {
		asset-> {
			url,
			metadata {
				lqip
			}
		},
		alt
	},
	video {
		asset-> {
			playbackId,
		},
	},
	mobileImage {
		asset-> {
			url,
			metadata {
				lqip
			}
		},
		alt
	},
	mobileVideo {
		asset-> {
			playbackId,
		},
	},
`;

export const siteSettingsQueryString = `
	*[_type == 'siteSettings'][0] {
		...,
		clients[]-> {
			...,
		},
		team[]-> {
			...,
		},
		services[]-> {
			...,
		}
	}
`;

export const homePageQueryString = `
	*[_type == 'homePage'][0] {
		peopleSection {
		...,
			peopleMedia {
				asset-> {
					playbackId,
				},
			},
			peopleLocationTitle,
			peopleLocationAddress,
		},
		placesSection {
			placesMedia {
				asset-> {
					playbackId,
				},
			},
			placesLocationTitle,
			placesLocationAddress,
		},
	}
`;

export const workPageQueryString = `
	*[_type == "workPage"] {
		...,
		seoTitle,
		seoDescription,
	}
`;

export const projectsQueryString = `
	*[_type == 'project'] | order(orderRank) [0...100] {
		...,
	}
`;
