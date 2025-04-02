import './App.css';
import FrontPage from './components/FrontPage.jsx';
import OngoingMatches from './components/OngoingMatches.jsx';
import PastMatches from './components/PastMatches.jsx';
import UpcomingMatches from './components/UpcomingMatches.jsx';
import PastMatchDetails from './components/PastMatchDetails.jsx';
import UpcomingMatchDetails from './components/UpcomingMatchDetails.jsx';
import BasketballPast from './components/BasketballPast.jsx';
import BasketballMatchDetails from './components/BasketballPastDetails.jsx';
import BasketballOngoing from './components/BasketballOngoing.jsx';
import BasketballOngoingDetails from './components/BasketballOngoingDetails.jsx';
import BasketballUpcoming from './components/BasketballUpcoming.jsx';
import BasketballUpcomingDetails from './components/BasketballUpcomingDetails.jsx';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/ongoing" element={<OngoingMatches />} />
        <Route path="/past" element={<PastMatches />} />
        <Route path="/upcoming" element={<UpcomingMatches />} />
        <Route path="/match/:matchId" element={<PastMatchDetails />} />
        <Route path="/upcoming-match/:matchId" element={<UpcomingMatchDetails />} />
        <Route path="/basketball/past" element={<BasketballPast />} />
        <Route path="/basketball/match/:matchId" element={<BasketballMatchDetails />} />
        <Route path="/basketball/ongoing" element={<BasketballOngoing />} />
        <Route path="/basketball/ongoing-match/:matchId" element={<BasketballOngoingDetails />} />
        <Route path="/basketball/upcoming" element={<BasketballUpcoming />} />
        <Route path="/basketball/upcoming-match/:matchId" element={<BasketballUpcomingDetails />} />
      </Routes>
    </Router>
  );
};

export default App;