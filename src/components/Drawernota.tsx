
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import  Container  from '@mui/material/Container';
import { Outlet, Link } from "react-router-dom";
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import  Stack  from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import NotificationsIcon from '@mui/icons-material/Notifications'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TopicIcon from '@mui/icons-material/Topic';
import Avatar from '@mui/material/Avatar';
import { green, pink,orange } from '@mui/material/colors';
import { useState } from 'react';
import { useAuth } from './Auth';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    /**
     * This is necessary to enable the selection of content. In the DOM, the stacking order is determined
     * by the order of appearance. Following this rule, elements appearing later in the markup will overlay
     * those that appear earlier. Since the Drawer comes after the Main content, this adjustment ensures
     * proper interaction with the underlying content.
     */
    position: 'relative',
    variants: [
      {
        props: ({ open }) => open,
        style: {
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          marginRight: 0,
        },
      },
    ],
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: drawerWidth,
      },
    },
  ],
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

export default function Drawernota() {
  const auth = useAuth();
  const navigate = useNavigate();
  const handlelogout = () => {
     auth?.logout();
     navigate("/Login")
  }
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [openn, setOpenn] = useState(true);

  const handleClick = () => {
    setOpenn(!openn);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} >
        <Toolbar>
             <Avatar
             alt="Remy Sharp"
             src="/src/assets/LOGO.png"
            sx={{ bgcolor: 'rgba(255, 255, 255, 0.87)'}}
          />
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
                     NotaLink  الموثق الالكتروني </Typography>
      <MenuItem>
      <Button sx={{ color: 'white' }} onClick={handlelogout}> الخروج </Button>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
              <Stack direction="row" spacing={2} sx={{pr:40}}>
                <Button sx={{ color: 'white' }} component={Link} to="/Contactt">الاتصال بنا </Button>
                <Button sx={{ color: 'white' }} component={Link} to="/Iframee">حساب المواريث</Button>
                <Button sx={{ color: 'white' }} component={Link} to="/Notaryfinder">البحث عن موثق</Button>
                <Button sx={{ color: 'white' }} component={Link} to="/Calculact">حساب التكلفة</Button>
                <Button sx={{ color: 'white' }} component={Link} to="/Createact">تحرير عقد</Button>
                <Button sx={{ color: 'white' }} component={Link} to="/">الرئيسة</Button>
              </Stack>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            sx={[open && { display: 'none' }]}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Main open={open}>
        <DrawerHeader  />
     <Container   class="w-full md:w-auto">

      <Outlet/>
      </Container>
      </Main>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },

        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>

        </DrawerHeader>
        <Divider />
        <List dir='rtl' >
            <ListItemButton component={Link} to="/"   sx={{
    ':hover': {
      bgcolor: 'primary.main', // theme.palette.primary.main
      color: 'white',
    },
  }}>
                <ListItemIcon>
                  <Avatar sx={{ bgcolor: pink[500] }}>
                        <AccountBalanceIcon />
                     </Avatar>
                  
                </ListItemIcon>
              <ListItemText  primary="الرئيسية"  />
           </ListItemButton>
           <ListItemButton component={Link} to="/">
              <ListItemIcon>
                      <Avatar sx={{ bgcolor: pink[500] }}>
                       <DashboardIcon />
                     </Avatar>
                 
                </ListItemIcon>
              <ListItemText primary="لوحة القيادة" />
            </ListItemButton>
            <ListItemButton onClick={handleClick} > 
                <ListItemIcon>
                    <Avatar sx={{ bgcolor: green[500] }}>
                        <TopicIcon />
                     </Avatar>
                
                </ListItemIcon>
            <ListItemText primary="سجلات البيانات"  />
             {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
             <Collapse in={openn} timeout="auto" unmountOnExit>
             <List component="div" disablePadding>
             <ListItemButton >
                  <ListItemIcon>
                   <Avatar sx={{ bgcolor: orange[500] }}>
                        <TopicIcon />
                     </Avatar>
                    
                 </ListItemIcon>
                <ListItemText primary="الاشخاص الطبعيين" />
             </ListItemButton>
             <ListItemButton >
                  <ListItemIcon>
                    <Avatar sx={{ bgcolor: orange[500] }}>
                        <TopicIcon />
                     </Avatar>
                 </ListItemIcon>
                <ListItemText primary="الاشخاص المعنويين" />
             </ListItemButton> 
             <ListItemButton>
                  <ListItemIcon>
                    <Avatar sx={{ bgcolor: orange[500] }}>
                        <TopicIcon />
                     </Avatar>
                 </ListItemIcon>
                <ListItemText primary="العقارات" />
             </ListItemButton>
             <ListItemButton >
                  <ListItemIcon>
                    <Avatar sx={{ bgcolor: orange[500] }}>
                        <TopicIcon />
                     </Avatar>
                 </ListItemIcon>
                <ListItemText primary="المركبات" />
             </ListItemButton>                                      
             </List>
            </Collapse>
     <ListItemButton onClick={handleClick} > 
                <ListItemIcon>
                 <Avatar sx={{ bgcolor: green[500] }}>
                        <TopicIcon />
                     </Avatar>
                </ListItemIcon>
            <ListItemText primary="فهرس العقود "  />
             {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
             <Collapse in={openn} timeout="auto" unmountOnExit>
             <List component="div" disablePadding>
             <ListItemButton >
                  <ListItemIcon>
                    <Avatar sx={{ bgcolor: orange[500] }}>
                        <TopicIcon />
                     </Avatar>
                 </ListItemIcon>
                <ListItemText primary="تحرير العقود " />
             </ListItemButton>
             <ListItemButton >
                  <ListItemIcon>
                    <Avatar sx={{ bgcolor: orange[500] }}>
                        <TopicIcon />
                     </Avatar>
                 </ListItemIcon>
                <ListItemText primary="الفهرس اليومي للعقود " />
             </ListItemButton> 
             <ListItemButton >
                  <ListItemIcon>
                    <Avatar sx={{ bgcolor: orange[500] }}>
                        <TopicIcon />
                     </Avatar>
                 </ListItemIcon>
                <ListItemText primary="الفهرس الرسمي " />
             </ListItemButton>                                    
             </List>
            </Collapse>  
     <ListItemButton onClick={handleClick} > 
                <ListItemIcon>
                 <Avatar sx={{ bgcolor: green[500] }}>
                        <TopicIcon />
                     </Avatar>
                </ListItemIcon>
            <ListItemText primary="المحاسبة التوثيقية  "  />
             {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
             <Collapse in={openn} timeout="auto" unmountOnExit>
             <List component="div" disablePadding>
             <ListItemButton >
                  <ListItemIcon>
                    <Avatar sx={{ bgcolor: orange[500] }}>
                        <TopicIcon />
                     </Avatar>
                 </ListItemIcon>
                <ListItemText primary="قبض مصاريف العقود  " />
             </ListItemButton>
             <ListItemButton >
                  <ListItemIcon>
                   <Avatar sx={{ bgcolor: orange[500] }}>
                        <TopicIcon />
                     </Avatar>
                 </ListItemIcon>
                <ListItemText primary="سجل الارادات و النفقات   " />
             </ListItemButton> 
             <ListItemButton >
                  <ListItemIcon>
                    <Avatar sx={{ bgcolor: orange[500] }}>
                        <TopicIcon />
                     </Avatar>
                 </ListItemIcon>
                <ListItemText primary="دفاتر الصندوق و النفقات  " />
             </ListItemButton>                                    
             </List>
            </Collapse> 
      <ListItemButton onClick={handleClick} > 
                <ListItemIcon>
                 <Avatar sx={{ bgcolor: green[500] }}>
                        <TopicIcon />
                     </Avatar>
                </ListItemIcon>
            <ListItemText primary="تسجيل العقود   "  />
             {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
             <Collapse in={openn} timeout="auto" unmountOnExit>
             <List component="div" disablePadding>
             <ListItemButton >
                  <ListItemIcon>
                    <Avatar sx={{ bgcolor: orange[500] }}>
                        <TopicIcon />
                     </Avatar>
                 </ListItemIcon>
                <ListItemText primary="حالات ايداع العقود   " />
             </ListItemButton>
             <ListItemButton >
                  <ListItemIcon>
                    <Avatar sx={{ bgcolor: orange[500] }}>
                        <TopicIcon />
                     </Avatar>
                 </ListItemIcon>
                <ListItemText primary="مراجع تسجيل العقود     " />
             </ListItemButton>                                    
             </List>
            </Collapse>   
       <ListItemButton onClick={handleClick} > 
                <ListItemIcon>
                 <Avatar sx={{ bgcolor: green[500] }}>
                        <TopicIcon />
                     </Avatar>
                </ListItemIcon>
            <ListItemText primary="حساب الزبائن    "  />
             {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
             <Collapse in={openn} timeout="auto" unmountOnExit>
             <List component="div" disablePadding>
             <ListItemButton component={Link} to="calculenota" >
                  <ListItemIcon>
                    <Avatar sx={{ bgcolor: orange[500] }}>
                        <TopicIcon />
                     </Avatar>
                 </ListItemIcon>
                <ListItemText primary="النظر العامة لحساب الزبائن" />
             </ListItemButton>
                          <ListItemButton  component={Link} to="calculenota" >
                  <ListItemIcon>
                    <Avatar sx={{ bgcolor: orange[500] }}>
                        <TopicIcon />
                     </Avatar>
                 </ListItemIcon>
                <ListItemText primary="متابعة ودائع الزبائن" />
             </ListItemButton>
             <ListItemButton  component={Link} to="calculenota" >
                  <ListItemIcon>
                   <Avatar sx={{ bgcolor: orange[500] }}>
                        <TopicIcon />
                     </Avatar>
                 </ListItemIcon>
                <ListItemText primary="متابعة صكوك الزبائن" />
             </ListItemButton> 
             <ListItemButton component={Link} to="calculenota" >
                  <ListItemIcon>
                    <Avatar sx={{ bgcolor: orange[500] }}>
                        <TopicIcon />
                     </Avatar>
                 </ListItemIcon>
                <ListItemText primary="متابعة الوضعية الجبائية" />
             </ListItemButton>   
              <ListItemButton component={Link} to="calculenota">
                  <ListItemIcon>
                    <Avatar sx={{ bgcolor: orange[500] }}>
                        <TopicIcon />
                     </Avatar>
                 </ListItemIcon>
                <ListItemText primary="الدفتر اليومي للزبائن  " />
             </ListItemButton>                                             
             </List>
            </Collapse>   
      <ListItemButton onClick={handleClick} > 
                <ListItemIcon>
                 <Avatar sx={{ bgcolor: green[500] }}>
                        <TopicIcon />
                     </Avatar>
                </ListItemIcon>
            <ListItemText primary="حساب المكتب"  />
             {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
             <Collapse in={openn} timeout="auto" unmountOnExit>
             <List component="div" disablePadding>
             <ListItemButton >
                  <ListItemIcon>
                    <Avatar sx={{ bgcolor: orange[500] }}>
                        <TopicIcon />
                     </Avatar>
                 </ListItemIcon>
                <ListItemText primary=" النظرة العامة لحساب المكتب" />
             </ListItemButton>
                          <ListItemButton >
                  <ListItemIcon>
                    <Avatar sx={{ bgcolor: orange[500] }}>
                        <TopicIcon />
                     </Avatar>
                 </ListItemIcon>
                <ListItemText primary="متابعة صكوك المكتب  " />
             </ListItemButton>
             <ListItemButton >
                  <ListItemIcon>
                    <Avatar sx={{ bgcolor: orange[500] }}>
                        <TopicIcon />
                     </Avatar>
                 </ListItemIcon>
                <ListItemText primary="متابعة تزويد المكتب  " />
             </ListItemButton> 
             <ListItemButton >
                  <ListItemIcon>
                    <Avatar sx={{ bgcolor: orange[500] }}>
                        <TopicIcon />
                     </Avatar>
                 </ListItemIcon>
                <ListItemText primary=" الدفتر الومي للمكتب  " />
             </ListItemButton>                                               
             </List>
            </Collapse>  
          <ListItemButton onClick={handleClick} > 
                <ListItemIcon>
                 <Avatar sx={{ bgcolor: green[500] }}>
                        <TopicIcon />
                     </Avatar>
                </ListItemIcon>
            <ListItemText primary="المحاسبة العامة "  />
             {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
             <Collapse in={openn} timeout="auto" unmountOnExit>
             <List component="div" disablePadding>
             <ListItemButton >
                  <ListItemIcon>
                    <Avatar sx={{ bgcolor: orange[500] }}>
                        <TopicIcon />
                     </Avatar>
                 </ListItemIcon>
                <ListItemText primary="التصريحات الجبائية" />
             </ListItemButton>
                          <ListItemButton >
                  <ListItemIcon>
                    <Avatar sx={{ bgcolor: orange[500] }}>
                        <TopicIcon />
                     </Avatar>
                 </ListItemIcon>
                <ListItemText primary="ادارة الموظفين" />
             </ListItemButton>
             <ListItemButton >
                  <ListItemIcon>
                    <Avatar sx={{ bgcolor: orange[500] }}>
                        <TopicIcon />
                     </Avatar>
                 </ListItemIcon>
                <ListItemText primary="متابعة فواتير الشراء" />
             </ListItemButton>                                                
             </List>
            </Collapse>    
              <ListItemButton onClick={handleClick} > 
                <ListItemIcon>
                 <Avatar sx={{ bgcolor: green[500] }}>
                        <TopicIcon />
                     </Avatar>
                </ListItemIcon>
            <ListItemText primary="الارشيف"  />
             {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
             <Collapse in={openn} timeout="auto" unmountOnExit>
             <List component="div" disablePadding>
             <ListItemButton >
                  <ListItemIcon>
                    <Avatar sx={{ bgcolor: orange[500] }}>
                        <TopicIcon />
                     </Avatar>
                 </ListItemIcon>
                <ListItemText primary="الارشيق الرقمي " />
             </ListItemButton>
                          <ListItemButton >
                  <ListItemIcon>
                    <Avatar sx={{ bgcolor: orange[500] }}>
                        <TopicIcon />
                     </Avatar>
                 </ListItemIcon>
                <ListItemText primary="المسح السريع " />
             </ListItemButton>                                                
             </List>
            </Collapse> 
                 <ListItemButton onClick={handleClick} > 
                <ListItemIcon>
                 <Avatar sx={{ bgcolor: green[500] }}>
                        <TopicIcon />
                     </Avatar>
                </ListItemIcon>
            <ListItemText primary="قاعدة المعرفة"  />
             {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
             <Collapse in={openn} timeout="auto" unmountOnExit>
             <List component="div" disablePadding>
             <ListItemButton >
                  <ListItemIcon>
                    <Avatar sx={{ bgcolor: orange[500] }}>
                        <TopicIcon />
                     </Avatar>
                 </ListItemIcon>
                <ListItemText primary="نظرة عامة  " />
             </ListItemButton>
                          <ListItemButton >
                  <ListItemIcon>
                    <Avatar sx={{ bgcolor: orange[500] }}>
                        <TopicIcon />
                     </Avatar>
                 </ListItemIcon>
                <ListItemText primary="وثائق العقود  " />
             </ListItemButton>                                                
             </List>
            </Collapse>                                                            
        </List>
      </Drawer>
       
    </Box>
     
  );
}