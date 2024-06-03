import { signOut } from "firebase/auth";
import { useState, useRef } from "react";
import { firebaseAuth } from "../utils/firebase-config";
import { useSelector } from "react-redux";
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    InputBase,
    styled,
} from "@mui/material";
import {
    Menu as MenuIcon,
    BookmarkAdd,
    ExpandMore,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { routePath } from "../constants/routes";
import NavbarMenu from "./NavbarMenu";

const StyledToolBar = styled(Toolbar)`
  background: #121212;
  min-height: 56px !important;
  padding: 0 90px !important;
  justify-content: space-between;
  & > * {
    padding: 0 16px;
  }
  & > div {
    display: flex;
    align-items: center;
    cursor: pointer;
    & > p {
      font-weight: 600;
      font-size: 14px;
    }
  }
  & > p {
    font-weight: 600;
    font-size: 14px;
  }
`;

const InputSearchField = styled(InputBase)`
  background: #ffffff;
  height: 30px;
  width: 55%;
  border-radius: 5px;
`;

const Logo = styled("img")({
    width: 150,
});

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredMovies, setFilteredMovies] = useState([]);
    const anchorRef = useRef(null);
    const movies = useSelector((state) => state.cliptube.movies);
    const navigate = useNavigate();

    const handleToggle = () => {
        setOpen((prev) => !prev);
    };

    const handleSignOut = async () => {
        try {
            await signOut(firebaseAuth);
            navigate(routePath.login); // Redirect to login page after sign out
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        // console.log("MOVIES YE HAI -- ", movies);

        if (query) {
            const filtered = movies.filter((movie) => {
                return (
                    movie.name.toLowerCase().includes(query.toLowerCase()) ||
                    movie.genres.some((genre) =>
                        genre.toLowerCase().includes(query.toLowerCase())
                    )
                );
            });
            setFilteredMovies(filtered);
        } else {
            setFilteredMovies([]);
        }
    };

    return (
        <AppBar style={{ minHeight: 56 }} position="static">
            <StyledToolBar>
                <Logo src={logo} alt="logo" onClick={() => navigate(routePath.home)} />
                <Box ref={anchorRef} onClick={handleToggle}>
                    <MenuIcon />
                    <Typography>Menu</Typography>
                </Box>
                <NavbarMenu
                    handleToggle={handleToggle}
                    open={open}
                    anchorRef={anchorRef}
                />
                <InputSearchField
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search..."
                    color="black"
                />
                <Typography>
                    Go
                    <Typography component="span" style={{ fontSize: 14 }}>
                        {" "}
                        Pro
                    </Typography>
                </Typography>
                <Box>
                    <BookmarkAdd />
                    <Typography onClick={() => navigate(routePath.playlist)} >Playlist</Typography>
                </Box>
                <Box>
                    <Typography>EN</Typography>
                    <ExpandMore />
                </Box>
                <Box onClick={handleSignOut}>
                    <Typography>Sign Out</Typography>
                </Box>
            </StyledToolBar>
            <Box
                style={{
                    background: "#121212",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100vw",
                }}
            >
                {searchQuery && (
                    <Box
                        style={{
                            background: "#121212",
                            padding: "10px",
                            margin: "auto",
                            width: "55%",
                            maxWidth: "600px",
                            textAlign: "center",
                        }}
                    >
                        {filteredMovies.length > 0 ? (
                            filteredMovies.map((movie) => (
                                <Typography key={movie.id} style={{ color: "#FFF" }}>
                                    {movie.name}
                                </Typography>
                            ))
                        ) : (
                            <Typography style={{ color: "#FFF" }}>No movies found</Typography>
                        )}
                    </Box>
                )}
            </Box>
        </AppBar>
    );
};

export default Navbar;
