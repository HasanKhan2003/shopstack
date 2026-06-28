import { Box, Container, Divider, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ mt: 'auto', pb: 3 }}>
      <Container maxWidth="lg">
        <Divider sx={{ mb: 2.5, borderColor: 'rgba(255,255,255,0.25)' }} />
        <Typography
          variant="body2"
          align="center"
          sx={{ color: 'rgba(255,255,255,0.9)', fontWeight: 600 }}
        >
          ShopStack delivers a simple, modern shopping experience.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
