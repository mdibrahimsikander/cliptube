import Carousel from 'react-multi-carousel';
import { styled, Box, Typography } from '@mui/material';

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    }
};

const StyledBanner = styled('div')({
    position: 'relative',
    width: '100%',
    height: '100%'
});

const BannerImage = styled('img')({
    width: '100%',
    height: '100%'
});

const MovieTitle = styled(Typography)`
    position: absolute;
    bottom: 20px;
    left: 20px;
    color: white;
    font-size: 2rem;
    font-weight: bold;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
`;

const Banner = ({ movie }) => {
    return (
        <Box style={{ width: '65%' }}>
            <Carousel
                swipeable={false}
                draggable={false}
                responsive={responsive}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={3000}
                keyBoardControl={true}
                showDots={false}
                slidesToSlide={1}
                containerClass="react-multi-carousel-list"
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
                style={{ overflow: 'visible' }}
            >
                {
                    Array.isArray(movie) && movie.map(mov => (
                        <StyledBanner key={mov.id}>
                            <BannerImage src={`https://image.tmdb.org/t/p/original${mov.backdrop_path}`} alt={mov.original_title} />
                            <MovieTitle variant="h2">{mov.original_title}</MovieTitle>
                        </StyledBanner>
                    ))
                }
            </Carousel>
        </Box>
    )
}

export default Banner;
