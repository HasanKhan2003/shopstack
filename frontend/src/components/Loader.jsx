import { Box, CircularProgress, Typography } from '@mui/material';

const Loader = ({ label = 'Loading...', light = false }) => {
  return (
    <Box
      sx={{
        minHeight: 240,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
      }}
      >
      <CircularProgress color="primary" />
      <Typography
        variant="body1"
        sx={{
          color: light ? 'rgba(255,255,255,0.88)' : 'var(--color-text-muted)',
        }}
      >
        {label}
      </Typography>
    </Box>
  );
};

export default Loader;
