import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import StoreIcon from '@material-ui/icons/Store';
import CommentIcon from '@material-ui/icons/Comment';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import ErrorIcon from '@material-ui/icons/Error';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { AttachMoney, Navigation } from '@material-ui/icons';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  
}));

function Home(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  }

  const handleLink = (index) => {
    switch(index) {
        case 0:
            document.location.href = '/home';
            break;
        case 1:
            document.location.href = '/user';
            break;
        case 2:
            document.location.href = '/store';
            break;
        case 3:
            document.location.href = '/feedback';
            break;
        case 4: 
            document.location.href = '/report';
            break;
        case 5: 
            document.location.href = '/service';
            break;
        case 6: 
            document.location.href = '/problem';
            break;
        case 7: 
            document.location.href = '/reportStore';
            break;
    }
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem button key="Home" onClick={() => handleLink(0)}>
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary="Trang ch???" />
        </ListItem>
        <ListItem button key="User" onClick={() => handleLink(1)}>
          <ListItemIcon><PersonIcon /></ListItemIcon>
          <ListItemText primary="Qu???n l?? t??i kho???n" />
        </ListItem>
        <ListItem button key="Problem" onClick={() => handleLink(6)}>
          <ListItemIcon><MenuIcon /></ListItemIcon>
          <ListItemText primary="Qu???n l?? v???n ?????" />
        </ListItem>
        <ListItem button key="Service" onClick={() => handleLink(5)}>
          <ListItemIcon><MenuIcon /></ListItemIcon>
          <ListItemText primary="Qu???n l?? d???ch v???" />
        </ListItem>
        <ListItem button key="Store" onClick={() => handleLink(2)}>
          <ListItemIcon><StoreIcon /></ListItemIcon>
          <ListItemText primary="Qu???n l?? c???a h??ng" />
        </ListItem>
        <ListItem button key="ReportStore" onClick={() => handleLink(7)}>
          <ListItemIcon><ErrorIcon /></ListItemIcon>
          <ListItemText primary="B??o c??o c???a h??ng" />
        </ListItem>
        <ListItem button key="Report" onClick={() => handleLink(4)}>
          <ListItemIcon><ErrorIcon /></ListItemIcon>
          <ListItemText primary="B??o c??o b??nh lu???n" />
        </ListItem>
        <ListItem button key="Comment" onClick={() => handleLink(3)}>
          <ListItemIcon><CommentIcon /></ListItemIcon>
          <ListItemText primary="Qu???n l?? b??nh lu???n" />
        </ListItem>
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            ADMIN
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
     
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        
      </main>
    </div>
  );
}

// ResponsiveDrawer.propTypes = {
//   window: PropTypes.func,
// };

export default Home;
