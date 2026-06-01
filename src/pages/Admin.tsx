import { Helmet } from 'react-helmet-async'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import '../styles/globals.css'

const adminActions = [
  {
    title: 'Add Project',
    description: 'Create a new portfolio project and publish it through the backend.',
    href: '/add-project',
  },
  {
    title: 'Manage Projects',
    description: 'Edit active projects or soft delete projects from the portfolio.',
    href: '/admin/projects',
  },
  {
    title: 'Manage CV',
    description: 'Upload a new PDF CV and review the current active file.',
    href: '/admin/cv',
  },
]

const Admin = () => {
  return (
    <>
      <Helmet>
        <title>Admin — Utsav Malla</title>
      </Helmet>

      <Header />

      <main id="main" className="admin-page">
        <div className="container admin-page-inner">
          <div className="admin-heading">
            <p className="eyebrow">Admin</p>
            <h1>Admin Dashboard</h1>
            <p>
              Manage portfolio content from one place. More editing tools can be added here as the admin area grows.
            </p>
          </div>

          <div className="admin-actions" aria-label="Admin tools">
            {adminActions.map((action) => (
              <a key={action.href} className="admin-action-card" href={action.href}>
                <span>
                  <strong>{action.title}</strong>
                  <small>{action.description}</small>
                </span>
                <span aria-hidden="true">-&gt;</span>
              </a>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}

export default Admin
