import Link from "next/link";

const DashboardHome: React.FC = () => {
  const quickActions = [
    { title: "Proyectos", icon: "📊", sendTo: "/projectsPage" },
    { title: "Clientes", icon: "👥", sendTo: "/clientsPage"},
    { title: "Gestor de Archivos", icon: "📂", sendTo: "/filesPage" },
  ];

  return (
    <div className="p-8 text-black">
      {/* Banner con slogan */}
      <div className="bg-linear-to-r from-black via-gray-800 to-yellow-400 p-8 rounded-lg text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-white">
          El futuro es digital, el futuro es{" "}
          <span className="text-[#FFD100] drop-shadow-lg hover:brightness-1000 transition duration-300 cursor-pointer">
            Entipedia
          </span>
        </h1>
      </div>

      {/* Saludo y resumen */}
      <h2 className="text-xl font-semibold mb-2">Bienvenido, estimado cliente 👋</h2>
      <p className="text-gray-600 mb-6">
        Aquí tienes un resumen rápido de tus herramientas principales.
      </p>

      {/* Tarjetas de acceso rápido */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        {quickActions.map((action, idx) => (

          <Link href={action.sendTo}>
            <div
              key={idx}
              className="flex flex-col items-center justify-center rounded-lg p-6 bg-white hover:scale-105 hover:shadow-xl transition-transform cursor-pointer"
            >
              <span className="text-4xl mb-2">{action.icon}</span>
              <h3 className="text-lg font-semibold">{action.title}</h3>

            </div>          
          </Link>
        ))}
      </div>

      {/* Panel de novedades */}
      <div className="bg-gray-50 p-6 rounded-lg border">
        <h2 className="text-xl font-bold mb-4">Últimas novedades</h2>
        <ul className="space-y-2 text-gray-700 list-disc list-inside">
          <li>📁 Archivo “Reporte.pdf” subido ayer</li>
          <li>🆕 Nuevo cliente agregado: ACME Corp</li>
          <li>✅ Proyecto “Portal Web” actualizado</li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardHome;