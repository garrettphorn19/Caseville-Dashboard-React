import React from "react"
import Layout from "../components/layout/layout"
import Seo from "../components/layout/seo"
import AdminHome from "../components/admin/AdminHome"

function Admin() {
  return (
    <Layout>
      <Seo title="Admin" />
      <AdminHome />
    </Layout>
  )
}

export default Admin
