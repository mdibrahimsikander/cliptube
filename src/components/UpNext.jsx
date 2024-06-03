import { Typography, Box, styled } from "@mui/material";

const Component = styled(Box)`
    width: 40%;
    display: flex;
    flex-direction: column;
    align-items: baseline;
    padding-left: 20px;
    & > p {
        color: #F5C518;
        font-weight: 600;
        font-size: 18px;
        margin-bottom: 10px;
    }
`;

const Wrapper = styled(Box)`
    color: #FFFFFF;
    display: flex;
    gap: 15px;      
    align-items: center;  
    margin-bottom: 5px;
    & > p {
        margin-left: 20px;
    }
`;

const Poster = styled('img')({
    width: 88
});

const UpNext = ({ movie }) => {
    return (
        <Component>
            <Typography>Up Next</Typography>
            {
                Array.isArray(movie) && movie.slice(0, 4).map((mov) => (
                    <Wrapper key={mov.id}>
                        <Poster src={`https://image.tmdb.org/t/p/original${mov.poster_path}`} alt="poster" />
                        <Typography>{mov.original_title}</Typography>
                    </Wrapper>
                ))
            }
        </Component>
    );
};

export default UpNext;
