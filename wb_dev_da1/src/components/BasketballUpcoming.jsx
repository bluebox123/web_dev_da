import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./matches.css";

const BasketballUpcoming = () => {
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = "3761b773f7269f135d7eb8371e46dda6"; // Your API key
  const season = "2023";
  const currentDate = new Date("2023-10-15T19:00:00"); // Set to a specific date and time

  useEffect(() => {
    console.log("Fetching upcoming basketball matches...");

    fetch(`https://v2.nba.api-sports.io/games?season=${season}`, {
      method: "GET",
      headers: {
        "x-apisports-key": apiKey
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("Full API Response:", JSON.stringify(data, null, 2));

        if (!data.response || data.response.length === 0) {
          console.error("API returned no matches.");
          throw new Error("No matches found for the given criteria.");
        }

        const upcoming = data.response.filter(fixture => {
          const matchDate = new Date(fixture.date.start);
          return matchDate > currentDate; // Upcoming matches
        });

        console.log("Upcoming Matches:", upcoming);

        setUpcomingMatches(upcoming);
      })
      .catch(error => {
        console.error("Error fetching upcoming matches:", error);
        setError(error.message);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading upcoming matches...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="matches-container">
      <h1>Upcoming Basketball Matches</h1>
      {upcomingMatches.length === 0 ? (
        <p>No upcoming matches available.</p>
      ) : (
        upcomingMatches.map((match, index) => (
          <div key={match.id} className="overall">
            <Link to={`/basketball/upcoming-match/${match.id}`} className="match-link">
              <div id="increment" className="fold3">
                <center>
                  <h3>Match {index + 1}</h3>
                </center>
              </div>
              <div id="teams" className="fold2">
                <center>
                  <p>{match.teams.visitors.name} vs {match.teams.home.name}</p>
                </center>
              </div>
              <div id="date" className="fold1">
                <center>
                  <p>{new Date(match.date.start).toLocaleString()}</p>
                </center>
              </div>
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default BasketballUpcoming; // Ensure this is a default export