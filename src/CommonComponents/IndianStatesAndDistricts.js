// Lazy load the large JSON data to reduce initial bundle size
let statesAndDistrictsData = null;

export const getStatesAndDistricts = async () => {
  if (statesAndDistrictsData) {
    return statesAndDistrictsData;
  }
  
  try {
    const module = await import('./IndianStatesAndDistricts.json');
    statesAndDistrictsData = module.default;
    return statesAndDistrictsData;
  } catch (error) {
    console.error('Error loading states and districts data:', error);
    return [];
  }
};

// Cache the data after first load
export const preloadStatesAndDistricts = () => {
  if (!statesAndDistrictsData) {
    getStatesAndDistricts();
  }
};