import React, { useEffect, useRef } from "react";
import { Box } from "@mui/material";

const ADSENSE_CLIENT =
  process.env.REACT_APP_ADSENSE_CLIENT || "ca-pub-7507779597055941";
const ADSENSE_ENABLED = process.env.REACT_APP_ADSENSE_ENABLED === "true";

const SLOTS = {
  top: process.env.REACT_APP_ADSENSE_SLOT_TOP || "",
  bottom: process.env.REACT_APP_ADSENSE_SLOT_BOTTOM || "",
};

/**
 * Renders an AdSense unit when enabled and a slot id is configured.
 * Without those, returns a hidden placeholder so layout stays stable in code.
 */
function AdSlot({ placement = "top", format = "auto" }) {
  const pushed = useRef(false);
  const slot = SLOTS[placement] || "";
  const show = ADSENSE_ENABLED && Boolean(ADSENSE_CLIENT) && Boolean(slot);

  useEffect(() => {
    if (!show || pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch (_) {
      // AdSense may throw if the script is blocked; ignore.
    }
  }, [show]);

  if (!show) {
    return (
      <Box
        aria-hidden="true"
        data-ad-placeholder={placement}
        sx={{ display: "none" }}
      />
    );
  }

  return (
    <Box
      sx={{
        my: 2,
        minHeight: 90,
        overflow: "hidden",
        borderRadius: 2,
        border: "1px solid rgba(0,0,0,0.08)",
        bgcolor: "rgba(255,255,255,0.5)",
        p: 1,
        width: "100%",
        maxWidth: 728,
        mx: "auto",
      }}
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </Box>
  );
}

export default AdSlot;
