import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Ascent } from './variants/ascent/Ascent'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Ascent />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
