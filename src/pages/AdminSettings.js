import React from 'react'
import AdminNav from '../components/AdminNav'

export default function AdminSettings() {
  return (
    <div className="flex">
      <AdminNav />
      <div className="flex-grow border">
        <h1>Admin Settings</h1>
      </div>
    </div>
  )
}
