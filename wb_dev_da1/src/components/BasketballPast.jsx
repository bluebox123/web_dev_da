import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./matches.css";

const BasketballPast = () => {
  const [pastMatches, setPastMatches] = useState([]);
  const [ongoingMatches, setOngoingMatches] = useState([]);
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = "3761b773f7269f135d7eb8371e46dda6"; // Your API key
  const season = "2023";
  const currentDate = new Date(); // Set to today's date

  useEffect(() => {
    console.log("Fetching basketball matches...");

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

        // Separate matches into past, ongoing, and upcoming
        const past = [];
        const ongoing = [];
        const upcoming = [];

        data.response.forEach(fixture => {
          const matchDate = new Date(fixture.date.start);
          if (matchDate < currentDate) {
            past.push(fixture);
          } else if (matchDate.toDateString() === currentDate.toDateString()) {
            ongoing.push(fixture);
          } else {
            upcoming.push(fixture);
          }
        });

        console.log("Past Matches:", past);
        console.log("Ongoing Matches:", ongoing);
        console.log("Upcoming Matches:", upcoming);

        // Limit to 20 matches for each category
        setPastMatches(past.slice(0, 20));
        setOngoingMatches(ongoing.slice(0, 20));
        setUpcomingMatches(upcoming.slice(0, 20));
      })
      .catch(error => {
        console.error("Error fetching matches:", error);
        setError(error.message);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading matches...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="matches-container">
      <h1>Basketball Matches</h1>

      <h2>Past Matches</h2>
      {pastMatches.length === 0 ? (
        <p>No past matches available.</p>
      ) : (
        pastMatches.map((match, index) => (
          <div key={match.id} className="overall">
            <Link to={`/basketball/match/${match.id}`} className="match-link">
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
              <div id="score" className="fold1">
                <center>
                  <p>{match.scores.visitors.points} - {match.scores.home.points}</p>
                </center>
              </div>
            </Link>
          </div>
        ))
      )}

      <h2>Ongoing Matches</h2>
      {ongoingMatches.length === 0 ? (
        <p>No ongoing matches available.</p>
      ) : (
        ongoingMatches.map((match, index) => (
          <div key={match.id} className="overall">
            <Link to={`/basketball/match/${match.id}`} className="match-link">
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
              <div id="score" className="fold1">
                <center>
                  <p>{match.scores.visitors.points} - {match.scores.home.points}</p>
                </center>
              </div>
            </Link>
          </div>
        ))
      )}

      <h2>Upcoming Matches</h2>
      {upcomingMatches.length === 0 ? (
        <p>No upcoming matches available.</p>
      ) : (
        upcomingMatches.map((match, index) => (
          <div key={match.id} className="overall">
            <Link to={`/basketball/match/${match.id}`} className="match-link">
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
              <div id="score" className="fold1">
                <center>
                  <p>{match.scores.visitors.points} - {match.scores.home.points}</p>
                </center>
              </div>
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default BasketballPast;
