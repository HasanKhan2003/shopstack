import { Box, IconButton, Typography } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

const QuantitySelector = ({
  quantity,
  onIncrement,
  onDecrement,
  compact = false,
}) => {
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: compact ? 0.5 : 1,
        padding: compact ? 0.5 : 0.75,
        borderRadius: 999,
        border: '1px solid rgba(17, 17, 17, 0.1)',
        backgroundColor: '#fff',
      }}
    >
      <IconButton
        aria-label="Decrease quantity"
        onClick={onDecrement}
        size={compact ? 'small' : 'medium'}
        sx={{
          backgroundColor: 'rgba(211, 47, 47, 0.08)',
          color: 'var(--color-primary)',
          '&:hover': {
            backgroundColor: 'rgba(211, 47, 47, 0.16)',
          },
        }}
      >
        <RemoveIcon fontSize="inherit" />
      </IconButton>
      <Typography
        component="span"
        sx={{
          minWidth: 28,
          textAlign: 'center',
          fontWeight: 800,
          color: 'var(--color-text)',
        }}
      >
        {quantity}
      </Typography>
      <IconButton
        aria-label="Increase quantity"
        onClick={onIncrement}
        size={compact ? 'small' : 'medium'}
        sx={{
          backgroundColor: 'rgba(17, 17, 17, 0.06)',
          color: 'var(--color-text)',
          '&:hover': {
            backgroundColor: 'rgba(17, 17, 17, 0.12)',
          },
        }}
      >
        <AddIcon fontSize="inherit" />
      </IconButton>
    </Box>
  );
};

export default QuantitySelector;
