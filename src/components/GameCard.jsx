// GameCard.jsx
import { Card, CardContent, Typography, Box } from "@mui/material";

const GameCard = ({ item, onClick }) => {
  // Handle keyboard interactions for accessibility
  const handleKeyDown = (event) => {
    // Activate on Enter or Space key
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick();
    }
  };

  // Create accessible label for screen readers
  const ariaLabel = item.majorWork
    ? `${item.majorWork}, ${item.selection} by ${item.composer}`
    : `${item.selection} by ${item.composer}`;

  return (
    <Card
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={ariaLabel}
      sx={{
        backgroundColor: "primary.dark",
        borderRadius: 3,
        height: 180,
        width: 180,
        minHeight: 180,
        minWidth: 180,
        maxHeight: 180,
        maxWidth: 180,
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        position: "relative",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        border: "2px solid transparent",
        outline: "none",

        // Enhanced hover state with lift effect
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 12px 24px -10px rgba(0, 0, 0, 0.3)",
          "&::before": {
            opacity: 1,
          },
        },

        // Active state - press down effect
        "&:active": {
          transform: "translateY(-1px)",
          boxShadow: "0 4px 12px -4px rgba(0, 0, 0, 0.2)",
        },

        // Focus-visible for keyboard navigation (WCAG 2.4.7)
        "&:focus-visible": {
          borderColor: "secondary.light",
          boxShadow:
            "0 0 0 3px rgba(27, 146, 212, 0.3), 0 8px 16px -6px rgba(0, 0, 0, 0.25)",
          transform: "translateY(-2px)",
        },

        // Subtle gradient overlay for depth
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: 3,
          background:
            "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%)",
          opacity: 0,
          transition: "opacity 0.3s ease",
          pointerEvents: "none",
        },
      }}
      variant="outlined"
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          padding: 2,
          paddingBottom: "16px !important",
          overflow: "hidden",
        }}
      >
        {/* Content area with flexible height */}
        <Box
          sx={{
            flex: "1 1 auto",
            display: "flex",
            flexDirection: "column",
            minHeight: 0,
            overflow: "hidden",
          }}
        >
          {item.majorWork ? (
            <>
              <Typography
                component="h3"
                variant="h6"
                sx={{
                  fontFamily: '"Poppins", sans-serif',
                  color: "#FFFFFF",
                  fontWeight: 700,
                  textAlign: "left",
                  fontSize: "1.05rem",
                  lineHeight: 1.25,
                  marginBottom: 0.5,
                  letterSpacing: "-0.01em",
                  wordWrap: "break-word",
                  overflowWrap: "break-word",
                  hyphens: "none",
                }}
              >
                {item.majorWork}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: '"Open Sans", sans-serif',
                  color: "rgba(34, 34, 34, 0.90)",
                  fontWeight: 600,
                  textAlign: "left",
                  fontSize: "0.875rem",
                  lineHeight: 1.3,
                  marginBottom: 0.5,
                  wordWrap: "break-word",
                  overflowWrap: "break-word",
                  hyphens: "none",
                }}
              >
                {item.selection}
              </Typography>
            </>
          ) : (
            <>
              <Typography
                component="h3"
                variant="body1"
                sx={{
                  fontFamily: '"Poppins", sans-serif',
                  color: "#FFFFFF",
                  fontWeight: 700,
                  textAlign: "left",
                  fontSize: "1.05rem",
                  lineHeight: 1.3,
                  marginBottom: 0.5,
                  letterSpacing: "-0.01em",
                  wordWrap: "break-word",
                  overflowWrap: "break-word",
                  hyphens: "none",
                }}
              >
                {item.selection}
              </Typography>
            </>
          )}
        </Box>

        {/* Composer section - bottom right signature style */}
        <Box
          sx={{
            paddingTop: 1,
            marginTop: 0.5,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontFamily: '"Poppins", sans-serif',
              color: "#222222",
              textAlign: "right",
              fontSize: "0.95rem",
              fontStyle: "normal",
              fontWeight: 700,
              letterSpacing: "0.01em",
              wordWrap: "break-word",
              overflowWrap: "break-word",
            }}
          >
            {item.composer}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default GameCard;
