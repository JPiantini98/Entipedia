import React from "react";

export default function BackButton({ children = "Back" }: { children?: React.ReactNode }) {

    return (
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            {children}
        </button>

    );
}