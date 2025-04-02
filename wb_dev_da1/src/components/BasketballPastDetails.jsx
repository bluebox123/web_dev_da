import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./BasketballPastDetails.css";

const BasketballMatchDetails = () => {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = "3761b773f7269f135d7eb8371e46dda6"; // Your API key

  useEffect(() => {
    console.log(`Fetching details for basketball match ID: ${matchId}`);

    if (!matchId) {
      setError("Invalid match ID.");
      setLoading(false);
      return;
    }

    // Use the games endpoint to fetch match details
    fetch(`https://v2.nba.api-sports.io/games?id=${matchId}`, {
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
      <h1>Basketball Match Details</h1>
      {match ? (
        <div className="match-details">
          <p><strong>Match:</strong> {match.teams.visitors.name} vs {match.teams.home.name}</p>
          <p><strong>Date:</strong> {new Date(match.date.start).toLocaleString()}</p>
          <p><strong>Venue:</strong> {match.arena.name}, {match.arena.city}</p>
          <p><strong>Status:</strong> {match.status.long}</p>
          <p><strong>Score:</strong> {match.scores.visitors.points} - {match.scores.home.points}</p>
          <button className="back-button" onClick={() => navigate(-1)}>Go Back</button>
        </div>
      ) : (
        <p className="error">No match details available.</p>
      )}
    </div>
  );
};

export default BasketballMatchDetails;
