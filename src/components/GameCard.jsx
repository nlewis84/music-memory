// GameCard.jsx
import { Card, CardContent, Typography } from "@mui/material";

const GameCard = ({ item, onClick }) => {
  return (
    <Card
      onClick={onClick}
      sx={{
        backgroundColor: "primary.dark",
        borderRadius: 2,
        height: 180,
        width: 180,
        ":hover": { boxShadow: 10 },
        ":active": { boxShadow: 0 },
      }}
      variant="outlined"
      style={{ textDecoration: "none" }}
    >
      <CardContent>
        {item.majorWork ? (
          <>
            <Typography
              variant="h6"
              sx={{ color: "text.tertiary", fontWeight: "bold", textAlign: "center" }}
            >
              {item.majorWork}
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "text.primary", fontWeight: "regular", textAlign: "center" }}
            >
              {item.selection}
            </Typography>
          </>
        ) : (
          <Typography
            variant="body1"
            sx={{ color: "text.primary", fontWeight: "regular", textAlign: "center" }}
          >
            {item.selection}
          </Typography>
        )}
        <Typography
          variant="body1"
          sx={{ color: "text.disabled", textAlign: "center" }}
        >
          {item.composer}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default GameCard;
