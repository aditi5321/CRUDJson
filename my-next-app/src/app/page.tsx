"use client";
import AddUser from "@/components/AddUser";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export interface UserProps {
  id: number;
  name: string;
  email: string;
}
export default function Home() {
  const [state, setState] = useState<{
    users: UserProps[];
    sortDirection: "asc" | "desc";
  }>({
    users: [],
    sortDirection: "asc",
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
    } catch (err) {
      console.log(err);
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
      });
  };

  const handleSortByName = () => {
    const sortUsers = [...state.users].sort((a, b) => {
      if (a.name < b.name) {
        return state.sortDirection === "asc" ? -1 : 1;
      }
      if (a.name > b.name) {
        return state.sortDirection === "asc" ? 1 : -1;
      }
      return 0;
    });
    setState((prevState)=>({
      ...prevState,
      users: sortUsers,
      sortDirection: state.sortDirection === "asc" ? "desc" : "asc"
    }))
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
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead onClick={handleSortByName}
                style={{ cursor: "pointer" }}>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {state.users?.map((user, index) => {
              return (
                <TableRow key={index}>
                  <TableCell className="font-medium">{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell className="text-right">
                    <button
                      className="border-2 border-black p-1"
                      onClick={() => (
                        onDelete(user.id), toast("User Detail is deleting")
                      )}
                    >
                      delete
                    </button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
