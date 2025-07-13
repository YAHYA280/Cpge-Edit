import { CalendarIcon, DepartementIcon, EmailIcon, HashtagIcon, InProcessIcon, PhoneIcon, SettingsIcon, StepIcon, TimerIcon, UserIcon } from "@/constants/Icons";


const columns_icons_size = 15


const columns = [
    // { label: "ID", key: "id", icon: <HashtagIcon special_size={columns_icons_size} /> },
    { label: "CUSTOMER", key: "customer", icon: <UserIcon special_size={columns_icons_size} /> },
    { label: "REACHED STEP", key: "step", icon: <StepIcon special_size={columns_icons_size} /> },

    { label: "DEPARTEMENT", key: "departement", icon: <DepartementIcon special_size={columns_icons_size} />, },

    // { label: "AGE", key: "age", icon: <CalendarIcon special_size={columns_icons_size} /> },

    // { label: "PHONE", key: "phone", icon: <PhoneIcon special_size={columns_icons_size} /> },
    { label: "STATUS", key: "status", icon: <InProcessIcon special_size={columns_icons_size} /> },
    { label: "CREATEDAT", key: "createdAt", icon: <TimerIcon special_size={columns_icons_size} /> },
    
    { label: "ACTIONS", key: "actions", icon: <SettingsIcon special_size={columns_icons_size} />, },
];




export { columns }
