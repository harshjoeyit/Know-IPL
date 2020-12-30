import React, { useState, useEffect } from 'react'
import { getVideos } from './Helpers/request'
import './App.css'

const App = () => {
  
  const initState = {
    extras: [],
    loading: true
  }

  const [state, setState] = useState(initState)

  useEffect(() => {
    getVideos()
      .then(res => {
        setState({
          extras: res.data.items,
          loading: false
        })
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <div className="video-results">
      <h1 className="video-list-heading"> Recent Videos </h1>
      <div className="video-list">
        {
          state.loading 
          ? (
            <div className="videos-loading">Loading...</div>
          ) 
          : (
              state.extras.map((item, index) => (
                <div
                  key={index}
                  className="video-item"
                >
                  <div className="iframe">
                    <iframe
                      width='320px'
                      height='180px'
                      frameBorder='0'
                      allowFullScreen='allowfullscreen'
                      title="IPL-Video"
                      src={`http://www.youtube.com/embed/${item.id.videoId}`}
                      style={{
                        borderRadius: '3px',
                      }}
                    ></iframe>
                  </div>
                </div>
              ))
            )}
      </div>
    </div>
  )
}

export default App
