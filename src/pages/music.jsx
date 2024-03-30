import PlaylistCard from '../components/playlistcard'
import track1 from '../assets/track1.mp3'
import track2 from '../assets/track2.mp3'
import track3 from '../assets/track3.mp3'
import track4 from '../assets/track4.mp3'
import albumart from '../assets/albumart.jpg'



function Music() {
    const tracks = [
        { name: 'Orange Juice', url: track1, downloadUrl: track1 },
        { name: 'Baloney', url: track2, downloadUrl: track2 },
        { name: 'La Computadora', url: track3, downloadUrl: track3 },
        { name: 'Balls', url: track4, downloadUrl: track4 },
    ]
    return (
        <div className='music'>
            <PlaylistCard
                playlistName='Album 1'
                tracks={tracks}
                albumArt={albumart}
                colorScheme={{
                    color1: 'rgb(0, 79, 116)',
                    color2: 'rgb(10, 10, 10)',
                    color3: 'rgb(27, 27, 27)'
                }}               
            />
            <PlaylistCard
                playlistName='Album 2'
                tracks={tracks}
                albumArt={albumart}
                colorScheme={{
                    color1: 'rgb(0, 79, 116)',
                    color2: 'rgb(10, 10, 10)',
                    color3: 'rgb(27, 27, 27)'
                }}               
            />
        </div>
    )
}

export default Music