import { useState } from 'react'
import AppLayout from './components/layout/AppLayout.jsx'
import Dashboard from './pages/Dashboardvista.jsx'
import HabitsPage from './pages/HabitsPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import MoodPage from './pages/MoodPage.jsx'
import StatsPage from './pages/StatsPage.jsx'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentView, setCurrentView] = useState('dashboard')

  const views = {
    dashboard: <Dashboard onNavigate={setCurrentView} />,
    habits: <HabitsPage />,
    stats: <StatsPage />,
    mood: <MoodPage />,
  }

  if (!isAuthenticated) {
    return (
      <LoginPage
        onLogin={() => {
          setIsAuthenticated(true)
          setCurrentView('dashboard')
        }}
      />
    )
  }

  return (
    <AppLayout
      currentView={currentView}
      onLogout={() => {
        setIsAuthenticated(false)
        setCurrentView('dashboard')
      }}
      onViewChange={setCurrentView}
    >
      {views[currentView]}
    </AppLayout>
  )
}

export default App
