import React, { useEffect, useState } from 'react';
import { Box, Typography,  styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CardSlider from '../components/CardSlider';

const PlaylistContainer = styled(Box)`
    padding: 20px;
    background: #181818;
    color: white;
    min-height: 100vh;
`;

const Playlist = () => {
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedMovies = JSON.parse(localStorage.getItem('playlist')) || [];
        setMovies(storedMovies);
    }, [movies]);

    return (
        <PlaylistContainer>
            <Typography variant="h4">My Playlists</Typography>
            <Box style={{ marginTop: '60px' }}>
                {movies.length>0 && 
                <CardSlider
                    data={movies}
                    title=""
                />}
            </Box>
            {movies.length<=0 && <p style={{ marginTop: '20px' }}>No movies in the playlist</p>}
        </PlaylistContainer>
    );
};

export default Playlist;
