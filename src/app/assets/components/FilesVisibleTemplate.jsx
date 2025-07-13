"use client"


import { calculateFileSize } from "@/constants/functions";
import { DeleteIcon, FileIcon, ViewFileIcon } from "@/constants/Icons";
import { cn } from "@/lib/utils";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import FilePreviewer from "./FilePreviewer";
import { useEffect, useState } from "react";


export default function FilesVisibleTemplate({ myFiles, box_className }) {
    const [files, setFiles] = useState(myFiles)



    useEffect(() => {
        setFiles(myFiles)
    }, [myFiles])


    return (
        <div className="flex flex-col gap-2 w-full">
            {
                files &&
                files.map((file, id) => {
                    const file_name = file.fileName
                    const file_size = calculateFileSize(file.size)
                    const file_extension = file.extension


                    function handleDeleteFile(indexToRemove) {
                        const updatedFiles = files.filter((_, index) => index !== indexToRemove)
                        setFiles(updatedFiles)
                        // console.log(file, 'This file was deleted')
                    }


                    return (
                        <div key={id} className={cn('flex items-center justify-between p-2 border-1 rounded-xl w-full', box_className)}>
                            <div className="flex items-center gap-3 w-full">

                                <span className="p-2 rounded-lg border-1 bg-gray-500 bg-opacity-10">
                                    <FileIcon special_size={25} />
                                </span>

                                <span className="w-[150px]">
                                    <p className="text-sm font-medium truncate w-full">{file_name}</p>
                                    <span className="flex items-center gap-1">
                                        <p className="text-xs flex items-center gap-1">
                                            {file_extension.toUpperCase()}
                                        </p>
                                        <span className="h-1 w-1 rounded-full bg-dark-3" />
                                        <p className="text-xs flex items-center gap-1">
                                            {file_size}
                                        </p>
                                    </span>

                                </span>
                            </div>


                            <div className="flex items-center gap-2">
                                <FilePreviewer file={file.file} />

                                <Button
                                    className="min-w-0 p-0 h-[20px] w-[20px] bg-transparent flex items-center justify-center"
                                    onClick={() => handleDeleteFile(id)}
                                >
                                    <DeleteIcon />
                                </Button>
                            </div>
                        </div>
                    )
                })
            }

        </div>
    )
}
