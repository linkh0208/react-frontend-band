import Track from './track'
import JSZip from 'jszip';
import { saveAs } from 'file-saver'
import { useState } from 'react';


function PlaylistCard({ playlistName, tracks, albumArt, colorScheme, download }) {
    const { color1, color2, color3 } = colorScheme;
    const [currentlyPlaying, setCurrentlyPlaying] = useState(null)

    
    async function handleDownload() {
        const zip = new JSZip()
        const zipFolder = zip.folder(playlistName)
        const trackDownloads = tracks.map(async function(track, index) {
            const response = await fetch(track.downloadUrl)
            const blob = await response.blob()
            zipFolder.file(`${track.name}.mp3`, blob)
        })
        const albumArtResponse = await fetch(albumArt)
        const blob = await albumArtResponse.blob()
        zipFolder.file("albumart.jpg", blob)
        await Promise.all(trackDownloads)
        zip.generateAsync({type: 'blob'}).then(function(content){
            saveAs(content, `${playlistName}.zip`)
        })
    }

    function handlePlayTrack(trackUrl) {
        if (currentlyPlaying && currentlyPlaying !== trackUrl) {
            setCurrentlyPlaying(null)
        }
        setCurrentlyPlaying(trackUrl)
    }
 
    return (
        <div className='playlistcard' style={{
            backgroundImage: `linear-gradient(to top left, ${color1}, ${color2} 60%, ${color3})`
        }}>
            <span className='playlistname'>{playlistName}</span>
            <button className ='albumdlbutton' role='button' onClick={handleDownload}>Download Album</button>
            <div className='bigcontainer'>    
                <div className='trackscontainer'>
                    {tracks.map(function(track, index) {
                        return (
                            <Track
                                onPlay={function() {
                                    handlePlayTrack(track.url)
                                }}
                                isPlaying={track.url===currentlyPlaying}
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