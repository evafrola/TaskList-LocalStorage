import { TaskRow } from "./TaskRow";
//Muestra la tabla base y inyecta la otra tabla ocn los datos del arreglo
export const TaskTable = ({ tasks, toggleTask, showCompleted = false }) => {
  const taskTableRows = (doneValue) => {
    return tasks
      .filter((task) => task.done === doneValue)
      .map((task) => (
        <TaskRow task={task} key={task.name} toggleTask={toggleTask} />
      ));
  };

  return (
    <table className="table table-primary table-striped table-bordered border-secondary mb-5 form-switch">
      <thead>
        <tr className="table-dark ">
          <th>Tareas</th>
        </tr>
      </thead>

      <tbody>{taskTableRows(showCompleted)}</tbody>
    </table>
  );
};
