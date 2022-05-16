import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import CookieManager from './CookieManager';
import { createClient } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';

// Create a single supabase client for interacting with your database 
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhkd3NrdG9ocmh1bHVrcHptaWtlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDk2MDc3MzEsImV4cCI6MTk2NTE4MzczMX0.FK8vTPRkX_ddUd-lijECBpWmLGuFoj7pe89TzvH9Zpk"
const supabase = createClient('https://hdwsktohrhulukpzmike.supabase.co', key)

const pages = ['Games', 'Library', 'Users'];

const NavBar = () => {

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [profilePic, setProfilePic] = useState<string>("")
  const [refresh, setRefresh] = useState(false)
  const [lastState, setLastState] = useState(CookieManager.checkCookie("SBRefreshToken"))

  useEffect(() => {
    //Hacer lo de la imagen con patron observador, si no es una mierda muy grande y no funciona correctamente.
    getProfilePic()
    setRefresh(false)
  }, [refresh]);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const getProfilePic = async () => {
    
    if(CookieManager.checkCookie("SBRefreshToken")) {
        let {data} = await supabase
              .from('profile')
              .select('avatar_url')
              .eq('user_id', supabase.auth.session()?.user?.id || "")
              .single()

      console.log(data.avatar_url)
      setProfilePic(data.avatar_url)

    } else {

      setProfilePic("https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg")
    }

  }

  var settings : string[] = []

  if(CookieManager.checkCookie("SBRefreshToken")) {
    settings = ['Profile', 'Logout'];
  } else {
    settings = ['Login'];
  }

  if(CookieManager.checkCookie("SBRefreshToken") && lastState !== CookieManager.checkCookie("SBRefreshToken")) {
    setLastState(CookieManager.checkCookie("SBRefreshToken"))
    setRefresh(true)

  } else if (CookieManager.checkCookie("SBRefreshToken") !== lastState){
    setLastState(CookieManager.checkCookie("SBRefreshToken"))
    setRefresh(true)

  }

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: 'flex',
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            MyVC Tests
          </Typography>
          <Box sx={{ flexGrow: 1, display: 'flex' }}>
            {pages.map((page) => (
              <Link to={"/"+page} key={page} style={{textDecoration: 'none'}}>
                <Button
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              </Link>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Gaviota" src={profilePic} />
            </IconButton>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <Link to={"/"+setting} style={{textDecoration: 'none'}} key={setting}>
                  <MenuItem>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;