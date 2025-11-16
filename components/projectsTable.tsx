"use client"
import { init } from "next/dist/compiled/webpack/webpack";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

type Estatus = "Pendiente" | "En progreso" | "Completado";
type Prioridad = "Alta" | "Normal" | "Baja";

interface Proyecto {
  id: string;
  nombre: string;
  descripcion: string;
  estatus: Estatus;
  prioridad: Prioridad;
  fecha: string;
}


const initialData: Proyecto[] = [
  {
    id: "1",
    nombre: "Diseñar landing page",
    descripcion: "Crear layout inicial con Tailwind",
    estatus: "Pendiente",
    prioridad: "Alta",
    fecha: new Date().toLocaleString("es-DO", {
      dateStyle: "short",
      timeStyle: "short"
    })
  },
  {
    id: "2",
    nombre: "Configurar API",
    descripcion: "Endpoints para login y registro",
    estatus: "Pendiente",
    prioridad: "Normal",
    fecha: new Date().toLocaleString("es-DO", {
      dateStyle: "short",
      timeStyle: "short"
    })
  },
  {
    id: "3",
    nombre: "Testear drag & drop",
    descripcion: "Verificar comportamiento entre columnas",
    estatus: "Pendiente",
    prioridad: "Baja",
    fecha: new Date().toLocaleString("es-DO", {
      dateStyle: "short",
      timeStyle: "short"
    })
  }
];


const KanbanBoard: React.FC = () => {
  const [projects, setProjects] = useState<Proyecto[]>(initialData);
  const [formData, setFormData] = useState<Omit<Proyecto, "id">>({
    nombre: "",
    descripcion: "",
    estatus: "Pendiente",
    prioridad: "Normal",
    fecha: ""
  });
  const [showModal, setShowModal] = useState(false);
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    e.dataTransfer.setData("id", id);
    setDraggingId(id);
  };

  const handleDragEnd = () => {
    setDraggingId(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, newStatus: Estatus) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("id");
    setProjects(prev =>
      prev.map(p => (p.id === id ? { ...p, estatus: newStatus } : p))
    );
  };

    const handleCreate = () => {
    const newProject: Proyecto = {
        id: uuidv4(),
        ...formData,
        fecha: new Date().toLocaleString("es-DO", {
        dateStyle: "short",
        timeStyle: "short"
        })
    };
    setProjects([...projects, newProject]);
    setShowModal(false);
    setFormData({
        nombre: "",
        descripcion: "",
        estatus: "Pendiente",
        prioridad: "Normal",
        fecha: ""
    });
    };


  const handleDelete = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const columns: Estatus[] = ["Pendiente", "En progreso", "Completado"];

    const getStatusStyle = (estatus: Estatus) => {
        switch (estatus) {
            case "Pendiente":
            return "bg-red-100 text-red-700";
            case "En progreso":
            return "bg-yellow-100 text-yellow-700";
            case "Completado":
            return "bg-green-100 text-green-700";
            default:
            return "";
        }
    };

  return (
    <div className="p-6">

        <h1 className="text-2xl font-bold text-gray-800">Lista de Proyectos</h1>
        <p className="text-gray-600 mt-1 mb-10">
            Administra y organiza tus proyectos de manera eficiente
        </p>


        <button
            onClick={() => setShowModal(true)}
            className="mb-4 px-4 py-2 bg-[#FFD100] rounded hover:scale-115 transition-transform text-black font-bold border border-gray-300"
        >
            Crear Proyecto
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {columns.map(col => (
            <div
                key={col}
                className="bg-[#FFD100] border border-gray-400 p-4 rounded-lg min-h-[300px] text-black"
                onDragOver={e => e.preventDefault()}
                onDrop={e => handleDrop(e, col)}
            >
                <h2 className="text-lg font-bold mb-2 text-black">{col}</h2>
                {projects
                .filter(p => p.estatus === col)
                .map(p => (
                    <div
                    key={p.id}
                    draggable
                    onDragStart={e => handleDragStart(e, p.id)}
                    onDragEnd={handleDragEnd}
                    className={`relative bg-white rounded p-3 mb-3 cursor-move transition-all duration-200 ease-in-out
                        ${draggingId === p.id ? "scale-105 shadow-xl ring-2 ring-yellow-400" : "hover:scale-105 hover:shadow-lg border border-gray-300"}`}
                    >
                    <p><strong>Nombre:</strong> {p.nombre}</p>
                    <p><strong>Descripción:</strong> {p.descripcion}</p>
                    <p><strong>Estatus:</strong>
                        <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusStyle(p.estatus)}`}>
                            {p.estatus}
                        </span>
                    </p>
                    <p><strong>Prioridad:</strong> {p.prioridad}</p>
                    <p><strong>Fecha de Creción:</strong> {p.fecha}</p>
                    
                    <button
                        onClick={() => handleDelete(p.id)}
                        className="absolute top-2 right-2 mt-2 text-sm text-red-500 hover:underline hover:scale-150 transition-transform duration-200"
                    >
                        <img
                            src="/icons/delete.png"
                            alt="Eliminar"
                            className="w-5 h-5"
                        />
                    </button>
                    </div>
                ))}
            </div>
            ))}
        </div>

        {showModal && (
            <div className="fixed inset-0 bg-[#FFD100] bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 text-black placeholder:text-black">
                <h2 className="text-xl font-bold mb-4">Nuevo Proyecto</h2>
                <div className="space-y-3">
                <input
                    type="text"
                    placeholder="Nombre"
                    value={formData.nombre}
                    onChange={e => setFormData({ ...formData, nombre: e.target.value })}
                    className="w-full border px-3 py-2 rounded"
                />
                <textarea
                    placeholder="Descripción"
                    value={formData.descripcion}
                    onChange={e => setFormData({ ...formData, descripcion: e.target.value })}
                    className="w-full border px-3 py-2 rounded"
                />
                <select
                    value={formData.estatus}
                    onChange={e =>
                    setFormData({ ...formData, estatus: e.target.value as Estatus })
                    }
                    className="w-full border px-3 py-2 rounded bg-white"
                >
                    <option value="Pendiente">Pendiente</option>
                    <option value="En progreso">En progreso</option>
                    <option value="Completado">Completado</option>
                </select>
                <select
                    value={formData.prioridad}
                    onChange={e =>
                    setFormData({ ...formData, prioridad: e.target.value as Prioridad })
                    }
                    className="w-full border px-3 py-2 rounded bg-white"
                >
                    <option value="Alta">Alta</option>
                    <option value="Normal">Normal</option>
                    <option value="Baja">Baja</option>
                </select>
                <input
                    type="text"
                    value={new Date().toLocaleString("es-DO", {
                        dateStyle: "short",
                        timeStyle: "short"
                    })}
                    readOnly
                    className="w-full border px-3 py-2 rounded bg-gray-100 text-gray-600"
                />
                </div>
                <div className="mt-6 flex justify-end gap-3">
                <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-gray-300 rounded"
                >
                    Cancelar
                </button>
                <button
                    onClick={handleCreate}
                    className="px-4 py-2 bg-yellow-400 rounded hover:bg-yellow-500"
                >
                    Guardar
                </button>
                </div>
            </div>
            </div>
        )}
        </div>
  );
};

export default KanbanBoard;