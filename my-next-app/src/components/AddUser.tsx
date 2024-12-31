import React, { useState } from "react";
interface AddUserProps {
  onAdd: (id: number, name: string, email: string) => void;
}

const AddUser: React.FC<AddUserProps> = ({ onAdd }) => {
const [state, setState] =useState({
    name: "",
    email: ""
})

  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = Date.now()
    onAdd(newId, state.name, state.email)
    setState((prevState)=>({
        ...prevState,
        name: "",
        email: "",
    }))
  };
  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <h3>Add User</h3>
        <input type="text" placeholder="Name" value={state.name} name="name" onChange={(e)=>setState((prevState)=>({...prevState, name: e.target.value}))} />
        <input type="email" placeholder="Email" value={state.email} name="email" onChange={(e)=>setState((prevState)=>({...prevState, email: e.target.value}))}/>
        <button onSubmit={handleOnSubmit}>Add</button>
      </form>
    </div>
  );
};

export default AddUser;
