import React from 'react';
import './NoSearchResults.scss';

export const NoSearchResults = React.memo(() => {
  return (
    <div className="NoSearchResults">
      <p className="NoSearchResults__message">No search results...</p>
    </div>
  );
});
