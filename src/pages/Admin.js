import React from 'react'
import { Link } from 'react-router-dom'
import AdminNav from '../components/AdminNav'

export default function Admin() {
  return (
    <div className="flex">
      <AdminNav />
      <div className="flex-grow">
        <h1>Admin</h1>
      </div>
    </div>
  )
}