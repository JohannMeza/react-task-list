import React, {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import { ICON } from '../icons/Icon';
import { MenuItem, Stack } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import { PRIVATE_PATH } from '../../constants/PathConstants';

function HeaderComponents() {
  const {user, isAuthenticated} = useAuth0()
  const {logout} = useAuth0();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true)
  };
  
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false)
  };
  
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ display: "flex", justifyContent: "space-between" }}>
          <Stack display="flex" gap={1} flexDirection="row" alignItems="center" >
            {ICON.TASKLIST}
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              TASKLIST
            </Typography>
          </Stack>

          <Box sx={{ flexGrow: 0 }}>
            <Typography variant="body1" sx={{ color: "#fff", fontWeight: 500, marginRight: 1 }}  component="b">{isAuthenticated && user.email}</Typography>
            <IconButton 
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src={isAuthenticated && user.picture} />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={() => navigate(PRIVATE_PATH.PERFIL_ADMIN)}>Mi Perfil</MenuItem>
              <MenuItem onClick={logout}>Salir</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default HeaderComponents;