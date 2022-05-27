/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-key */

import {
    chakra,
    DeleteButton,
    EditButton,
    RefineList,
    Table,
    TagField,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    Wrap,
    DateField,
} from "@pankod/refine-chakra-ui";
import { IResourceComponentsProps } from "@pankod/refine-core";
import {
    useTable,
    Column,
    usePagination,
    useSortBy,
    useFilters,
} from "@pankod/refine-react-table";
import { useMemo } from "react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";

import { IPost, ICategory } from "../../interfaces";

export const PostList: React.FC<IResourceComponentsProps> = () => {
    const columns: any = useMemo(
        () => [
            {
                id: "id",
                Header: "ID",
                accessor: "id",
            },
            {
                id: "title",
                Header: "Title",
                accessor: "title",
                filter: "contains",
            },
            {
                id: "status",
                Header: "Status",
                accessor: "status",
                Cell: ({ value }: { value: string }) => {
                    return <TagField value={value} />;
                },
            },
            {
                id: "createdAt",
                Header: "CreatedAt",
                Cell: ({ value }: { value: string }) => {
                    return <DateField value={value} />;
                },
            },
            {
                id: "actions",
                Header: "Actions",
                accessor: "id",
                Cell: ({ value }: { value: string }) => {
                    return (
                        <Wrap>
                            <EditButton size="sm" recordItemId={value} />
                            <DeleteButton
                                size="sm"
                                recordItemId={value}
                            ></DeleteButton>
                        </Wrap>
                    );
                },
            },
        ],
        [],
    );

    const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } =
        useTable<any>({ columns }, useFilters, useSortBy, usePagination);

    return (
        <RefineList>
            <Table {...getTableProps()}>
                <Thead>
                    {headerGroups.map((headerGroup) => (
                        <Tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <Th
                                    {...column.getHeaderProps(
                                        column.getSortByToggleProps(),
                                    )}
                                >
                                    {column.render("Header")}
                                    <chakra.span pl="4">
                                        {column.isSorted ? (
                                            column.isSortedDesc ? (
                                                <TriangleDownIcon aria-label="sorted descending" />
                                            ) : (
                                                <TriangleUpIcon aria-label="sorted ascending" />
                                            )
                                        ) : null}
                                    </chakra.span>
                                </Th>
                            ))}
                        </Tr>
                    ))}
                </Thead>
                <Tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <Tr {...row.getRowProps()}>
                                {row.cells.map((cell) => (
                                    <Td {...cell.getCellProps()}>
                                        {cell.render("Cell")}
                                    </Td>
                                ))}
                            </Tr>
                        );
                    })}
                </Tbody>
            </Table>
        </RefineList>
    );
};
