import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useState } from "react";

const MySwal = withReactContent(Swal);

export const TaskCreator = ({ createTask }) => {
  const [newTaskName, setNewTaskName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    createTask(newTaskName);
    setNewTaskName("");
  };

  return (
    <form onSubmit={handleSubmit} className="my-4 mb-5 input-group">
      <input
        className="form-control"
        type="text"
        placeholder="Coloca una nueva tarea"
        value={newTaskName}
        onChange={(e) => setNewTaskName(e.target.value)}
      />
      <button
        className="btn btn-md btn-outline-dark"
        onClick={() => {
          const Toast = MySwal.mixin({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 950,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = MySwal.stopTimer;
              toast.onmouseleave = MySwal.resumeTimer;
            },
          });
          Toast.fire({
            icon: "success",
            title: "La tarea a sido agregada",
          });
        }}
      >
        Guardar
      </button>
    </form>
  );
};
