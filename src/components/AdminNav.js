import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminNav() {
  return (
    <div className="sticky left-0 z-40 w-54 bg-gray-200 borde h-[90vh]">
        <nav className="mt-5 px-4">
          <Link className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-400 hover:text-white" to="/admin/settings">Settings</Link>
          <Link className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-400 hover:text-white" to="/admin/collections">Collections</Link>
          {/* Add more links as needed */}
        </nav>
      </div>
  )
}
