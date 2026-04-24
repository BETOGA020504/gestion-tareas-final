let tareas = [];
let tareaSeleccionada = null;

function registrarTarea() {
  try {
    const tarea = {
      id: document.getElementById("id").value.trim(),
      titulo: document.getElementById("titulo").value.trim(),
      descripcion: document.getElementById("descripcion").value.trim(),
      fechaInicio: document.getElementById("fechaInicio").value,
      cliente: document.getElementById("cliente").value.trim(),
      proyecto: document.getElementById("proyecto").value.trim(),
      comentarios: document.getElementById("comentarios").value.trim(),
      estatus: "Por hacer"
    };

    if (!tarea.id || !tarea.titulo || !tarea.descripcion || !tarea.fechaInicio || !tarea.cliente || !tarea.proyecto) {
      alert("Completa todos los campos obligatorios.");
      return;
    }

    tareas.push(tarea);
    limpiarRegistro();
    mostrarTareas();

  } catch (error) {
    alert("Error al registrar la tarea.");
    console.error(error);
  }
}

function mostrarTareas() {
  try {
    const tabla = document.getElementById("tablaTareas");
    tabla.innerHTML = "";

    tareas.forEach((tarea, index) => {
      const fila = document.createElement("tr");

      fila.ondblclick = () => cargarCambios(index);

      fila.innerHTML = `
        <td>${tarea.id}</td>
        <td>${tarea.titulo}</td>
        <td>${tarea.descripcion}</td>
        <td>${tarea.fechaInicio}</td>
        <td>${tarea.cliente}</td>
        <td>${tarea.proyecto}</td>
        <td>${tarea.comentarios}</td>
        <td>${tarea.estatus}</td>
      `;

      tabla.appendChild(fila);
    });

    filtrarTareas();

  } catch (error) {
    alert("Error al mostrar las tareas.");
    console.error(error);
  }
}

function cargarCambios(index) {
  try {
    tareaSeleccionada = index;
    const tarea = tareas[index];

    document.getElementById("editId").value = tarea.id;
    document.getElementById("editTitulo").value = tarea.titulo;
    document.getElementById("editDescripcion").value = tarea.descripcion;
    document.getElementById("editFechaInicio").value = tarea.fechaInicio;
    document.getElementById("editCliente").value = tarea.cliente;
    document.getElementById("editProyecto").value = tarea.proyecto;
    document.getElementById("editComentarios").value = tarea.comentarios;
    document.getElementById("editEstatus").value = tarea.estatus === "Por hacer" ? "En progreso" : tarea.estatus;
    document.getElementById("nuevoComentario").value = "";

  } catch (error) {
    alert("Error al cargar los datos de la tarea.");
    console.error(error);
  }
}

function actualizarTarea() {
  try {
    if (tareaSeleccionada === null) {
      alert("Primero selecciona una tarea dando doble clic en la tabla.");
      return;
    }

    const nuevoEstatus = document.getElementById("editEstatus").value;
    const comentarioNuevo = document.getElementById("nuevoComentario").value.trim();

    tareas[tareaSeleccionada].estatus = nuevoEstatus;

    if (comentarioNuevo !== "") {
      const fecha = new Date().toLocaleDateString();
      tareas[tareaSeleccionada].comentarios += `\n[${fecha}] ${comentarioNuevo}`;
    }

    mostrarTareas();
    alert("Tarea actualizada correctamente.");

  } catch (error) {
    alert("Error al actualizar la tarea.");
    console.error(error);
  }
}

function filtrarTareas() {
  try {
    const filtro = document.getElementById("filtroEstatus").value;
    const filas = document.querySelectorAll("#tablaTareas tr");

    filas.forEach(fila => {
      const estatus = fila.cells[7].textContent;

      if (filtro === "Todos" || estatus === filtro) {
        fila.style.display = "";
      } else {
        fila.style.display = "none";
      }
    });

  } catch (error) {
    alert("Error al filtrar las tareas.");
    console.error(error);
  }
}

function limpiarRegistro() {
  document.getElementById("id").value = "";
  document.getElementById("titulo").value = "";
  document.getElementById("descripcion").value = "";
  document.getElementById("fechaInicio").value = "";
  document.getElementById("cliente").value = "";
  document.getElementById("proyecto").value = "";
  document.getElementById("comentarios").value = "";
}