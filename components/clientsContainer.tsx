import ClientsTable from "./clientsTable";

export default function MainPage() {

    return (
        <div>
            <h1 className="font-size: var(--text-9xl)">Tabla Interactiva</h1>
            <ClientsTable />
        </div>
    );
}