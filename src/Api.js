import axios from "axios";

const apiKey = process.env.REACT_APP_API_KEY;
const apiUrl = process.env.REACT_APP_API_URL;
const config = {
    headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
}


//Component
export const hitGetGames = (page=1, pagesize = 10) => {
    const data = axios.get(`${apiUrl}/games?page_size=${pagesize}&page=${page}&dates=2019-09-01,2019-09-30&platforms=18,1,7&key=${apiKey}`, config);

    return data;
}
export const hitGetGamesByGenre = (pagesize = 10) => {
    const data = axios.get(`${apiUrl}/games?page_size=${pagesize}&dates=2019-09-01,2019-09-30&platforms=18,1,7&key=${apiKey}`, config);

    return data;
}

export const hitDetailGame = (slug) => {
    const data = axios.get(`${apiUrl}/games/${slug}?dates=2019-09-01,2019-09-30&platforms=18,1,7&key=${apiKey}`, config);
    return data
}

