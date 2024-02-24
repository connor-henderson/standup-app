import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Divider,
  ThemeProvider,
} from '@mui/material';
import theme from '../assets/theme';
import themeDark from '../assets/theme-dark';
import { createContext, useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import Sidenav from '../components/Sidenav';
import routes from '../components/Sidenav/routes';
import Navbar from '../components/NavBar/Desktop';
import MobileNavbar from '../components/NavBar/Mobile';
import { AuthorWithWorks } from './api/hello';
import breakpoints from '../assets/theme/base/breakpoints';
import NavLayout from '../components/nav-layout';

const ContentContext = createContext<AuthorWithWorks[]>([]);
export const useContentContext = () => useContext(ContentContext);

export default function App({ Component, pageProps }: AppProps) {
  const [darkMode, setDarkMode] = useState(false);
  const [miniSidenav, setMiniSidenav] = useState(true);
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [content, setContent] = useState<AuthorWithWorks[]>([]);

  const getContent = async () => {
    const res = await fetch('http://localhost:3000/api/hello');
    const json = await res.json();
    setContent(json);
  };

  useEffect(() => {
    getContent();
  }, []);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(true);
      setOnMouseEnter(false);
    }
  };

  useEffect(() => {
    const handleMiniSidenav = () => setMiniSidenav(true);
    window.addEventListener('resize', handleMiniSidenav);
    return () => window.removeEventListener('resize', handleMiniSidenav);
  }, []);

  useEffect(() => {
    function handleDisabled() {
      return window.innerWidth >= breakpoints.values.lg ? setMobile(false) : setMobile(true);
    }
    window.addEventListener("resize", handleDisabled);
    console.log(handleDisabled());
    return () => window.removeEventListener("resize", handleDisabled);
  }, []);

  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <ContentContext.Provider value={content}>
        <Head>
          <title>Mindfulnet</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <CssBaseline />
        <SessionProvider session={pageProps.session} refetchInterval={5 * 60}>
          <NavLayout miniSidenav={miniSidenav}>
            <Sidenav
              color="info"
              routes={routes}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
              setMiniSidenav={setMiniSidenav}
              miniSidenav={miniSidenav}
              mobile={mobile}
            />
            {mobile ? (
              <MobileNavbar setMiniSidenav={setMiniSidenav}>
                <p>test</p>
              </MobileNavbar>
            ) : (
              <Navbar
                setMiniSidenav={setMiniSidenav}
                miniSidenav={miniSidenav}
              />
            )}
            <Box py={5}>
              <Component {...pageProps} />
            </Box>
            <Button onClick={() => setDarkMode(!darkMode)}>
              Toggle Dark Mode
            </Button>
          </NavLayout>
        </SessionProvider>
      </ContentContext.Provider>
    </ThemeProvider>
  );
}
