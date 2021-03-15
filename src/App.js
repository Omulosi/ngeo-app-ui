import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider, Button } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
// import { QueryClient, QueryClientProvider } from 'react-query';
import theme from 'src/theme';
import routes from 'src/routes';
import mainConfig from 'src/config/config.json';
import useUser from 'src/hooks/user';
// import Popup from 'src/utils/helpers/Popup';

// const queryClient = new QueryClient();

/* eslint-disable */
const App = () => {
  const { data, isError, isLoading, isSuccess } = useUser();
  const isToken = localStorage.getItem('token') !== null;
  const isLoggedIn = !isLoading && !isError && isToken;
  // if (!isLoading && isError) {
  //   isLoggedIn = false;
  // }

  const routing = useRoutes(routes(isLoggedIn));
  const notistackRef = React.createRef();
  const onClickDismiss = (key) => () => {
    notistackRef.current.closeSnackbar(key);
  };

  window.mapControls = mainConfig.controls;
  // window.popup = new Popup();

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        ref={notistackRef}
        action={(key) => <Button onClick={onClickDismiss(key)}>Dismiss</Button>}
        maxSnack={3}
      >
        <GlobalStyles />
        <div id="portal-root" />
        {routing}
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
