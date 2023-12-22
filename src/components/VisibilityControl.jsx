import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export const VisibilityControl = ({
  isChecked,
  setShowCompleted,
  cleanTasks,
}) => {
  //Confirma la eliminación y ejecuta la función de eliminar tareas, personalización de las alertas y sus funciones
  const handleDelete = () => {
    MySwal.fire({
      title: "¿Estas seguro?",
      text: "No se pueden revertir los cambios",
      icon: "warning",
      allowOutsideClick: false,
      showDenyButton: true,
      confirmButtonColor: "green",
      confirmButtonText: "¡Eliminar!",
      denyButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire({
          title: "¡Tareas eliminadas!",
          text: "Todas tus tareas han sido eliminadas",
          icon: "success",
          confirmButtonColor: "green",
          allowOutsideClick: false,
        });
        cleanTasks();
      } else if (result.isDenied) {
        MySwal.fire({
          title: "Eliminación cancelada",
          text: "Tus tareas no se eliminaran",
          icon: "error",
          allowOutsideClick: false,
          confirmButtonColor: "red",
        });
      }
    });
  };

  return (
    <div className="d-flex justify-content-between text-center bg-primary-subtle border-dark p-2">
      <div className="form-check form-switch ">
        <input
          checked={isChecked}
          type="checkbox"
          onChange={(e) => setShowCompleted(e.target.checked)}
          className="form-check-input mt-1"
          role="switch"
        />
        <label>Mostrar tareas hechas</label>
      </div>
      <button className="btn btn-outline-danger btn-sm" onClick={handleDelete}>
        Limpiar
      </button>
    </div>
  );
};
