import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from 'pages/MainPage/MainPage';
import { Providers } from 'redux/provider';
import PrevewPage from 'pages/PreviewPage';

export default function App() {
  return (
    <Providers>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/preview" element={<PrevewPage />} />
        </Routes>
      </Router>
    </Providers>
  );
}
