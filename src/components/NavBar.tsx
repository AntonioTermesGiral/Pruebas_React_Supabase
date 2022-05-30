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
import { useState } from 'react';
import ProfileViewmodel from '../vm/ProfileViewmodel';
import { observer } from 'mobx-react';

const pages = ['Games', 'Library', 'Users', 'LD'];

const NavBar = () => {

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const vm = ProfileViewmodel.getInstance()

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  var settings : string[] = []

  if (vm.isLoggedIn) {
    settings = ['Profile', 'Logout'];
  } else {
    settings = ['Login'];
  }

  return (
    <AppBar position="fixed" color='primary' sx={{bgcolor: "#212121"}}>
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
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0}}>
              <Avatar alt="Pfp" src={vm.getCurrentProfilePic || "https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg"} sx={{border: "3px solid #ffffff" }}/>
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
export default observer(NavBar);