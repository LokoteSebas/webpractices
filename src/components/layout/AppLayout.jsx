import Navbar from './Navbar.jsx'

function AppLayout({ children, currentView, onViewChange }) {
  return (
    <>
      <Navbar currentView={currentView} onViewChange={onViewChange} />
      <main>{children}</main>
    </>
  )
}

export default AppLayout
