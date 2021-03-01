import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider, Button } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import { QueryClient, QueryClientProvider } from 'react-query';
import theme from 'src/theme';
import routes from 'src/routes';

const queryClient = new QueryClient();

const App = () => {
  const routing = useRoutes(routes);
  const notistackRef = React.createRef();
  const onClickDismiss = (key) => () => {
    notistackRef.current.closeSnackbar(key);
  };

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider
          ref={notistackRef}
          action={(key) => (
            <Button onClick={onClickDismiss(key)}>Dismiss</Button>
          )}
          maxSnack={3}
        >
          <GlobalStyles />
          {routing}
        </SnackbarProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
