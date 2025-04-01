import './App.css';
import FrontPage from './components/FrontPage.jsx';
import OngoingMatches from './components/OngoingMatches.jsx';
import PastMatches from './components/PastMatches.jsx';
import UpcomingMatches from './components/UpcomingMatches.jsx';
import LoginPage from './components/LoginPage.jsx';
import PastMatchDetails from './components/PastMatchDetails.jsx';
import UpcomingMatchDetails from './components/UpcomingMatchDetails.jsx';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/ongoing" element={<OngoingMatches />} />
        <Route path="/past" element={<PastMatches />} />
        <Route path="/upcoming" element={<UpcomingMatches />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/match/:matchId" element={<PastMatchDetails />} />
        <Route path="/upcoming-match/:matchId" element={<UpcomingMatchDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
