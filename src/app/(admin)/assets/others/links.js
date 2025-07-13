import { AddIcon, AddUserIcon, AdminIcon, AnalyticsArrowUpIcon, DashboardIcon, DepartementIcon, FlagIcon, LibraryIcon, NotificationIcon, PassportIcon, SchoolIcon, UpdateIcon, UserIcon, UsersIcon } from "@/constants/Icons";
import { RiArrowDownSLine, RiUserLine, RiDashboardLine, RiGroup2Line, RiNotification3Line, RiKeyLine } from "@remixicon/react";

const size = 15
export const settings_list = [
    {
        id: 0,
        name: 'Settings',
        link: '/settings',
        icon: <UserIcon
        />,
    }
]

const route = ['add', 'details', 'update']

const side_bar_links_size = 18
export const side_bar_links = [

    {
        section_name: 'Work space',
        links: [
            {
                id: 0,
                name: 'Dashboard',
                link: '/dashboard',
                icon: <DashboardIcon
                />,
                deny_access_for: []
            },
            {
                id: 1,
                name: 'Analytics',
                link: '/analytics',
                icon: <AnalyticsArrowUpIcon />,
                deny_access_for: []
            },
            {
                id: 2,
                name: 'Students',
                link: '/customers',
                icon: <UsersIcon
                />,
                deny_access_for: []
            },
            {
                id: 3,
                name: 'Notifications',
                link: '/notifications',
                icon: <NotificationIcon
                />,
                deny_access_for: []
            },
            {
                id: 4,
                name: 'Admins',
                link: '/manage_admins',
                icon: <AdminIcon
                />,
                deny_access_for: ['employee', 'super_employee']
            },
            {
                id: 5,
                name: 'Add',
                link: [
                    {
                        id: 0,
                        name: 'Student',
                        link: `/${route[0]}/customer`,
                        icon: <AddUserIcon special_size={17} />,
                        deny_access_for: []
                    },
                    {
                        id: 1,
                        name: 'Agent',
                        link: `/${route[0]}/admin`,
                        icon: <AddUserIcon special_size={17} />,
                        deny_access_for: ['employee', 'super_employee']
                    },
                    {
                        id: 2,
                        name: 'University document',
                        link: `/${route[0]}/universityDocument`,
                        icon: <SchoolIcon special_size={17} />,
                        deny_access_for: []
                    },
                    {
                        id: 3,
                        name: 'Visa document',
                        link: `/${route[0]}/visaDocument`,
                        icon: <PassportIcon special_size={17} />,
                        deny_access_for: []
                    },

                ],
                icon: <AddIcon />,
                deny_access_for: []
            },
            {
                id: 6,
                name: 'Update',
                link: [
                    {
                        id: 0,
                        name: 'University document',
                        link: `/${route[2]}/universityDocuments`,
                        icon: <SchoolIcon special_size={17} />,
                        deny_access_for: []
                    },
                    {
                        id: 1,
                        name: 'Visa document',
                        link: `/${route[2]}/visaDocuments`,
                        icon: <PassportIcon special_size={17} />,
                        deny_access_for: []
                    },

                ],
                icon: <UpdateIcon />,
                deny_access_for: []
            },

        ]
    },
    {
        section_name: 'Details',
        links: [
            {
                id: 0,
                name: 'Resources',
                link: [
                    {
                        id: 0,
                        name: 'Countries',
                        link: `/${route[1]}/countries`,
                        icon: <FlagIcon />,
                        deny_access_for: []
                    },
                    {
                        id: 1,
                        name: 'Schools',
                        link: `/${route[1]}/schools`,
                        icon: <SchoolIcon />,
                        deny_access_for: []
                    },
                    {
                        id: 2,
                        name: 'Departements',
                        link: `/${route[1]}/departements`,
                        icon: <DepartementIcon />,
                        deny_access_for: []
                    },
                ],
                icon: <LibraryIcon />,
            },


        ]
    }


]



