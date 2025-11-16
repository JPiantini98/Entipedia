"use client"
import { useState } from "react"
import { v4 as uuidv4 } from "uuid";

const PAGE_SIZE = 5

const initialData = [
  { id: "1", name: "Cliente A", type: "Persona", value: "70000", startDate: "2025-11-10", endDate: "2025-11-30" },
  { id: "2", name: "Cliente B", type: "Empresa", value: "595000", startDate: "2025-08-05", endDate: "2026-02-15" },
  { id: "3", name: "Cliente C", type: "Empresa", value: "756000", startDate: "2025-11-10", endDate: "2025-11-30" },
  { id: "4", name: "Cliente D", type: "Empresa", value: "21000000000", startDate: "2025-08-05", endDate: "2026-02-15" },
  { id: "5", name: "Cliente E", type: "Persona", value: "95000", startDate: "2025-11-10", endDate: "2025-11-30" },
  { id: "6", name: "Cliente F", type: "Empresa", value: "400300", startDate: "2025-08-05", endDate: "2026-02-15" },
  { id: "7", name: "Cliente G", type: "Persona", value: "120000", startDate: "2025-11-10", endDate: "2025-11-30" },
]

export default function EditableTable() {
  const [data, setData] = useState(initialData)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const startIndex = (currentPage - 1) * PAGE_SIZE
  const paginatedData = data.slice(startIndex, startIndex + PAGE_SIZE)

  // Campos del modal
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    value: "",
    startDate: "",
    endDate: ""
  })




  const handleEdit = (id: string) => {
    console.log("DENTRO DE HANDLE EDIT, ID: ", id);
    setEditingId(id)
  
  }
  const handleSave = () => {
    console.log("DENTRO DE HANDLE SAVE");
    console.log("VALOR DE editingId EN SAVE: ", editingId);
    if (editingId) {
      console.log("Editing ID:", editingId);
      // Editar cliente existente
      setEditingId(null);
    } else {
      console.log("Creating new client");
      // Crear cliente nuevo
      const newCliente = {
        id: uuidv4(),
        ...formData
      };
      setData([...data, newCliente]);
      setEditingId(null);
      setShowModal(false);
      setFormData({ name: "", type: "", value: "", startDate: "", endDate: "" });
    }
  };



  const handleDelete = (id: string) => {
    // Si eliminas la fila que está en edición, sal del modo edición
    if (editingId === id || editingId !== null) {
      console.log("Exiting edit mode due to deletion");
      setEditingId(null);
    }
    setData(data.filter(row => row.id !== id));
    setEditingId(null)
    console.log("VALOR DE editingId DESPUES DE DELETE: ", editingId);
  };


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    id: string,
    field: string
  ) => {
    const value = field.includes("Date") ? e.target.value : e.target.value;
    const updated = data.map(row =>
      row.id === id ? { ...row, [field]: value } : row
    );
    setData(updated);
  };

function formatDate(value: string) {
  if (!value) return "";
  const [year, month, day] = value.split("-");
  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Novimebre", "Diciembre"];
  return `${day} ${monthNames[parseInt(month) - 1]} ${year}`;
}

  function formatCurrency(value: string | number) {
  const num = typeof value === "string" ? parseFloat(value) : value
  if (isNaN(num)) return ""
  return new Intl.NumberFormat("es-DO", {
    style: "currency",
    currency: "DOP",
    minimumFractionDigits: 0,
  }).format(num)
}


  return (
    <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-800">Lista de Clientes</h1>
        <p className="text-gray-600 mt-1 mb-10">
            Aquí puedes crear, editar y eliminar clientes. Para editar solo debes de dar clic en la fila que quieras editar, el resto lo tienes.
        </p>

        {/* ELIMINAAAAAAAAAAAAAR
      <button 
        onClick={handleAdd} 
        className="mb-4 px-4 py-2 font-bold text-black border rounded bg-[#FFD100] hover:scale-120 transition-transform duration-200">
        Crear Proyecto
      </button>
      */}

      <button
        onClick={() => setShowModal(true)}
        className="mb-4 px-4 py-2 font-bold text-black border border-gray-300 rounded hover:scale-115 transition-transform bg-[#FFD100]"
        >
        Crear Cliente 
        </button>





      <table className="w-full border border-gray-300">
        <thead className="bg-[#FFD100]">
          <tr>
            <th className="p-2 border text-black">Nombre</th>
            <th className="p-2 border text-black">Tipo</th>
            <th className="p-2 border text-black">Valor</th>
            <th className="p-2 border text-black">Desde</th>
            <th className="p-2 border text-black">Hasta</th>
            <th className="p-2 border text-black"></th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map(row => (
            <tr 
                key={row.id} 
                className="border-t text-black" 
                onClick={()=> editingId === null && handleEdit(row.id)}
            >
              {["name", "type", "value", "startDate", "endDate"].map(field => (
                <td key={field} className="p-2 border">
                  {editingId === row.id ? (

                    field === "type" ? (
                        <select
                            value={row[field as keyof typeof row]}
                            onChange={ e => handleChange(e, row.id, field) }
                            className="border px-2 py-1 w-full text-black bg-white"
                        >
                            <option value="Persona">Persona</option>
                            <option value="Empresa">Empresa</option>
                        </select>
                    ) : (
                        <input
                            type = {
                                field === "startDate" || field === "endDate"
                                ? "date" 
                                : field === "value" ? "number" : "text"
                            }
                            value={row[field as keyof typeof row]}
                            onChange={e => handleChange(e, row.id, field)}
                            className="border px-2 py-1 w-full"
                        />

                    )

                    
                  ) : (
                    field === "startDate" || field === "endDate"
                      ? formatDate(row[field as keyof typeof row] as string)
                      : field ==="value"
                      ? formatCurrency(row[field as keyof typeof row] as string | number)
                      : row[field as keyof typeof row]  
                  )}
                </td>
              ))}
              <td className="p-2 space-x-2">
                {editingId === row.id ? (
                  <button onClick={handleSave} className="text-blue-600 hover:scale-150 transition-transform duration-200">
                    <img
                        src="/icons/save.png"
                        alt="Guardar"
                        className="w-5 h-5"
                    />
                  </button>
                ) : null}
                <button onClick={() => handleDelete(row.id)} className="text-red-600 hover:scale-150 transition-transform duration-200">
                    <img
                        src="/icons/delete.png"
                        alt="Eliminar"
                        className="w-5 h-5"
                    />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginación */}
      <div className="mt-4 flex justify-center space-x-2">
        {Array.from({ length: Math.ceil(data.length / PAGE_SIZE) }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 border ${currentPage === i + 1 ? "bg-[#FFD100] text-black" : "bg-black"} hover:scale-130 transition-transform duration-200"`}
          >
            {i + 1}
          </button>
        ))}
      </div>

        {/* Modal de creación de cliente*/}

        {showModal && (
        <div className="fixed inset-0 bg-[#FFD100] rounded-2xl bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 text-black">
                <h2 className="text-xl font-bold mb-4 text-black">Nuevo Cliente</h2>

                <div className="space-y-3">
                    <input
                    type="text"
                    placeholder="Nombre"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border px-3 py-2 rounded text-black placeholder-gray-500"
                    />

                    <select
                    value={formData.type}
                    onChange={e => setFormData({ ...formData, type: e.target.value })}
                    className="w-full border px-3 py-2 rounded bg-white text-black"
                    >
                    <option value="">Selecciona tipo</option>
                    <option value="Empresa">Empresa</option>
                    <option value="Gobierno">Gobierno</option>
                    </select>

                    <input
                    type="number"
                    placeholder="Valor en pesos"
                    value={formData.value}
                    onChange={e => setFormData({ ...formData, value: e.target.value })}
                    className="w-full border px-3 py-2 rounded text-black"
                    />

                    <input
                    type="date"
                    value={formData.startDate}
                    onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full border px-3 py-2 rounded text-black"
                    />

                    <input
                    type="date"
                    value={formData.endDate}
                    onChange={e => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full border px-3 py-2 rounded text-black"
                    />
                </div>

                <div className="mt-6 flex justify-end gap-3">
                    <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-gray-300 rounded text-black hover:scale-115 transition-transform"
                    >
                    Cancelar
                    </button>
                    <button
                    onClick={() => {
                        const newId = uuidv4();
                        setData([
                        ...data,
                        { id: newId, ...formData }
                        ])
                        setShowModal(false)
                        setEditingId(null)
                        setFormData({
                        name: "",
                        type: "",
                        value: "",
                        startDate: "",
                        endDate: ""
                        })
                    }}
                    className="px-4 py-2 bg-[#FFD100] text-black rounded hover:scale-115 transition-transform"
                    >
                    Guardar
                    </button>
                </div>
            </div>
        </div>
        )}






      
    </div>
  )
}