import Track from './track'
function PlaylistCard({ playlistName, tracks, albumArt }) {
    return (
        <div className='playlistcard'>
            <span className='playlistname'>{playlistName}</span>
            <div className='bigcontainer'>    
                <div className='trackscontainer'>
                    {tracks.map(function(track, index) {
                        return (
                            <Track
                                key={index}
                                trackName={track.name}
                                trackUrl={track.url}
                                downloadUrl={track.downloadUrl}
                            />
                        )
                    })}
                </div>
                <img className='albumart' src={albumArt}></img>
            </div>
        </div>
    )
}

export default PlaylistCard