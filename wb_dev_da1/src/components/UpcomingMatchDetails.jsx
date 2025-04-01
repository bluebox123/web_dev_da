import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./UpcomingMatchDetails.css"; 

const UpcomingMatchDetails = () => {
  const { matchId } = useParams();  
  const navigate = useNavigate();   
  const [match, setMatch] = useState(null);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);   
  const apiKey = "3761b773f7269f135d7eb8371e46dda6"; 
  useEffect(() => {
    console.log(`Fetching details for upcoming match ID: ${matchId}`);

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
          throw new Error("Upcoming match details not found.");
        }
        setMatch(data.response[0]); 
      })
      .catch(error => {
        console.error("Error fetching upcoming match details:", error);
        setError(error.message);  
      })
      .finally(() => setLoading(false)); 
  }, [matchId]);
  if (loading) return <div className="loading">Loading upcoming match details...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  return (
    <div className="match-details-container">
      <h1>Upcoming Match Details</h1>
      {match ? (
        <div className="match-details">
          <p><strong>Match:</strong> {match.teams.home.name || "TBA"} vs {match.teams.away.name || "TBA"}</p>
          <p><strong>Date:</strong> {new Date(match.fixture.date).toLocaleString()}</p>
          <p><strong>Venue:</strong> {match.fixture.venue.name || "TBA"}</p>
          <p><strong>Status:</strong> {match.fixture.status.long}</p>
          <button className="back-button" onClick={() => navigate(-1)}>Go Back</button> 
        </div>
      ) : (
        <p className="error">No upcoming match details available.</p> 
      )}
    </div>
  );
};

export default UpcomingMatchDetails;
