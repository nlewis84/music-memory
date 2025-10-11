// GameCard.jsx
import { Card, CardContent, Typography } from "@mui/material";

const GameCard = ({ item, onClick }) => {
  return (
    <Card
      onClick={onClick}
      sx={{
        backgroundColor: "primary.dark",
        borderRadius: 2,
        minHeight: 180,
        width: 180,
        display: "flex",
        flexDirection: "column",
        ":hover": { boxShadow: 10 },
        ":active": { boxShadow: 0 },
      }}
      variant="outlined"
      style={{ textDecoration: "none" }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100%",
          padding: 2,
          "&:last-child": {
            paddingBottom: 2,
          },
        }}
      >
        {item.majorWork ? (
          <>
            <Typography
              variant="h6"
              sx={{
                color: "text.tertiary",
                fontWeight: "bold",
                textAlign: "center",
                fontSize: "1.05rem",
                lineHeight: 1.2,
                marginBottom: 0.5,
              }}
            >
              {item.majorWork}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "text.primary",
                fontWeight: "regular",
                textAlign: "center",
                fontSize: "0.95rem",
                lineHeight: 1.3,
                marginBottom: 0.5,
              }}
            >
              {item.selection}
            </Typography>
          </>
        ) : (
          <Typography
            variant="body1"
            sx={{
              color: "text.primary",
              fontWeight: "regular",
              textAlign: "center",
              fontSize: "0.95rem",
              lineHeight: 1.3,
              marginBottom: 0.5,
            }}
          >
            {item.selection}
          </Typography>
        )}
        <Typography
          variant="body1"
          sx={{
            color: "text.disabled",
            textAlign: "center",
            fontSize: "0.95rem",
          }}
        >
          {item.composer}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default GameCard;
