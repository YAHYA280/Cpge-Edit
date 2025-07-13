"use client"

import { useState } from "react";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@nextui-org/button";
import { AddWalletIcon, ViewFileIcon } from "@/constants/Icons";
import { useLocale, useTranslations } from "next-intl";
import { getLanguageDetails } from "@/constants/functions";

export default function FilePreviewer({ file }) {

    const t = useTranslations()
    const currentLanguage = getLanguageDetails(useLocale())
    const active_language = currentLanguage.key
    const active_dir = currentLanguage.direction

    const [isOpen, setIsOpen] = useState(false)

    const [preview, setPreview] = useState(null)
    const [fileType, setFileType] = useState('')




    function hadleShowFile() {
        // Show the file modal 
        setIsOpen(true)

        const reader = new FileReader()
        reader.onloadend = () => {
            setFileType(file.type)
            setPreview(reader.result)
        }


        if (file.type.startsWith('image/')) {
            reader.readAsDataURL(file)
        } else if (file.type === 'application/pdf') {
            reader.readAsArrayBuffer(file)
        } else {
            reader.readAsText(file)
        }

    }




    const renderPreview = () => {
        if (!preview) return null;

        if (fileType.startsWith('image/')) {
            return <img src={preview} alt="Preview" className="w-full h-full object-cover" />;
        } else if (fileType === 'application/pdf') {
            const blob = new Blob([preview], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            return <iframe src={url} className="w-full h-full" title="PDF Preview"></iframe>;
        } else {
            return <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>{preview}</pre>;
        }
    };

    return (
        <div>
            <Button
                className="min-w-0 p-0 h-[30px] w-[30px] bg-transparent flex items-center justify-center"
                onClick={hadleShowFile}
            >
                <ViewFileIcon />
            </Button>


            <AlertDialog open={isOpen}>
                <AlertDialogContent className="w-full h-full sm:h-fit sm:max-w-[425px] bg-light-1 dark:bg-dark-1">

                    <div className="flex flex-col gap-1 justify-center items-center">
                        <ViewFileIcon special_size={40} />

                        <p className="text-sm font-medium">{t('global.file_preview')}</p>

                    </div>


                    <div className="border-1 w-full aspect-square rounded-xl overflow-hidden">
                        {renderPreview()}
                    </div>

                    <AlertDialogFooter className="flex items-center gap-3">
                        <Button
                            onClick={() => setIsOpen(false)}
                            className="w-full"
                        >
                            {t('global.cancel')}
                        </Button>

                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>


    )
}
