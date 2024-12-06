import React from 'react';

const ResultsList: React.FC<{ results: { stage: string; name: string }[] }> = ({ results }) => (
  <div className="results-list-container">
    <div className="results-list">
      <h2>Santournament</h2>
      <ul>
        {results.map((result, index) => (
          <li key={index} className={result.stage}>{result.name}</li>
        ))}
      </ul>
    </div>
  </div>
);

export default ResultsList;