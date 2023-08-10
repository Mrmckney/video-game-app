import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Box, Typography, Button, Drawer, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText} from '@mui/material';
import GradeIcon from '@mui/icons-material/Grade';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import ListAltIcon from '@mui/icons-material/ListAlt';
import SearchIcon from '@mui/icons-material/Search';
import { UserDetailsContext } from '../App';
import { DrawerProps } from '../services/propTypes';



export const MenuDrawer = ({openDrawer, setOpenDrawer}: DrawerProps): JSX.Element => {
  
  const navigate = useNavigate()
  const {user} = useContext(UserDetailsContext)
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 5,
  };

  const list = () => (
    <>
    {open && 
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6">
            Login to gain access
          </Typography>
          <Button sx={{ mt: 5 }} variant="contained" onClick={() => {
            navigate('/login')
            setOpen(false)
            setOpenDrawer(false)
          }}>
            Go to Login
          </Button>
        </Box>
      </Modal>     
    }
      <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => {
                navigate('/mostplayed')
                setOpenDrawer(false)
            }}>
              <ListItemIcon>
                 <AutoAwesomeIcon />
              </ListItemIcon>
              <ListItemText primary='Most Played' />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
          <ListItemButton onClick={() => {
                navigate('/topsuggested')
                setOpenDrawer(false)
            }}>
            <ListItemIcon>
              <EmojiPeopleIcon />
            </ListItemIcon>
            <ListItemText primary='Top Suggested' />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
            <ListItemButton onClick={() => {
                navigate('/toprated')
                setOpenDrawer(false)
            }}>
              <ListItemIcon>
                 <GradeIcon />
              </ListItemIcon>
              <ListItemText primary='Top Rated' />
            </ListItemButton>
          </ListItem>
      </List>
      <Divider />
      <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => {
              if (user) {
                navigate('/wishlist')
                setOpenDrawer(false)
              } else {
                setOpen(true)
              }
            }}>
              <ListItemIcon>
                 <ListAltIcon />
              </ListItemIcon>
              <ListItemText primary='WishList' />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => {
              if (user) {
                navigate('/search')
                setOpenDrawer(false)
              } else {
                setOpen(true)
              }
            }}>
              <ListItemIcon>
                 <SearchIcon />
              </ListItemIcon>
              <ListItemText primary='Search Game' />
            </ListItemButton>
          </ListItem>
      </List>
    </>
  );

  return (
    <div>
          <Drawer
            anchor={'left'}
            open={openDrawer}
            onClose={() => setOpenDrawer(false)}
          >
            {list()}
          </Drawer>
    </div>
  );
}