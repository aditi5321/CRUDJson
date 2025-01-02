import { UserProps } from "@/app/page";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

interface UserPropsWithDelete extends UserProps {
  onDelete: (id: number) => void; // onDelete function added to the prop interface
}
const User: React.FC<UserPropsWithDelete> = ({ id, name, email, onDelete }) => {
  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <div className="flex justify-around m-[5px] ml-[30%] w-[600px]">
      <Table>
        <TableCaption>A list of User Details.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-right">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">{id}</TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>{email}</TableCell>
            <TableCell className="text-right">
              <button
                className="border-2 border-black p-1"
                onClick={handleDelete}
              >
                delete
              </button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default User;
