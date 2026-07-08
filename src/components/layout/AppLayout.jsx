import Navbar from './Navbar.jsx'

function AppLayout({ children, currentView, onLogout, onViewChange }) {
  return (
    <>
      <Navbar
        currentView={currentView}
        onLogout={onLogout}
        onViewChange={onViewChange}
      />
      <main>{children}</main>
    </>
  )
}

export default AppLayout
