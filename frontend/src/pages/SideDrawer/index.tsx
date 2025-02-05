import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import GroupsIcon from '@mui/icons-material/Groups';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SummarizeIcon from '@mui/icons-material/Summarize';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../stores/authStore';
import { Roles } from '../../constants/roles';
interface SideDrawerProps {
    setDrawer: (isOpen: boolean) => void,
    isOpen: boolean
}

interface DrawerTab {
    text: string;
    icon: any,
    onClick: () => void;
}

type DrawerListType = DrawerTab[];


const SideDrawer: React.FC<SideDrawerProps> = ({ setDrawer, isOpen }) => {
    const navigate = useNavigate();
    const { role } = useAuthStore();
    const BasicList: DrawerListType = [
        { text: "View Dashboard", icon: DashboardIcon, onClick: () => navigate("/users") },
        { text: "Profile Management", icon: AccountBoxIcon, onClick: () => navigate("/profile") }
    ]

    const UserList: DrawerListType = [
        ...BasicList,
        { text: "View My Licenses", icon: CardMembershipIcon, onClick: () => navigate("/mylicenses") },
    ]

    const AdminList: DrawerListType = [
        ...BasicList,
        { text: "Manage Teams", icon: GroupsIcon, onClick: () => navigate("/teams"), },
        { text: "View Catalog", icon: VisibilityIcon, onClick: () => navigate("/catalog") },
        { text: "View Subscriptions", icon: SubscriptionsIcon, onClick: () => navigate("/subscriptions") },
        { text: "View Licenses", icon: CardMembershipIcon, onClick: () => navigate("/licenses") },
        { text: "Usage Logs", icon: SummarizeIcon, onClick: () => navigate("/usagelogs") },
        { text: "Reports", icon: AssessmentIcon, onClick: () => navigate("/reports") }
    ]

    const drawerList = (role === Roles.Admin) ? AdminList : UserList;

    const getListElement = (list: DrawerListType): React.ReactNode => {
        return (
            <List >
                {list.map((item) => (
                    <ListItem onClick={() => {
                        item.onClick();
                    }
                    } key={item.text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {<item.icon />}
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        )
    }

    const DrawerList = (
        <Box sx={{ width: 300 }} role="presentation" onClick={() => setDrawer(false)}>
            {/* <IconButton onClick={() => setDrawer(false)}>
                <ChevronLeftIcon />
            </IconButton> */}
            {getListElement(drawerList)}
        </Box>
    );

    return (
        <div>
            <Drawer open={isOpen} onClose={() => setDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    );
}
export default SideDrawer;