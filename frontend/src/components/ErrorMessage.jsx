import { Alert, AlertTitle, Box, Button as MuiButton } from '@mui/material';

const ErrorMessage = ({ title = 'Something went wrong', message, onRetry }) => {
  return (
    <Box sx={{ py: 2 }}>
      <Alert
        severity="error"
        sx={{
          borderRadius: 4,
          alignItems: 'center',
        }}
        action={
          onRetry ? (
            <MuiButton color="inherit" size="small" onClick={onRetry}>
              Retry
            </MuiButton>
          ) : null
        }
      >
        <AlertTitle>{title}</AlertTitle>
        {message || 'Please try again in a moment.'}
      </Alert>
    </Box>
  );
};

export default ErrorMessage;
