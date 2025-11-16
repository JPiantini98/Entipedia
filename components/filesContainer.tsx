"use client"
import FilesTable from './filesTable';

export default function MainPage() {

    return (
        <div>
            <h1 className="font-size: var(--text-9xl)">Gestor de Archivos</h1>
            <FilesTable />
        </div>
    );
}