import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from 'pages/MainPage/MainPage';
import { Providers } from 'redux/provider';

function Root() {
  return (
    <Providers>
      <MainPage />
    </Providers>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Root />} />
      </Routes>
    </Router>
  );
}
