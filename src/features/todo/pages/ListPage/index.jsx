import React from "react";
import TodoForm from "../../component/TodoForm";

function ListPage(props) {
  const handleTodoFormSubmit = (values) => {
    console.log(" form todo value in ListPage", values);
  };
  return (
    <>
      <TodoForm onSubmit={handleTodoFormSubmit} />
      <p>List Page</p>
    </>
  );
}

export default ListPage;
