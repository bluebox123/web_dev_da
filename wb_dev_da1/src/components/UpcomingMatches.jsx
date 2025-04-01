import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "./matches.css";

const UpcomingMatches = () => {
  const [matches, setMatches] = useState([]);
  const apiKey = '3761b773f7269f135d7eb8371e46dda6';
  const leagueId = '39'; // Premier League
  const season = '2023'; // Use 2023 season
  const currentDate = new Date('2023-08-15T00:30:00'); // August 15, 2023

  useEffect(() => {
    fetch(`https://v3.football.api-sports.io/fixtures?league=${leagueId}&season=${season}`, {
      method: 'GET',
      headers: {
        'x-apisports-key': apiKey
      }
    })
    .then(response => response.json())
    .then(data => {
      // Filter matches where the match date is after August 15th, 2023
      const upcomingMatches = data.response.filter(fixture => {
        const matchDate = new Date(fixture.fixture.date);

        // If the match is after 15th August 2023, change its status to 'Upcoming'
        if (matchDate > currentDate) {
          fixture.fixture.status.short = "Upcoming"; // Mark status as "Upcoming"
          return true; // Keep only matches after the threshold
        }
        return false;
      });

      console.log("Filtered Upcoming Matches:", upcomingMatches);
      setMatches(upcomingMatches);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }, []);

  return (
    <div className="matches-container">
      <h1>Upcoming Matches</h1>
      {matches.length === 0 ? (
        <p>No upcoming matches after 15th August 2023.</p>
      ) : (
        matches.map((match, index) => (
          <div key={index} className="overall">
            <Link to={`/upcoming-match/${match.fixture.id}`} className="match-link"> {/* Link to UpcomingMatchDetails page */}
              <div id="increment" className="fold3">
                <center><h3>Match {index + 1}</h3></center>
              </div>
              <div id="teams" className="fold2">
                <center><p>{match.teams.home.name} vs {match.teams.away.name}</p></center>
              </div>
              <div id="score" className="fold1">
                <center><p>Status: {match.fixture.status.short}</p></center>
              </div>
              <div className="left_photo"></div>
              <div className="right_photo"></div>
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default UpcomingMatches;
