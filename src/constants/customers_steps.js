import { AdmissionIcon, ClapIcon, DocumentsIcon, FileIcon, NotificationStepIcon, PaperIcon, PassportIcon, SignatureIcon } from "./Icons"

const size = 25


const customers_steps = [
    {
        key: 'step_1',
        idName: 'Step 1',
        icon: <SignatureIcon special_size={size} />,
        name: {
            en: 'Signature of Agency Contract',
            fr: 'Signature du Contrat (Importé + Téléchargé)',
            ar: 'توقيع العقد (مستورد + تم تنزيله)',
        },
        description: {
            en: 'In this step you have to upload ...',
            fr: 'Dans cette étape, vous devez télécharger...',
            ar: 'في هذه الخطوة عليك تحميل...'
        },


        what_to_do: [
            {
                key: 1,
                description: {
                    en: 'Please download the contract below',
                    fr: 'Dans cette étape, vous devez télécharger...',
                    ar: 'في هذه الخطوة عليك تحميل...'
                },

                name: {
                    en: 'Contract file',
                    fr: 'Contract file',
                    ar: 'ملف العقد'
                },
                actionType: 'download-file'
            },
            {
                key: 2,
                description: {
                    en: 'Please upload your contract after signing in',
                    fr: 'Dans cette étape, vous devez télécharger...',
                    ar: 'في هذه الخطوة عليك تحميل...'
                },
                name: {
                    en: 'Contract file fter signing ',
                    fr: 'Dossier de contrat après signature',
                    ar: 'ملف العقد بعد التوقيع'
                },
                actionType: 'upload-file',
            },
        ],
        what_to_download: [
            {
                key: 1,
                description: {
                    en: 'Please download the contract below',
                    fr: 'Dans cette étape, vous devez télécharger...',
                    ar: 'في هذه الخطوة عليك تحميل...'
                },

                name: {
                    en: 'Contract file',
                    fr: 'Contract file',
                    ar: 'ملف العقد'
                },
                actionType: 'download-file'
            },
        ],
        what_to_upload: [
            {
                key: 1,
                description: {
                    en: 'Please upload your contract after signing in',
                    fr: 'Dans cette étape, vous devez télécharger...',
                    ar: 'في هذه الخطوة عليك تحميل...'
                },
                name: {
                    en: 'Contract file fter signing ',
                    fr: 'Dossier de contrat après signature',
                    ar: 'ملف العقد بعد التوقيع'
                },
                actionType: 'upload-file',
            },
        ],

        isLocalSteps: true, // Are this step what to dos steps, are located in this object.
        inputType: 'upload-file'
    },
    {
        key: 'step_2',
        idName: 'Step 2',
        icon: <DocumentsIcon special_size={size} />,
        name: {
            en: 'Documents requested by the University ',
            fr: 'Assemblage de documents universitaires (importés + téléchargés)',
            ar: 'تجميع المستندات الجامعية (مستوردة + تم تنزيلها)',
        },
        description: {
            en: 'In this step you have to upload ...',
            fr: 'Dans cette étape, vous devez télécharger...',
            ar: 'في هذه الخطوة عليك تحميل...'
        },
        isLocalSteps: false,
        // what_to_do: [
        //     {
        //         key: 1,
        //         description: {
        //             en: 'Please upload the passport',
        //             fr: 'Dans cette étape, vous devez télécharger...',
        //             ar: 'في هذه الخطوة عليك تحميل...'
        //         },
        //         name: {
        //             en: 'Contract file',
        //             fr: 'Contract file',
        //             ar: 'Contract file'
        //         },
        //         actionType: 'download-file'
        //     },
        //     {
        //         key: 2,
        //         description: {
        //             en: 'Please upload your personal photo',
        //             fr: 'Dans cette étape, vous devez télécharger...',
        //             ar: 'في هذه الخطوة عليك تحميل...'
        //         },
        //         name: {
        //             en: 'Personal photo',
        //             fr: 'Contract file',
        //             ar: 'Contract file'
        //         },
        //         actionType: 'upload-file'
        //     },
        //     {
        //         key: 3,
        //         description: {
        //             en: 'Please upload your Card ID',
        //             fr: 'Dans cette étape, vous devez télécharger...',
        //             ar: 'في هذه الخطوة عليك تحميل...'
        //         },
        //         name: {
        //             en: 'Card ID',
        //             fr: 'Card ID',
        //             ar: 'Card ID'
        //         },
        //         actionType: 'upload-file'
        //     },
        //     {
        //         key: 4,
        //         description: {
        //             en: 'Please upload your school letter',
        //             fr: 'Dans cette étape, vous devez télécharger...',
        //             ar: 'في هذه الخطوة عليك تحميل...'
        //         },
        //         name: {
        //             en: 'School letter',
        //             fr: 'School letter',
        //             ar: 'School letter'
        //         },
        //         actionType: 'upload-file'
        //     },
        // ],
        inputType: 'upload-file'

    },
    {
        key: 'step_3',
        idName: 'Step 3',

        icon: <PaperIcon special_size={size} />,
        name: {
            en: 'University Registration',
            fr: 'Inscription à l\'université',
            ar: 'التسجيل الجامعي'
        },
        description: {
            en: 'In this step you have to upload ...',
            fr: 'Dans cette étape, vous devez télécharger...',
            ar: 'في هذه الخطوة عليك تحميل...'
        },
        what_to_do: [
            {
                key: 1,
                description: {
                    en: 'Please download University Application Fee Invoice',
                    fr: 'Veuillez télécharger la facture des frais d\'inscription à l\'université',
                    ar: 'يرجى تنزيل فاتورة رسوم التقديم للجامعة'
                },
                name: {
                    en: 'Application Fee Invoice',
                    fr: 'Application Fee Invoice',
                    ar: 'Application Fee Invoice'
                },
                actionType: 'download-file'
            },
            {
                key: 2,
                description: {
                    en: 'Please upload University Application Fee Payment Receipt',
                    fr: 'Veuillez télécharger le reçu de paiement des frais d\'inscription à l\'université',
                    ar: 'يرجى تحميل إيصال دفع رسوم التقديم للجامعة'
                },
                name: {
                    en: 'Application Fee Payment Receipt',
                    fr: 'Application Fee Payment Receipt',
                    ar: 'Application Fee Payment Receipt'
                },
                actionType: 'upload-file'
            },
        ],
        what_to_download: [
            {
                key: 1,
                description: {
                    en: 'Please download University Application Fee Invoice',
                    fr: 'Veuillez télécharger la facture des frais d\'inscription à l\'université',
                    ar: 'يرجى تنزيل فاتورة رسوم التقديم للجامعة'
                },
                name: {
                    en: 'Application Fee Invoice',
                    fr: 'Application Fee Invoice',
                    ar: 'Application Fee Invoice'
                },
                actionType: 'download-file'
            },
        ],
        what_to_upload: [
            {
                key: 2,
                description: {
                    en: 'Please upload University Application Fee Payment Receipt',
                    fr: 'Veuillez télécharger le reçu de paiement des frais d\'inscription à l\'université',
                    ar: 'يرجى تحميل إيصال دفع رسوم التقديم للجامعة'
                },
                name: {
                    en: 'Application Fee Payment Receipt',
                    fr: 'Application Fee Payment Receipt',
                    ar: 'Application Fee Payment Receipt'
                },
                actionType: 'upload-file'
            },
        ],



        isLocalSteps: true,

        inputType: 'upload-file'
    },
    {
        key: 'step_4',
        idName: 'Step 4',

        icon: <PaperIcon special_size={size} />,
        name: {
            en: 'University Tuition Payment',
            fr: 'Paiement des frais de scolarité universitaires',
            ar: 'دفع الرسوم الدراسية الجامعية'
        },
        description: {
            en: 'In this step you have to upload ...',
            fr: 'Dans cette étape, vous devez télécharger...',
            ar: 'في هذه الخطوة عليك تحميل...'
        },
        what_to_do: [
            {
                key: 1,
                description: {
                    en: 'Please download University Pre-Admission Letter',
                    fr: 'Veuillez télécharger la lettre de pré-admission à l\'université',
                    ar: 'يرجى تنزيل خطاب القبول المسبق للجامعة'
                },
                name: {
                    en: 'Pre-Admission Letter',
                    fr: 'Pre-Admission Letter',
                    ar: 'Pre-Admission Letter'
                },
                actionType: 'download-file'
            },
            {
                key: 2,
                description: {
                    en: 'Please upload Tuition Fee Payment Receipt',
                    fr: 'Veuillez télécharger le reçu de paiement des frais de scolarité',
                    ar: 'يرجى تحميل إيصال دفع الرسوم الدراسية'
                },
                name: {
                    en: 'Pre-Admission Letter',
                    fr: 'Pre-Admission Letter',
                    ar: 'Pre-Admission Letter'
                },
                actionType: 'upload-file'
            },
        ],

        what_to_download: [
            {
                key: 1,
                description: {
                    en: 'Please download University Pre-Admission Letter',
                    fr: 'Veuillez télécharger la lettre de pré-admission à l\'université',
                    ar: 'يرجى تنزيل خطاب القبول المسبق للجامعة'
                },
                name: {
                    en: 'download Pre-Admission Letter',
                    fr: 'download Pre-Admission Letter',
                    ar: 'download Pre-Admission Letter'
                },
                actionType: 'download-file'
            },
        ],
        what_to_upload: [
            {
                key: 2,
                description: {
                    en: 'Please upload Tuition Fee Payment Receipt',
                    fr: 'Veuillez télécharger le reçu de paiement des frais de scolarité',
                    ar: 'يرجى تحميل إيصال دفع الرسوم الدراسية'
                },
                name: {
                    en: 'upload Tuition Fee Payment Receipt',
                    fr: 'Télécharger le reçu de paiement des frais de scolarité',
                    ar: 'تحميل إيصال دفع الرسوم الدراسية'
                },
                actionType: 'upload-file'
            },
        ],


        isLocalSteps: true,

        inputType: 'upload-file'
    },

    {
        key: 'step_5',
        idName: 'Step 5',
        icon: <NotificationStepIcon special_size={size} />,
        name: {
            en: 'Rest of the agency fees',
            fr: 'Reste des frais d\'agence',
            ar: 'باقي رسوم الوكالة'
        },
        description: 'In this step you will get your admission certaficate, but first you have to complet our charges.',
        description: {
            en: 'In this step you will get your admission certaficate, but first you have to complet our charges.',
            fr: 'À cette étape, vous obtiendrez votre certificat d\'admission, mais vous devez d\'abord compléter nos frais.',
            ar: 'في هذه الخطوة سوف تحصل على شهادة القبول الخاصة بك، ولكن عليك أولاً استكمال رسومنا.'
        },
        what_to_do: [
            {
                key: 1,
                description: {
                    en: 'Please upload the rest of agency fees',
                    fr: 'Veuillez télécharger le reste des frais d\'agence',
                    ar: 'يرجى تحميل بقية رسوم الوكالة'
                },
                name: {
                    en: 'The rest of agency fees',
                    fr: 'The rest of agency fees',
                    ar: 'The rest of agency fees'
                },
                actionType: 'upload-file'
            },
        ],
        what_to_upload: [
            {
                key: 1,
                description: {
                    en: 'Please upload the rest of agency fees',
                    fr: 'Veuillez télécharger le reste des frais d\'agence',
                    ar: 'يرجى تحميل بقية رسوم الوكالة'
                },
                name: {
                    en: 'The rest of agency fees',
                    fr: 'Le reste des frais d\'agence',
                    ar: 'باقي رسوم الوكالة'
                },
                actionType: 'upload-file'
            },
        ],
        isLocalSteps: true,
        inputType: 'upload-file'

    },
    {
        key: 'step_6',
        idName: 'Step 6',
        icon: <ClapIcon special_size={size} />,
        name: {
            en: 'Congratulations, Download your Final University Admission',
            fr: 'Félicitations, téléchargez votre dossier d\'admission définitif à l\'université',
            ar: 'مبروك، قم بتنزيل القبول النهائي للجامعة'
        },
        description: {
            en: 'In this step you have to upload ...',
            fr: 'Dans cette étape, vous devez télécharger...',
            ar: 'في هذه الخطوة عليك تحميل...'
        },
        what_to_do: [
            {
                key: 1,
                description: {
                    en: 'Please download the contract below',
                    fr: 'Dans cette étape, vous devez télécharger...',
                    ar: 'في هذه الخطوة عليك تحميل...'
                },
                name: {
                    en: 'Contract file',
                    fr: 'Contract file',
                    ar: 'Contract file'
                },
                actionType: 'download-file'
            },
            {
                key: 2,
                description: {
                    en: 'Please upload your contract after signing in',
                    fr: 'Dans cette étape, vous devez télécharger...',
                    ar: 'في هذه الخطوة عليك تحميل...'
                },
                name: {
                    en: 'Contract file',
                    fr: 'Contract file',
                    ar: 'Contract file'
                },
                actionType: 'upload-file'
            },
        ],
        inputType: 'download-file'

    },
    {
        key: 'step_7',
        idName: 'Step 7',

        icon: <PassportIcon special_size={size} />,
        name: {
            en: 'Assembling the Visa File Documents',
            fr: 'Assemblage des documents du dossier de visa (importés + téléchargés)',
            ar: 'تجميع مستندات ملف التأشيرة (مستوردة + تم تنزيلها)'
        },
        description: {
            en: 'In this step you have to upload ...',
            fr: 'Dans cette étape, vous devez télécharger...',
            ar: 'في هذه الخطوة عليك تحميل...'
        },
        isLocalSteps: false,

        // what_to_do: [
        //     {
        //         key: 1,
        //         description: {
        //             en: 'Please download the contract below',
        //             fr: 'Dans cette étape, vous devez télécharger...',
        //             ar: 'في هذه الخطوة عليك تحميل...'
        //         },
        //         name: {
        //             en: 'Contract file',
        //             fr: 'Contract file',
        //             ar: 'Contract file'
        //         },
        //         actionType: 'download-file'
        //     },
        //     {
        //         key: 2,
        //         description: {
        //             en: 'Please upload your contract after signing in',
        //             fr: 'Dans cette étape, vous devez télécharger...',
        //             ar: 'في هذه الخطوة عليك تحميل...'
        //         },
        //         name: {
        //             en: 'Contract file',
        //             fr: 'Contract file',
        //             ar: 'Contract file'
        //         },
        //         actionType: 'upload-file'
        //     },
        // ],
        inputType: 'upload-file'

    },
    {
        key: 'step_8',
        idName: 'Step 8',
        icon: <AdmissionIcon special_size={size} />,
        name: {
            en: 'VISA decision (Accepted Or Refused)',
            fr: 'Visa accepté ou refusé',
            ar: 'التأشيرة مقبولة أو مرفوضة'
        },
        description: {
            en: 'In this step you have to upload your visa decision file that has been given to you',
            fr: 'À cette étape, vous devez télécharger votre fichier de décision de visa qui vous a été remis',
            ar: 'في هذه الخطوة عليك تحميل ملف قرار التأشيرة الذي تم تسليمه لك'
        },

        what_to_do: [

            {
                key: 1,
                description: {
                    en: 'Please upload your visa decision file',
                    fr: 'Veuillez télécharger votre dossier de décision de visa',
                    ar: 'يرجى تحميل ملف قرار التأشيرة الخاص بك'
                },
                name: {
                    en: 'Visa decision file',
                    fr: 'Dossier de décision de visa',
                    ar: 'ملف قرار التأشيرة'
                },
                actionType: 'upload-file',
            },
        ],
        isLocalSteps: true, // Are this step what to dos steps, are located in this object.
        inputType: 'upload-file'


    },
]

export default customers_steps