import React from 'react'
import AdminNav from '../components/AdminNav'

export default function AdminCollections() {
  return (
    <div className="flex">
      <AdminNav />
      <div className="flex-grow border">
        <h1>Admin Collections</h1>
      </div>
    </div>
  )
}
