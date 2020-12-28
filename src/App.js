import React, { useEffect } from 'react'
import { csv } from 'd3'
import matches from './data/Players.csv'

function App() {

  useEffect(() => {
    csv(matches)
    .then(data => console.log(data))
  })

  return (  
    <div>Hello  </div>
  );
}

export default App;
