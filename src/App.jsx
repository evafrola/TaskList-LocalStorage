import { TaskCreator } from "./components/TaskCreator";
import { useState, useEffect } from "react";
import { TaskTable } from "./components/TaskTable";
import { VisibilityControl } from "./components/VisibilityControl";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const MySwal = withReactContent(Swal);

function App() {
  //Estados
  const [tasksItems, setTasksItems] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);

  //Función para crear nuevas tareas
  function createTask(taskName) {
    if (!tasksItems.find((task) => task.name === taskName)) {
      if (taskName !== "" && taskName !== undefined && taskName !== null) {
        setTasksItems([...tasksItems, { name: taskName, done: false }]);
      } else {
        //Alerta por si los datos son erróneos
        const alertDateError = MySwal.mixin({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          didOpen: (alertDateError) => {
            alertDateError.onmouseenter = MySwal.stopTimer;
            alertDateError.onmouseleave = MySwal.resumeTimer;
          },
        });
        alertDateError.fire({
          icon: "error",
          title: "Ingrese un dato correcto",
        });
      }
    } else {
      //Alerta por si ya esta ese dato en la lista
      const alertDateSame = MySwal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (alertDateSame) => {
          alertDateSame.onmouseenter = MySwal.stopTimer;
          alertDateSame.onmouseleave = MySwal.resumeTimer;
        },
      });
      alertDateSame.fire({
        icon: "info",
        title: "La tarea ya se encuentra en la lista",
      });
    }
  }

  //Función para actualizar el estado de las tareas en hechas o no
  function toggleTask(tasks) {
    setTasksItems(
      tasksItems.map((t) =>
        t.name === tasks.name ? { ...t, done: !t.done } : t
      )
    );
  }

  //Función para limpiar la sección de tareas hechas
  const cleanTasks = () => {
    setTasksItems(tasksItems.filter((task) => !task.done));
    setShowCompleted(false);
  };

  //Extrae un arreglo del localStorage si lo encuentra, sino no hace nada
  useEffect(() => {
    let data = localStorage.getItem("tasks");
    if (data !== "[]") {
      setTasksItems(JSON.parse(data));
    } else {
      //Le avisa al usuario que no hay ninguna tarea y que debe de ingresar una
      const alertDateEmpty = MySwal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (alertDateEmpty) => {
          alertDateEmpty.onmouseenter = MySwal.stopTimer;
          alertDateEmpty.onmouseleave = MySwal.resumeTimer;
        },
      });
      alertDateEmpty.fire({
        icon: "info",
        title: "Lista vacía, ingresa una tarea",
      });
    }
  }, []);

  //Guarda en el localStorage las tareas en un arreglo
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasksItems));
  }, [tasksItems]);

  return (
    <main>
      <div className="container col-md-4 offset-md-4">
        <TaskCreator createTask={createTask} />
        <TaskTable tasks={tasksItems} toggleTask={toggleTask} />
        <VisibilityControl
          isChecked={showCompleted}
          setShowCompleted={(checked) => setShowCompleted(checked)}
          cleanTasks={cleanTasks}
        />
        {showCompleted && (
          <TaskTable
            tasks={tasksItems}
            toggleTask={toggleTask}
            showCompleted={showCompleted}
          />
        )}
      </div>
    </main>
  );
}

export default App;
