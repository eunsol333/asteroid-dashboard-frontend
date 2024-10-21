import { Neo } from "../models/asteroids";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import StarIcon from "@mui/icons-material/Star";
import { Grid2, IconButton } from "@mui/material";

interface asteroidsCardProp {
  asteroid: Neo;
  setFavourite: (id: string) => void;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  display: "flex",
  flexDirection: "column",
};

export default function AsteroidCard({
  asteroid,
  setFavourite,
}: asteroidsCardProp) {
  const [expanded, setExpanded] = React.useState<string>();

  const handleClose = () => {
    setExpanded("");
  };

  const handleExpandClick = (id: string) => {
    setExpanded(id);
  };

  return (
    <>
      <Card
        sx={{
          minWidth: 275,
          maxHeight: 100,
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: "10px",
          margin: "0px 0px 10px 10px",
        }}
        key={asteroid.id}
      >
        <CardContent sx={{ padding: "10px 10px 5px 12px" }}>
          <Grid2
            container
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography gutterBottom sx={{ color: "white", fontSize: 14 }}>
              {asteroid.name}
            </Typography>
            <IconButton
              onClick={() => {
                setFavourite(asteroid.id);
              }}
            >
              <StarIcon
                sx={{ color: asteroid.is_favourite ? "yellow" : "grey" }}
              />
            </IconButton>
          </Grid2>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => handleExpandClick(asteroid.id)}>
            Learn More
          </Button>
        </CardActions>
      </Card>

      <Modal
        open={expanded === asteroid.id}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 700 }}>
          <Box>
            <Typography gutterBottom sx={{ color: "black", fontSize: "2rem" }}>
              {`Asteroid ${asteroid.name}`}
            </Typography>
            <Typography gutterBottom sx={{ color: "black", fontSize: "1rem" }}>
              {`Absolute magnitude - ${asteroid.absolute_magnitude_h}`}
            </Typography>
            <Typography gutterBottom sx={{ color: "black", fontSize: "1rem" }}>
              {`Minimum estimated diameter (km) - ${asteroid.estimated_diameter.kilometers.estimated_diameter_min.toFixed(
                2
              )}`}
            </Typography>

            <Typography gutterBottom sx={{ color: "black", fontSize: "1rem" }}>
              {`Maximum estimated diameter (km) - ${asteroid.estimated_diameter.kilometers.estimated_diameter_max.toFixed(
                2
              )}`}
            </Typography>
            {asteroid?.orbital_data?.first_observation_date ? (
              <Typography
                gutterBottom
                sx={{ color: "black", fontSize: "1rem" }}
              >
                {`First observation date - ${asteroid.orbital_data.first_observation_date}`}
              </Typography>
            ) : (
              <></>
            )}
          </Box>
          <Box sx={{ alignSelf: "flex-end" }}>
            <Button onClick={handleClose}>Close</Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
