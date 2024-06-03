import {
    configureStore,
    createAsyncThunk,
    createSlice,
  } from "@reduxjs/toolkit";
  import axios from "axios";
  import { API_KEY, TMDB_BASE_URL } from "../constants/constant";
  
  const initialState = {
    movies: [
    //   {
    //     id: 1,
    //     name: 'Movie 1',
    //     description: 'Description for movie 1',
    //     thumbnail: 'path/to/thumbnail1.jpg',
    //     playlistTitle: 'Liked videos' // Default or user-selected playlist title
    // },
    // {
    //     id: 2,
    //     name: 'Movie 2',
    //     description: 'Description for movie 2',
    //     thumbnail: 'path/to/thumbnail2.jpg',
    //     playlistTitle: 'Watch Later' // Default or user-selected playlist title
    // },
    ],
    genresLoaded: false,
    genres: [],
  };
  
  export const getGenres = createAsyncThunk("cliptube/genres", async () => {
    const {
      data: { genres },
    } = await axios.get(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=9e285c9f3fc26c77213c7d856f430e16"
    );
    return genres;
  });
  
  const createArrayFromRawData = (array, moviesArray, genres) => {
    array.forEach((movie) => {
      const movieGenres = [];
      movie.genre_ids.forEach((genre) => {
        const name = genres.find(({ id }) => id === genre);
        if (name) movieGenres.push(name.name);
      });
      if (movie.backdrop_path)
        moviesArray.push({
          id: movie.id,
          name: movie?.original_name ? movie.original_name : movie.original_title,
          image: movie.backdrop_path,
          genres: movieGenres.slice(0, 3),
        });
    });
  };
  
  const getRawData = async (api, genres, paging = false) => {
    const moviesArray = [];
    for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
      const {
        data: { results },
      } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
      createArrayFromRawData(results, moviesArray, genres);
    }
    return moviesArray;
  };
  
  export const fetchDataByGenre = createAsyncThunk(
    "cliptube/genre",
    async ({ genre, type }, thunkAPI) => {
      const {
        cliptube: { genres },
      } = thunkAPI.getState();
      return getRawData(
        `https://api.themoviedb.org/3/discover/${type}?api_key=9e285c9f3fc26c77213c7d856f430e16&with_genres=${genre}`,
        genres
      );
    }
  );
  
  export const fetchMovies = createAsyncThunk(
    "cliptube/trending",
    async ({ type }, thunkAPI) => {
      const {
        cliptube: { genres },
      } = thunkAPI.getState();
      return getRawData(
        `${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`,
        genres,
        true
      );
    }
  );
  
  export const getUsersLikedMovies = createAsyncThunk(
    "cliptube/getLiked",
    async (email) => {
      const {
        data: { movies },
      } = await axios.get(`http://localhost:5000/api/user/liked/${email}`);
      return movies;
    }
  );
  
  export const removeMovieFromLiked = createAsyncThunk(
    "cliptube/deleteLiked",
    async ({ movieId, email }) => {
      const {
        data: { movies },
      } = await axios.put("http://localhost:5000/api/user/remove", {
        email,
        movieId,
      });
      return movies;
    }
  );
  
  const CliptubeSlice = createSlice({
    name: "Cliptube",
    initialState,
    extraReducers: (builder) => {
      builder.addCase(getGenres.fulfilled, (state, action) => {
        state.genres = action.payload;
        state.genresLoaded = true;
      });
      builder.addCase(fetchMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
      });
      builder.addCase(fetchDataByGenre.fulfilled, (state, action) => {
        state.movies = action.payload;
      });
      builder.addCase(getUsersLikedMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
      });
      builder.addCase(removeMovieFromLiked.fulfilled, (state, action) => {
        state.movies = action.payload;
      });
    },
  });
  
  export const store = configureStore({
    reducer: {
      cliptube: CliptubeSlice.reducer,
    },
  });
  
  export const { setGenres, setMovies } = CliptubeSlice.actions;