//Muestra una lista con las tareas
export const TaskRow = ({ task, toggleTask }) => {
  return (
    <tr key={task.name}>
      <td className="d-flex justify-content-between">
        {task.name}
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => toggleTask(task)}
          className="form-check-input mt-1"
          role="switch"
        />
      </td>
    </tr>
  );
};
