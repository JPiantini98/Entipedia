import React from "react";
import Link from "next/link";

export default function MainContainer({ children }: { children: React.ReactNode }) {
  return (

    <div>
        <div className="flex h-screen bg-[#F8F9FA]">
            {/* Sidebar */}
            <aside className="w-64 bg-black text-white flex flex-col justify-between">
                <div className="p-6">
                <Link href="/homePage" className="text-2xl font-bold mb-6">
                    <img
                        src="/icons/entipediaLogo.png"
                        alt="Logo"
                        className="w-64 h-20 object-contain mb-4"
                    />                
                </Link>
                <br />
                <nav className="flex flex-col gap-4">
                    <Link href="/projectsPage" className="text-white text-2xl font-bold mb-2 hover:text-[#FFD100]">Proyectos</Link>
                    <Link href="/clientsPage" className="text-white text-2xl font-bold mb-2 hover:text-[#FFD100]">Clientes</Link>
                    <Link href="/filesPage" className="text-white text-2xl font-bold mb-2 hover:text-[#FFD100]">Archivos</Link>
                </nav>
                </div>

                {/* Profile Footer */}
                <div className="p-6 border-t border-gray-700 flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-600 rounded-full" />
                <span>Tom Cook</span>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                {children}
            </main>
        </div>

        

    </div>

  );
}