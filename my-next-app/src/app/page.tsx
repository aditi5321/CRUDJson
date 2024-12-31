"use client";
import AddUser from "@/components/AddUser";
import User from "@/components/User";
import { useEffect, useState } from "react";

export interface UserProps {
  id: number;
  name: string;
  email: string;
}
export default function Home() {
  const [state, setState] = useState<{ users: UserProps[] }>({ users: [] });

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

  const onDelete = async (id:number) => {
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
  console.log(state.users);
  return (
    <div>
      <h1 className="text-center mb-10 underline font-semibold">
        CRUD JSONPlaceholder User
      </h1>
      <AddUser onAdd={onAdd} />
      <div>
        {state.users?.map((user) => {
          return (
            <User
              id={user.id}
              key={user.id}
              name={user.name}
              email={user.email}
              onDelete={onDelete}
            />
          );
        })}
      </div>
    </div>
  );
}
