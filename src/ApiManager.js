import { hitDetailGame, hitGetGames, hitPagination, hitScreenshotsGame, hitTrailerGame } from "./Api";

export const getRecommend = async () => {
  try {
    const response = await hitGetGames(1, 10);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching game recommendations:", error);
    return [];
  }
};

export const getPopularGame = async () => {
  try {
    const response = await hitGetGames(4, 10);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching game recommendations:", error);
    return [];
  }
};

export const getMiniGameList = async () => {
  try {
    const response = await hitGetGames(5, 12);
    console.log(response.data.results)

    return response.data.results;
    
  } catch (error) {
    console.error("Error fetching game recommendations:", error);
    return [];
  }
};

export const getMultiplayerGame = async () => {
  try {
    const response = await hitGetGames(7, 12);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching game recommendations:", error);
    return [];
  }
};

export const getSingleplayerGame = async () => {
  try {
    const response = await hitGetGames(8, 12);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching game recommendations:", error);
    return [];
  }
};

export const getBoardGame = async () => {
  try {
    const response = await hitGetGames(11, 4);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching game recommendations:", error);
    return [];
  }
};

export const getFightingGame = async () => {
  try {
    const response = await hitGetGames(12, 4);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching game recommendations:", error);
    return [];
  }
};


export const getDetailGame = async (slug) => {
  try {
    const response = await hitDetailGame(slug);
    return response.data;
  } catch (error) {
    console.error("Error fetching game recommendations:", error);
    return [];
  }
};

export const getTrailerGame = async (slug) => {
  try {
    const response = await hitTrailerGame(slug);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching game recommendations:", error);
    return [];
  }
};

export const getScreenshotsGame = async (slug) => {
  try {
    const response = await hitScreenshotsGame(slug);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching game recommendations:", error);
    return [];
  }
};


export const getSimilarGame = async () => {
  try {
    const response = await hitGetGames(13, 8);
    return response.data;
  } catch (error) {
    console.error("Error fetching game recommendations:", error);
    return [];
  }
};


export const getPaginationSimilar = async (url) => {
  try {
    const response = await hitPagination(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching game recommendations:", error);
    return [];
  }
};




