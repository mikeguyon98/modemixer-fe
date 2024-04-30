import React from 'react'
import AdminNav from '../components/AdminNav'

export default function GenerateCollection() {
  return (
    <div className="flex">
      <AdminNav />
      <div className="flex-grow border">
        <h1>Generate Collection</h1>
      </div>
    </div>
  )
}
