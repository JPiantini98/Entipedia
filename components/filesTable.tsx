import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

type Archivo = {
  id: string;
  nombre: string;
  descripcion: string;
  tipo: string; // extensión
  fechaCreacion: string;
  file?: File;
};

const FileManager: React.FC = () => {
  const [archivos, setArchivos] = useState<Archivo[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [nuevoArchivo, setNuevoArchivo] = useState<Partial<Archivo>>({});
  const [filtros, setFiltros] = useState({
    nombre: "",
    tipo: "",
    fecha: ""
  });

  // Detectar extensión
  const getExtension = (fileName: string) => {
    const parts = fileName.split(".");
    return parts.length > 1 ? parts.pop()!.toLowerCase() : "";
  };

  const handleGuardar = () => {
    if (!nuevoArchivo.nombre || !nuevoArchivo.descripcion || !nuevoArchivo.file) return;

    const archivo: Archivo = {
      id: uuidv4(),
      nombre: nuevoArchivo.nombre,
      descripcion: nuevoArchivo.descripcion,
      tipo: getExtension(nuevoArchivo.file.name),
      fechaCreacion: new Date().toISOString().split("T")[0],
      file: nuevoArchivo.file
    };

    setArchivos([...archivos, archivo]);
    setShowModal(false);
    setNuevoArchivo({});
  };

  const handleDelete = (id: string) => {
    setArchivos(archivos.filter(a => a.id !== id));
  };

  // Filtrado
  const archivosFiltrados = archivos.filter(a => {
    return (
      (filtros.nombre === "" || a.nombre.toLowerCase().includes(filtros.nombre.toLowerCase())) &&
      (filtros.tipo === "" || a.tipo === filtros.tipo) &&
      (filtros.fecha === "" || a.fechaCreacion === filtros.fecha)
    );
  });

  return (
    <div className="p-6 text-black">
        <h1 className="text-2xl font-bold text-gray-800">Lista de Archivos</h1>
        <p className="text-gray-600 mt-1 mb-10">
            Guarda tus archivos de manera segura y accede a ellos cuando los necesites.
        </p>

      {/* Filtros */}
      <h3 className="text-1x2 font-bold text-gray-800 mb-1">Filtra tus archivos para mayor facilidad</h3>
      <div className="flex gap-4 mb-10">
        <input
          type="text"
          placeholder="Filtrar por nombre"
          value={filtros.nombre}
          onChange={e => setFiltros({ ...filtros, nombre: e.target.value })}
          className="border px-2 py-1 rounded text-black"
        />
        <select
          value={filtros.tipo}
          onChange={e => setFiltros({ ...filtros, tipo: e.target.value })}
          className="border px-2 py-1 rounded text-black"
        >
          <option value="">Todos los tipos</option>
          <option value="pdf">PDF</option>
          <option value="docx">Word</option>
          <option value="xlsx">Excel</option>
          <option value="pptx">PowerPoint</option>
        </select>
        <input
          type="date"
          value={filtros.fecha}
          onChange={e => setFiltros({ ...filtros, fecha: e.target.value })}
          className="border px-2 py-1 rounded text-black"
        />
      </div>

      {/* Botón subir */}
      <button
        onClick={() => setShowModal(true)}
        className="bg-[#FFD100] text-black font-bold px-4 py-2 rounded border border-gray-300 hover:scale-115 transition-transform"
      >
        Subir archivo
      </button>

      {/* Tabla */}
      <table className="w-full mt-4 border-collapse border text-black">
        <thead>
          <tr className="bg-[#FFD100]">
            <th className="border px-4 py-2">Nombre</th>
            <th className="border px-4 py-2">Descripción</th>
            <th className="border px-4 py-2">Tipo de archivo</th>
            <th className="border px-4 py-2">Fecha de creación</th>
            <th className="border px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {archivosFiltrados.map(a => (
            <tr key={a.id}>
              <td className="border px-4 py-2">{a.nombre}</td>
              <td className="border px-4 py-2">{a.descripcion}</td>
              <td className="border px-4 py-2">{a.tipo.toUpperCase()}</td>
              <td className="border px-4 py-2">{a.fechaCreacion}</td>
              <td className="border px-4 py-2 flex gap-2">
                {a.file && (
                  <a
                    href={URL.createObjectURL(a.file)}
                    download={`${a.nombre}.${a.tipo}`}
                    className="bg-green-200 text-black px-3 py-1 rounded border"
                  >
                    Descargar
                  </a>
                )}
                <button
                  onClick={() => handleDelete(a.id)}
                  className="bg-red-200 text-black px-3 py-1 rounded border"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-[#FFD100] bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md w-96 text-black">
            <h2 className="text-lg font-bold mb-4">Subir archivo</h2>

            {/* Dropzone con drag & drop */}
            <div
              onDrop={e => {
                e.preventDefault();
                const file = e.dataTransfer.files[0];
                if (file) {
                  setNuevoArchivo({
                    ...nuevoArchivo,
                    file,
                    tipo: getExtension(file.name),
                    nombre: file.name.replace(/\.[^/.]+$/, "") // nombre sin extensión
                  });
                }
              }}
              onDragOver={e => e.preventDefault()}
              className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-lg p-6 cursor-pointer hover:bg-gray-100"
            >
              <span className="text-sm text-gray-600 mb-2">
                Arrastra tu archivo aquí o haz clic para seleccionar
              </span>
              <input
                type="file"
                className="hidden"
                onChange={e => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setNuevoArchivo({
                      ...nuevoArchivo,
                      file,
                      tipo: getExtension(file.name),
                      nombre: file.name.replace(/\.[^/.]+$/, "")
                    });
                  }
                }}
              />
            </div>

            {/* Vista previa */}
            {nuevoArchivo.file && (
              <div className="mt-2 text-sm text-gray-700">
                <strong>Seleccionado:</strong> {nuevoArchivo.file.name} (
                {nuevoArchivo.tipo?.toUpperCase()})
              </div>
            )}

            {/* Inputs adicionales */}
            <input
              type="text"
              value={nuevoArchivo.nombre || ""}
              readOnly
              placeholder="Nombre del archivo"
              className="border px-2 py-1 w-full mb-2 mt-5 text-black bg-gray-100"
            />
            <input
              type="text"
              placeholder="Descripción"
              className="border px-2 py-1 w-full mb-2 text-black"
              onChange={e => setNuevoArchivo({ ...nuevoArchivo, descripcion: e.target.value })}
            />

            {/* Botones */}
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded text-black hover:scale-115 transition-transform"
              >
                Cancelar
              </button>
              <button
                onClick={handleGuardar}
                className="px-4 py-2 bg-[#FFD100] text-black rounded hover:scale-115 transition-transform"
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

export default FileManager;