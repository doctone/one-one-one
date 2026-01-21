import { useState } from 'react'
import { Layout } from './components/Layout'
import { devotionalContent } from './data/devotionalContent'

function App() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const currentDevotional = devotionalContent[currentIndex]

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % devotionalContent.length)
  }

  return (
    <div className="min-h-screen bg-sand-50 selection:bg-clay-200">
      <Layout
        data={currentDevotional}
        onNext={handleNext}
      />
    </div>
  )
}

export default App
