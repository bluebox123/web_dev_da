import React, { useEffect, useState } from "react";
import "./matches.css";

const OngoingMatches = () => {
  const [matches, setMatches] = useState([]);
  const apiKey = '3761b773f7269f135d7eb8371e46dda6';
  const leagueId = '39'; 
  const season = '2023'; 
  const currentDate = new Date('2023-08-15T00:30:00'); 

  useEffect(() => {
    fetch(`https://v3.football.api-sports.io/fixtures?league=${leagueId}&season=${season}`, {
      method: 'GET',
      headers: {
        'x-apisports-key': apiKey
      }
    })
    .then(response => response.json())
    .then(data => {
      const ongoingMatches = data.response.filter(fixture => {
        const matchDate = new Date(fixture.fixture.date);
        return matchDate.toISOString() === currentDate.toISOString();
      });
      setMatches(ongoingMatches);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }, []);

  return (
    <div className="matches-container">
      <h1>Ongoing Matches</h1>
      {matches.map((match, index) => (
        <div key={index} className="overall">
          <div id="increment" className="fold3">
            <center><h3>Match {index + 1}</h3></center>
          </div>
          <div id="teams" className="fold2">
            <center><p>{match.teams.home.name} vs {match.teams.away.name}</p></center>
          </div>
          <div id="score" className="fold1">
            <center><p>{match.goals.home} - {match.goals.away}</p></center>
          </div>
          <div className="left_photo"></div>
          <div className="right_photo"></div>
        </div>
      ))}
    </div>
  );
};

export default OngoingMatches;
