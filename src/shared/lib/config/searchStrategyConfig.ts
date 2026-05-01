 const SEARCH_CONFIG = {
  jobApplications: {
    position: 100,
    company: 50,
    location: 25,
    notes: 10,
    other: 5,
  }
};

export const searchStrategyConfig = SEARCH_CONFIG;

// Automatically generate a type that represents the searchable properties for each entity based on the SEARCH_CONFIG
// This prevents search properties from getting out of sync with the config and provides type safety when implementing the search function.
export type searchablesType = {[k in keyof typeof SEARCH_CONFIG]: (keyof typeof SEARCH_CONFIG[k])[]};