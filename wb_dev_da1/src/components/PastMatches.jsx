import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./matches.css";

const PastMatches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = "3761b773f7269f135d7eb8371e46dda6";
  const leagueId = "39"; // Premier League
  const season = "2023";
  const currentDate = new Date("2023-08-15T00:30:00"); // Fixed date

  useEffect(() => {
    console.log("Fetching past matches...");
    fetch(`https://v3.football.api-sports.io/fixtures?league=${leagueId}&season=${season}`, {
      method: "GET",
      headers: {
        "x-apisports-key": apiKey
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log("API Response:", data);

        if (!data.response || data.response.length === 0) {
          throw new Error("No matches found for the given criteria.");
        }

        // Filtering past matches
        const pastMatches = data.response.filter(fixture => {
          const matchDate = new Date(fixture.fixture.date);
          return matchDate < currentDate;
        });

        console.log("Filtered Past Matches:", pastMatches);
        setMatches(pastMatches);
      })
      .catch(error => {
        console.error("Error fetching past matches:", error);
        setError(error.message);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading past matches...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="matches-container">
      <h1>Past Matches</h1>
      {matches.length === 0 ? (
        <p>No past matches available.</p>
      ) : (
        matches.map((match, index) => (
          <div key={match.fixture.id} className="overall">
            <Link to={`/match/${match.fixture.id}`} className="match-link" onClick={() => console.log("Clicked Match ID:", match.fixture.id)}>
              <div id="increment" className="fold3">
                <center>
                  <h3>Match {index + 1}</h3>
                </center>
              </div>
              <div id="teams" className="fold2">
                <center>
                  <p>{match.teams.home.name} vs {match.teams.away.name}</p>
                </center>
              </div>
              <div id="score" className="fold1">
                <center>
                  <p>{match.goals.home} - {match.goals.away}</p>
                </center>
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

export default PastMatches;
