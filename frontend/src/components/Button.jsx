import { Button as MuiButton } from '@mui/material';

const Button = ({ children, sx, variant = 'contained', ...props }) => {
  const isContained = variant === 'contained';

  return (
    <MuiButton
      variant={variant}
      disableElevation
      {...props}
      sx={{
        borderRadius: 999,
        px: 3,
        py: 1.25,
        textTransform: 'none',
        fontWeight: 800,
        boxShadow: isContained ? '0 14px 30px rgba(211, 47, 47, 0.25)' : 'none',
        ...(isContained
          ? {
              backgroundColor: 'var(--color-primary)',
              color: '#ffffff',
              '&:hover': {
                backgroundColor: 'var(--color-primary-dark)',
              },
            }
          : {
              borderColor: 'var(--color-primary)',
              color: 'var(--color-primary)',
              '&:hover': {
                borderColor: 'var(--color-primary-dark)',
                backgroundColor: 'rgba(211, 47, 47, 0.08)',
              },
            }),
        ...sx,
      }}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
