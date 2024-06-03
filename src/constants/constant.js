export const API_KEY = "9e285c9f3fc26c77213c7d856f430e16";
export const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export const POPULAR_API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US`;
export const UPCOMING_API_URL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US`;
export const TOPRATED_API_URL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US`;
export const NOWPLAYING_API_URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US`;

export const type = {
    popular: 'Most Popular',
    upcoming: 'Upcoming',
    toprated: 'Top Rated'
}