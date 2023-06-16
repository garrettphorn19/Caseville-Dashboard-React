import React from "react"
import Layout from "../components/layout/layout"
import SEO from "../components/layout/seo"
import AdminHome from "../components/admin/AdminHome"

function Admin() {
  return (
    <Layout>
      <SEO title="Admin" />
      <AdminHome />
    </Layout>
  )
}

export default Admin
