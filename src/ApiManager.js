import { hitGetGames } from "./Api";

export const getRecommend = async () => {
  try {
    const response = await hitGetGames(1, 10);
    console.log(response.data.results)
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

