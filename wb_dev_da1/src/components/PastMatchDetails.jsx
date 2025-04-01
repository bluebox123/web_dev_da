import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./PastMatchDetails.css";

const MatchDetails = () => {
  const { matchId } = useParams();
  const navigate = useNavigate(); // For back button navigation
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = "3761b773f7269f135d7eb8371e46dda6";

  useEffect(() => {
    console.log(`Fetching details for match ID: ${matchId}`);

    if (!matchId) {
      setError("Invalid match ID.");
      setLoading(false);
      return;
    }

    fetch(`https://v3.football.api-sports.io/fixtures?id=${matchId}`, {
      method: "GET",
      headers: {
        "x-apisports-key": apiKey
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log("Full API Response:", data);

        if (!data.response || data.response.length === 0) {
          throw new Error("Match details not found.");
        }

        setMatch(data.response[0]);
      })
      .catch(error => {
        console.error("Error fetching match details:", error);
        setError(error.message);
      })
      .finally(() => setLoading(false));
  }, [matchId]);

  if (loading) return <div className="loading">Loading match details...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="match-details-container">
      <h1>Match Details</h1>
      {match ? (
        <div className="match-details">
          <p><strong>Match:</strong> {match.teams.home.name} vs {match.teams.away.name}</p>
          <p><strong>Date:</strong> {new Date(match.fixture.date).toLocaleString()}</p>
          <p><strong>Venue:</strong> {match.fixture.venue.name}</p>
          <p><strong>Status:</strong> {match.fixture.status.long}</p>
          <p><strong>Score:</strong> {match.goals.home} - {match.goals.away}</p>
          <button className="back-button" onClick={() => navigate(-1)}>Go Back</button>
        </div>
      ) : (
        <p className="error">No matches were going have been completed</p>
      )}
    </div>
  );
};

export default MatchDetails;
