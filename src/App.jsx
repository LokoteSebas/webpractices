import { useState } from 'react'
import AppLayout from './components/layout/AppLayout.jsx'
import Dashboard from './pages/Dashboardvista.jsx'
import HabitsPage from './pages/HabitsPage.jsx'
import MoodPage from './pages/MoodPage.jsx'
import StatsPage from './pages/StatsPage.jsx'

function App() {
  const [currentView, setCurrentView] = useState('dashboard')

  const views = {
    dashboard: <Dashboard onNavigate={setCurrentView} />,
    habits: <HabitsPage />,
    stats: <StatsPage />,
    mood: <MoodPage />,
  }

  return (
    <AppLayout currentView={currentView} onViewChange={setCurrentView}>
      {views[currentView]}
    </AppLayout>
  )
}

export default App
