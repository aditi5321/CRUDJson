"use client";
import AddUser from "@/components/AddUser";
import { ArrowUpDown } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import React, { useEffect, useState } from "react";

import { toast } from "sonner";

export interface UserProps {
  id: number;
  name: string;
  email: string;
}

export default function Home() {
  const [state, setState] = useState<{
    users: UserProps[];
  }>({
    users: [],
  });
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data: state.users,
    columns: [
      {
        accessorKey: "id",
        header: ({ column }) => {
          return (
            <button
              className=" text-gray-500 hover:text-black flex items-center"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              ID
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </button>
          );
        },
      },
      {
        accessorKey: "name",
        header: ({ column }) => {
          return (
            <button
              className=" text-gray-500 hover:text-black  flex items-center"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Name
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </button>
          );
        },
      },
      {
        accessorKey: "email",
        header: ({ column }) => {
          return (
            <button
              className=" text-gray-500 hover:text-black flex items-center"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Email
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </button>
          );
        },
      },
      {
        header: "Delete",
        cell: (info) => (
          <button
            className="border-2 border-black p-1"
            onClick={() => {
              const userId = info.row.original.id;
              onDelete(userId);
              toast.success("User Deleted successfully");
            }}
          >
            Delete
          </button>
        ),
      },
    ],
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting,
    },
  });
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await res.json();
      setState((prevState) => ({
        ...prevState,
        users: data,
      }));
    } catch (error) {
      console.log(error);
      toast.error("Failed to Fetch users");
    }
  };

  const onAdd = async (id: number, name: string, email: string) => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
        {
          method: "POST",
          body: JSON.stringify({
            id,
            name,
            email,
          }),
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        }
      );
      if (response.status !== 201) return; // If not successfully created, exit

      const newUser = await response.json();

      // Update state with the new user added
      setState((prevState) => ({
        ...prevState,
        users: [...prevState.users, newUser], // Add new user to the users array
      }));
    } catch (err) {
      console.log(err);
      toast.error("Failed to add user");
    }
  };

  const onDelete = async (id: number) => {
    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.status !== 200) {
          return;
        } else {
          return setState((prevState) => ({
            ...prevState,
            users: state.users.filter((user) => {
              return user.id !== id;
            }),
          }));
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to delete user");
      });
  };
  console.log(state.users);
  return (
    <div>
      <h1 className="text-center mb-10 underline font-semibold">
        A list of User Details.
      </h1>
      <AddUser onAdd={onAdd} />
      <div>
        <Table className="m-[5px] ml-[20%] w-[800px]">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
