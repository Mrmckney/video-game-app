import { DrawerProps } from '../services/propTypes';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useNavigate } from 'react-router-dom';
import { UserDetailsContext } from '../App';
import { useContext } from 'react';



export const MenuDrawer = ({openDrawer, setOpenDrawer}: DrawerProps): JSX.Element => {
  
  const navigate = useNavigate()
  const {user} = useContext(UserDetailsContext)

  const list = () => (
    <>
      <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => {
              if (user) {
                navigate('/toprated')
                setOpenDrawer(false)
              } else {
                // pop up message to log in
              }
            }}>
              <ListItemIcon>
                 <AutoAwesomeIcon />
              </ListItemIcon>
              <ListItemText primary='Top Rated' />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <EmojiPeopleIcon />
            </ListItemIcon>
            <ListItemText primary='Top Suggested' />
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
                // pop up message to log in
              }
            }}>
              <ListItemIcon>
                 <ListAltIcon />
              </ListItemIcon>
              <ListItemText primary='WishList' />
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