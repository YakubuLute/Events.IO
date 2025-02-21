import * as React from "react";
import CircularProgress, { CircularProgressProps } from "@mui/material/CircularProgress";
import { Box } from "@mui/material";

export function CircularProgressWithLabel({
  variant = "determinate",
  size = 50,
  thickness = 4.6,
  children,
  ...props
}: CircularProgressProps & {
  value: number;
  children: React.ReactNode;
}) {

  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant={variant} size={size} thickness={thickness} {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

// export default function CircularWithValueLabel() {
//   const [progress, setProgress] = React.useState(10);

//   React.useEffect(() => {
//     const timer = setInterval(() => {
//       setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
//     }, 800);
//     return () => {
//       clearInterval(timer);
//     };
//   }, []);

//   return <CircularProgressWithLabel value={progress} />;
// }
