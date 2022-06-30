import React, { useReducer, useState, useRef, useEffect } from "react";
const reducer = (state, { type, payload }) => {
  if (type === "ADD_VALUE") {
    const newPeople = [...state.people, payload];
    // console.log(newPeople);
    return {
      ...state,
      people: newPeople,
      isModalOpen: true,
      ModelContent: "Item Added",
    };
  } else if (type === "NO_VALUE") {
    return {
      ...state,
      isModalOpen: true,
      ModelContent: "Please Add UserName",
    };
  } else if (type === "CLOSE_MODAL") {
    return { ...state, isModalOpen: false };
  } else if (type === "EDIT_NAME") {
  } else {
    throw console.error();
  }
};
const defaultState = {
  people: [],
  isModalOpen: false,
  ModelContent: "",
};
const Index = () => {
  const [name, setName] = useState("");
  const [state, dispatch] = useReducer(reducer, defaultState);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      const newItem = {
        id: new Date().getTime().toString(),
        name: name,
      };
      setName("");
      dispatch({ type: "ADD_VALUE", payload: newItem });
    } else {
      dispatch({ type: "NO_VALUE" });
    }
  };
  const refContainer = useRef(null);
  useEffect(() => refContainer.current.focus(), []);
  console.log(refContainer);
  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: "CLOSE_MODAL" });
    }, 3000);
  });
  const handleEdit = (id) => {
    const newPerson = state.people.filter((person) => person.id === id);
    // refContainer.current.focus();
    console.log(newPerson[0]);
    const newName = prompt("Please enter your new name");
    // console.log(newName);
    newPerson[0].name = newName;
  };
  return (
    <div className="container">
      {state.isModalOpen && (
        <h1 className="text-center">{state.ModelContent}</h1>
      )}
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label for="exampleInputEmail1">UserName</label>
          <input
            ref={refContainer}
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      {state.people.map((person) => {
        return (
          <h2 className="text-center">
            {person.name}
            <button
              type=""
              className="btn"
              onClick={() => handleEdit(person.id)}
            >
              Edit
            </button>
          </h2>
        );
      })}
    </div>
  );
};

export default Index;
