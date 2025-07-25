"use client"


import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Button,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Chip,
    User,
    Pagination,
} from "@nextui-org/react";
import HtmlInput from "@/app/assets/smallComponents/HtmlInput";
import { Avatar, AvatarGroup, AvatarIcon } from "@nextui-org/avatar";

import { RiArrowDownSLine, RiSearch2Line } from "@remixicon/react";

import { columns } from "../data";
import { capitalize } from "../utils";
import { useCallback, useMemo, useState } from "react";
import ActionsDropbox from "./ActionsDropbox";
import { cpe_countries_gallery, cpe_countries_images, cpe_schools_gallery, cpe_schools_logos } from "@/constants/_api";
import NoSchoolsFound from "./NoSchoolFound";

const statusColorMap = {
    active: "success",
    paused: "danger",
    vacation: "warning",
};

const INITIAL_VISIBLE_COLUMNS = ["name", "school_country_name", "added_at", "actions"];




export default function SchoolsTable({ schools }) {

    const [filterValue, setFilterValue] = useState("");
    const [selectedKeys, setSelectedKeys] = useState(new Set([]));
    const [visibleColumns, setVisibleColumns] = useState(new Set(INITIAL_VISIBLE_COLUMNS));
    const [statusFilter, setStatusFilter] = useState("all");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sortDescriptor, setSortDescriptor] = useState({
        // column: "age",
        // direction: "ascending",
    });
    const [page, setPage] = useState(1);

    const pages = Math.ceil(schools.length / rowsPerPage);

    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = useMemo(() => {
        if (visibleColumns === "all") return columns;

        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);

    const filteredItems = useMemo(() => {
        let filteredschools = [...schools];

        if (hasSearchFilter) {
            filteredschools = filteredschools.filter((school) =>
                school.name.toLowerCase().includes(filterValue.toLowerCase()),
            );
        }

        return filteredschools;
    }, [schools, filterValue]);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = useMemo(() => {
        return [...items].sort((a, b) => {
            const first = a[sortDescriptor.column];
            const second = b[sortDescriptor.column];
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);

    const renderCell = useCallback((school, columnKey) => {
        const cellValue = school[columnKey];
        // console.log(school)
        switch (columnKey) {
            case "name":
                return (
                    <div className="flex gap-2 items-center">
                        <Avatar isBordered={true} radius="lg" size="sm" src={`${cpe_schools_logos}/${school.logo}`} />
                        <p className="truncate">{school.name}</p>
                    </div>

                    // <User
                    //     avatarProps={{ isBordered: true, radius: "lg", size: "sm", src: `${cpe_schools_logos}/${school.logo}` }}
                    //     classNames={{
                    //         description: "text-default-500",
                    //     }}
                    //     description={school.email}
                    //     name={cellValue}
                    // >
                    //     {school.email}
                    // </User>
                );

            case "school_gallery":
                return (
                    <AvatarGroup isBordered max={3} total={10}>
                        {
                            school.school_gallery.map((image, id) =>{
                                return (<div key={id} >
                                    <Avatar isBordered={true} radius="lg" size="sm" src={`${cpe_schools_gallery}/${image.name}`} />
                                </div>)
                            })
                        }
                    </AvatarGroup>
                );


            case "school_country_name":
                return (
                    <User
                        avatarProps={{ isBordered: true, radius: "lg", size: "sm", src: `${cpe_countries_images}/${school.school_country_flag}` }}
                        classNames={{
                            description: "text-default-500",
                        }}
                        description={school.email}
                        name={cellValue}
                    >
                        {school.email}
                    </User>
                );
            case "role":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">{cellValue}</p>
                    </div>
                );
            case "status":
                return (
                    <Chip
                        className="capitalize border-none gap-1 text-default-600"
                        color={statusColorMap[user.status]}
                        size="sm"
                        variant="dot"
                    >
                        {cellValue}
                    </Chip>
                );
            case "actions":
                return (
                    <div className="relative flex justify-end items-center gap-2">
                        <ActionsDropbox id={school.id} />
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    const onRowsPerPageChange = useCallback((e) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);


    const onSearchChange = useCallback((value) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

    const topContent = useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-end">

                    <HtmlInput
                        type="search"
                        placeholder={{ label: 'school name', placeholder: 'Search by name...' }}
                        onChange={(e) => onSearchChange(e)}
                        value={filterValue}

                    />


                    <div className="flex gap-3">
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button
                                    endContent={<RiArrowDownSLine size={16} />}
                                    size="sm"
                                    variant="flat"
                                >
                                    Columns
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={visibleColumns}
                                selectionMode="multiple"
                                onSelectionChange={setVisibleColumns}
                            >
                                {columns.map((column) => (
                                    <DropdownItem key={column.uid} className="capitalize">
                                        {capitalize(column.name)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                    </div>


                </div>
                <div className="flex justify-between items-center">
                    <span className="text-default-400 text-small">Total {schools.length} schools</span>
                    <label className="flex items-center text-default-400 text-small">
                        Rows per page:
                        <select
                            className="bg-transparent outline-none text-default-400 text-small"
                            onChange={onRowsPerPageChange}
                        >
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </select>
                    </label>
                </div>
            </div>
        );
    }, [
        filterValue,
        statusFilter,
        visibleColumns,
        onSearchChange,
        onRowsPerPageChange,
        schools.length,
        hasSearchFilter,
    ]);

    const bottomContent = useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-between items-center">
                <Pagination
                    showControls
                    classNames={{
                        cursor: "bg-foreground text-background",
                    }}
                    color="default"
                    isDisabled={hasSearchFilter}
                    page={page}
                    total={pages}
                    variant="light"
                    onChange={setPage}
                />
                <span className="text-small text-default-400">
                    {selectedKeys === "all"
                        ? "All items selected"
                        : `${selectedKeys.size} of ${items.length} selected`}
                </span>
            </div>
        );
    }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

    const classNames = useMemo(
        () => ({
            wrapper: ["max-h-[382px]", "max-w-3xl"],
            th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
            td: [
                // changing the rows border radius
                // first
                "group-data-[first=true]:first:before:rounded-none",
                "group-data-[first=true]:last:before:rounded-none",
                // middle
                "group-data-[middle=true]:before:rounded-none",
                // last
                "group-data-[last=true]:first:before:rounded-none",
                "group-data-[last=true]:last:before:rounded-none",
            ],
        }),
        [],
    );

    return (
        <div className="bg-light-1 border-1 p-4 rounded-large">

            <Table
                isCompact
                removeWrapper
                aria-label="Example table with custom cells, pagination and sorting"
                bottomContent={bottomContent}
                bottomContentPlacement="outside"
                checkboxesProps={{
                    classNames: {
                        wrapper: "after:bg-foreground after:text-background text-background",
                    },
                }}
                classNames={classNames}
                selectedKeys={selectedKeys}
                selectionMode="multiple"
                sortDescriptor={sortDescriptor}
                topContent={topContent}
                topContentPlacement="outside"
                onSelectionChange={setSelectedKeys}
                onSortChange={setSortDescriptor}
            >

                <TableHeader columns={headerColumns}>
                    {(column) => (
                        <TableColumn
                            key={column.uid}
                            align={column.uid === "actions" ? "center" : "start"}
                            allowsSorting={column.sortable}
                        >
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>

                <TableBody emptyContent={<NoSchoolsFound />} items={sortedItems}>
                    {(item) => (
                        <TableRow key={item.id}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>

            </Table>
        </div>


    );
}
