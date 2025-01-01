import { UserProps } from "@/app/page";
import React from "react";

interface UserPropsWithDelete extends UserProps {
  onDelete: (id: number) => void; // onDelete function added to the prop interface
}
const User: React.FC<UserPropsWithDelete> = ({ id, name, email, onDelete }) => {
  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <div className="flex justify-around m-[5px] ml-[30%] w-[600px]">
      <span>{id}</span>
      <span>{name}</span>
      <span>{email}</span>
      <span>
        <button className="border-2 border-black p-1" onClick={handleDelete}>
          delete
        </button>
      </span>
    </div>
  );
};

export default User;
