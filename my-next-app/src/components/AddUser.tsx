import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { toast } from "sonner";
interface AddUserProps {
  onAdd: (id: number, name: string, email: string) => void;
}

const AddUser: React.FC<AddUserProps> = ({ onAdd }) => {
  const [state, setState] = useState({
    name: "",
    email: "",
  });

  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = Date.now();
    onAdd(newId, state.name, state.email);
    setState((prevState) => ({
      ...prevState,
      name: "",
      email: "",
    }));
  };
  return (
    <div className=" ml-[20%] w-[800px]  mb-10">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="outline"
            className="bg-blue-200 hover:bg-blue-700 hover:text-white"
          >
            Add User
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <form onSubmit={handleOnSubmit}>
              <AlertDialogDescription className="space-y-4 mb-4">
                <label htmlFor="name">
                  Name
                  <input
                    type="text"
                    value={state.name}
                    name="name"
                    onChange={(e) =>
                      setState((prevState) => ({
                        ...prevState,
                        name: e.target.value,
                      }))
                    }
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </label>
                <label htmlFor="email" className="pt-2">
                  Email
                  <input
                    type="email"
                    value={state.email}
                    name="email"
                    onChange={(e) =>
                      setState((prevState) => ({
                        ...prevState,
                        email: e.target.value,
                      }))
                    }
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </label>
              </AlertDialogDescription>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  type="submit"
                  onClick={() => toast.success("User Added successfully!")}
                >
                  Add User
                </AlertDialogAction>
              </AlertDialogFooter>
            </form>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AddUser;
