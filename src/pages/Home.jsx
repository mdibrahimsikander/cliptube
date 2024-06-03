import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import { getCategoryMovies } from '../services/api';
import { NOWPLAYING_API_URL } from '../constants/constant';
import Banner from '../components/Banner';
import UpNext from '../components/UpNext';
import Slider from "../components/Slider";

function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const movies = useSelector((state) => state.cliptube.movies);
  const genres = useSelector((state) => state.cliptube.genres);
  const genresLoaded = useSelector((state) => state.cliptube.genresLoaded);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [movie, setMovie] = useState([{}]); // Initialize as an array

  useEffect(() => {
    const getData = async () => {
      try {
        let response = await getCategoryMovies(NOWPLAYING_API_URL);
        if (response && response.results) {
          console.log("Movies fetched:", response.results); // Log fetched movies
          setMovie(response.results); // Ensure movie is set as an array
        } else {
          console.log("No movies found, setting empty array.");
          setMovie([]); // Set an empty array if response is not as expected
        }
      } catch (error) {
        console.error("Failed to fetch movies:", error);
        setMovie([{}]); // Set an empty array in case of an error
      }
    };
    getData();
  }, []);

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ genres, type: "all" }));
    }
  }, [genresLoaded, genres, dispatch]);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (!currentUser) navigate("/login");
    });
  }, [navigate]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.pageYOffset !== 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="Wrapper">
        {movie.length > 0 && (
          <>
            <Banner movie={movie} /> {/* Pass the movie array to Banner */}
            <UpNext movie={movie} />
          </>
        )}
      </div>
      <Slider movies={movies} />
    </Container>
  );
}

const Container = styled.div`
  background-color: black;
  .Wrapper {
    display: flex;
    padding: 5px 0;
  }
`;

export default Home;
