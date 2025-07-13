import { Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem, Button, cn } from "@nextui-org/react";
// import { AddNoteIcon } from "./AddNoteIcon.jsx";
// import { CopyDocumentIcon } from "./CopyDocumentIcon.jsx";
// import { EditDocumentIcon } from "./EditDocumentIcon.jsx";
// import { DeleteDocumentIcon } from "./DeleteDocumentIcon.jsx";

import { RiDeleteBin5Line, RiPencilLine, RiFileCopyLine, RiMore2Line } from "@remixicon/react";

const size = 15


export default function ActionsDropbox({id}) {
    const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button
                    variant="bordered"
                    className="p-0 min-w-fit w-10 h-10"
                >
                    <RiMore2Line size={size} />
                </Button>
            </DropdownTrigger>
            <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
                <DropdownSection title="Actions" showDivider>
                    <DropdownItem
                        key="edit"
                        description="Allows you to edit the file"
                        startContent={<RiPencilLine size={size} className={iconClasses} />}
                    >
                        Edit file
                    </DropdownItem>
                </DropdownSection>
                <DropdownSection title="Danger zone">
                    <DropdownItem
                        key="delete"
                        className="text-danger"
                        color="danger"
                        description="Permanently delete the file"
                        startContent={<RiDeleteBin5Line size={size} className={cn(iconClasses, "text-danger")} />}
                        
                    >
                        Delete file {id}
                    </DropdownItem>
                </DropdownSection>
            </DropdownMenu>
        </Dropdown>
    );
}
