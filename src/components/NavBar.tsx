import React, { useContext, useState } from 'react';
import { AppBar, Box, Toolbar, Typography, IconButton, Avatar, Menu, MenuItem, ListItemIcon, Divider, Tooltip, Button } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { MenuDrawer } from './MenuDrawer';
import { UserDetailsContext } from '../App';
import { useNavigate } from 'react-router-dom';

export const NavBar = (): JSX.Element => {

    const navigate = useNavigate();
    const {user, displayName} = useContext(UserDetailsContext)
    const [openDrawer, setOpenDrawer] = useState<boolean>(false); 
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => setOpenDrawer(true)}
            >
              <MenuIcon/>
            </IconButton>
            <Typography onClick={() => navigate('/')} style={{cursor: 'pointer'}} variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Game Retriever
            </Typography>
            {user ? 
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Account">
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <Avatar sx={{ width: 40, height: 40 }}>
                        {displayName[0]?.toLocaleUpperCase()}
                    </Avatar>   
                </IconButton>
                </Tooltip>
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                        },
                        '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                        },
                    },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem onClick={() => {
                    navigate('/')
                    localStorage.clear()
                    window.location.reload()
                  }}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                      Logout
                  </MenuItem>
                </Menu>
            </Box>
            : 
              <Button 
                color="inherit" 
                onClick={() => {
                  navigate('/login')
                }}
              >
                  Login
              </Button>
            }
          </Toolbar>
        </AppBar>
      </Box>
      {openDrawer && <MenuDrawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />}
    </div>
  );
}