import { CyrcleCheckIcon, CyrcleXMarkIcon, DarkThemeIcon, FemaleIcon, InProcessIcon, LightThemeIcon, MaleIcon, StepInProcessIcon } from "./Icons";
// const size = 15


// Rows per page 
export const rows_per_page = 20
export const user_ability_rows_per_page = [10, 20, 30, 40, 50]

export const size = 15


export const study_degrees = [
    {
        key: 'bachelor',
        name: {
            en: 'Bachelor degree',
            fr: 'Licence Je travaille',
            ar: 'درجة البكالوريوس',
        },
        color: 'blue'
    },
    {
        key: 'master',
        name: {
            en: 'Master degree',
            fr: 'Diplôme de Master',
            ar: 'درجة الماجستير',
        },
        color: 'red'

    },
    {
        key: 'phd',
        name: {
            en: 'PHD degree',
            fr: 'Diplôme de doctorat',
            ar: 'درجة الدكتوراه',
        },
        color: 'green'

    },
]








export const dates_translation = {
    days: {
        en: 'Days',
        fr: 'Jours',
        ar: 'يوم',
    },
    hours: {
        en: 'Hours',
        fr: 'Heures',
        ar: 'ساعات',
    },
    minutes: {
        en: 'Minutes',
        fr: 'Minutes',
        ar: 'دقائق',
    },
    seconds: {
        en: 'Seconds',
        fr: 'Seconds',
        ar: 'ثواني',
    },
}


export const genders_list = [
    {
        key: 'male',
        icon: <MaleIcon special_size={size} />,
        name: {
            en: 'Male',
            fr: 'Mâle',
            ar: 'ذكر',
        },
    },
    {
        key: 'female',
        icon: <FemaleIcon special_size={size} />,
        name: {
            en: 'Female',
            fr: 'Femelle',
            ar: 'أنثى',
        },
    },
]




export const family_links = [
    {
        key: 'mother',
        name: {
            en: 'Mother',
            fr: 'Mère',
            ar: 'الأم',
        },
    },
    {
        key: 'father',
        name: {
            en: 'Father',
            fr: 'Père',
            ar: 'أب',
        },
    },
    {
        key: 'sister',
        name: {
            en: 'Sister',
            fr: 'Sœur',
            ar: 'أخت',
        },
    },
    {
        key: 'brother',
        name: {
            en: 'Brother',
            fr: 'Frère',
            ar: 'أخ',
        },
    },

]






export const registeration_semesters = [
    {
        key: 'full_semester',
        name: {
            en: 'Fall semester',
            fr: 'Semestre complet',
            ar: 'الفصل الدراسي الكامل',
        },
    },
    {
        key: 'spring_semester',
        name: {
            en: 'Spring semester',
            fr: 'Semestre de printemps',
            ar: 'الفصل الدراسي الربيعي',
        },
    },


]






export const customer_sponsor_position = [
    {
        key: 'employee',
        name: {
            en: 'Employee',
            fr: 'Employé',
            ar: 'موظف',
        },
    },
    {
        key: 'retired_agent',
        name: {
            en: 'Retired agent',
            fr: 'Agent à la retraite',
            ar: 'وكيل متقاعد',
        },
    },
    {
        key: 'entrepreneur',
        name: {
            en: 'Entrepreneur',
            fr: 'Entrepreneur',
            ar: 'مُقَاوِل',
        },
    },
    {
        key: 'other',
        name: {
            en: 'Other',
            fr: 'Autre',
            ar: 'آخر',
        },
    },



]





export const student_accommodations = [
    {
        key: 'true',
        name: {
            en: 'Yes, with accommodation',
            fr: 'Yes, with accommodation',
            ar: 'Yes, with accommodation',
        },
    },
    {
        key: 'false',
        name: {
            en: 'No, without accommodation',
            fr: 'No, without accommodation',
            ar: 'No, without accommodation',
        },
    },
]






export const is_with_translation = [
    {
        key: 'true',
        name: {
            en: 'Yes, with translation',
            fr: 'Yes, with translation',
            ar: 'Yes, with translation',
        },
    },
    {
        key: 'false',
        name: {
            en: 'No, without translation',
            fr: 'No, without translation',
            ar: 'No, without translation',
        },
    },
]







export const all_statuses = [
    {
        id: 1,
        key: 'accepted',
        name: {
            en: 'Accepted',
            fr: 'Accepté',
            ar: 'مقبول',
        },
        icon: <CyrcleCheckIcon />
    },
    {
        id: 2,
        key: 'pending',
        name: {
            en: 'Pending',
            fr: 'En attente',
            ar: 'قيد الانتظار',
        },
        icon: <StepInProcessIcon />
    },
    {
        id: 3,
        key: 'in_process',
        name: {
            en: 'In process',
            fr: 'En cours',
            ar: 'في طور التنفيذ',
        },
        icon: <StepInProcessIcon />
    },
    {
        id: 3,
        key: 'refused',
        name: {
            en: 'Refused',
            fr: 'Refusé',
            ar: 'مرفوض',
        },
        icon: <CyrcleXMarkIcon />
    },
    {
        id: 4,
        key: 'files_refused',
        name: {
            en: 'Files refused',
            fr: 'Dossiers refusés',
            ar: 'ملفات مرفوضة',
        },
        icon: <CyrcleXMarkIcon />
    },
    {
        id: 5,
        key: 'refuse_with_comment',
        name: {
            en: 'Refused with comment',
            fr: 'Refusé avec commentaire',
            ar: 'رفض مع التعليق',
        },
        icon: <CyrcleXMarkIcon />
    },
    {
        id: 6,
        key: 'queued',
        name: {
            en: 'Queued',
            fr: 'En file d\'attente',
            ar: 'في قائمة الانتظار',
        },
        icon: <StepInProcessIcon />
    },
]



export const customers_statuses = [
    {
        key: 'passed',
        name: {
            en: 'passed',
            fr: 'passed',
            ar: 'نشط',
        },
        background: 'bg-red-500',
        border: 'border-red-500',
    },
    {
        key: 'active',
        name: {
            en: 'Active',
            fr: 'Active',
            ar: 'نشط',
        },
        background: 'bg-green-700',
        border: 'border-green-700',
    },
    {
        key: 'unactive',
        name: {
            en: 'Unactive',
            fr: 'Inactive',
            ar: 'غير نشط',
        },
        background: 'bg-yellow-500',
        border: 'border-yellow-500',
    },
    {
        key: 'warning',
        name: {
            en: 'warning',
            fr: 'avertissement',
            ar: 'تحذير',
        },
        background: 'bg-yellow-500',
        border: 'border-yellow-500',
    },
    {
        key: 'in_process',
        name: {
            en: 'In process',
            fr: 'En cours',
            ar: 'في طور التنفيذ',
        },
        background: 'bg-yellow-500',
        border: 'border-yellow-500',
    },
    {
        key: 'completed',
        name: {
            en: 'Completed',
            fr: 'Complété',
            ar: 'مكتمل',
        },
        background: 'bg-green-700',
        border: 'border-green-700',
    },
    {
        key: 'deleted',
        name: {
            en: 'Deleted',
            fr: 'Supprimé',
            ar: 'تم الحذف',
        },
        background: 'bg-red-500',
        border: 'border-red-500',

    },
    {
        key: 'refused',
        name: {
            en: 'Refused',
            fr: 'Refusé',
            ar: 'رفض',
        },
        background: 'bg-red-500',
        border: 'border-red-500',

    },
    {
        key: 'files_refused',
        name: {
            en: 'Files refused',
            fr: 'Dossiers refusés',
            ar: 'ملفات مرفوضة',
        },
        background: 'bg-red-500',
        border: 'border-red-500',
    },
    {
        key: 'queued',
        name: {
            en: 'Queued',
            fr: 'En file d\'attente',
            ar: 'في قائمة الانتظار',
        },
        background: 'bg-gray-600',
        border: 'border-gray-500',

    },
    {
        key: 'success',
        name: {
            en: 'Success',
            fr: 'succès',
            ar: 'ناجح',
        },
        background: 'bg-green-700',
        border: 'border-green-700',

    },
    {
        key: 'accepted',
        name: {
            en: 'Accepted',
            fr: 'Accepté',
            ar: 'مقبول',
        },
        background: 'bg-green-700',
        border: 'border-green-700',

    },
    {
        key: 'pending',
        name: {
            en: 'Pending',
            fr: 'En attente',
            ar: 'قيد الانتظار',
        },
        background: 'bg-blue-500',
        border: 'border-blue-500',
    },
    {
        key: 'new_files',
        name: {
            en: 'New files',
            fr: 'Nouveaux fichiers',
            ar: 'ملفات جديدة',
        },
        background: 'bg-blue-500',
        border: 'border-blue-500',
    },
    {
        key: 'current',
        name: {
            en: 'Current',
            fr: 'Actuel',
            ar: 'حاضِر',
        },
        background: 'bg-blue-500',
        border: 'border-blue-500',

    },

]





export const themes = [
    {
        key: 'dark',
        name: {
            en: 'Dark mode',
            fr: 'Mode sombre',
            ar: 'الوضع المظلم',
        },
        icon: <DarkThemeIcon />
    },
    {
        key: 'light',
        name: {
            en: 'Light mode',
            fr: 'Mode clair',
            ar: 'وضع الضوء'
        },
        icon: <LightThemeIcon />
    },
]
