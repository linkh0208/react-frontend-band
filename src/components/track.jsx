import { useState, useRef, useEffect } from 'react'
import { MdDownload } from "react-icons/md";
import { IoPlaySharp, IoPauseSharp  } from "react-icons/io5";

function Track({ trackName, trackUrl, downloadUrl }) {
    const [progress, setProgress] = useState(0)
    const [isPaused, setIsPaused] = useState(true)
    const audioRef = useRef(new Audio(trackUrl))

    useEffect(function() {
        isPaused ? audioRef.current.pause() : audioRef.current.play()
    }, [isPaused])

    useEffect(function() {
        function updateProgress() {
            const duration = audioRef.current.duration
            const currentTime = audioRef.current.currentTime
            const progress = (currentTime/duration)*100
            setProgress(progress)
    
        }
        const audio = audioRef.current
        audio.addEventListener('timeupdate', updateProgress)

        return function() {
            audio.removeEventListener('timeupdate', updateProgress)
        }
    }, [])

    function handlePlay() {
        console.log('clicked play')
        setIsPaused(!isPaused)
    }

    function handleDownload() {
        window.location.href = downloadUrl
    }

    return (
        <div className='track'>
            <div className='trackinfo'>
                <span className='trackName'>{trackName}</span>
                <div onClick={handlePlay} className='playbutton'>
                    {isPaused ?  <IoPlaySharp /> : <IoPauseSharp /> }
                </div>
            </div>
            <div className='progressbarcontainer'>
                <div className='progressbar' style={{ width: `${progress}%` }}></div>
            </div>
            <div onClick={handleDownload} className='downloadbutton'>
                <MdDownload />
            </div>
        </div>
    )
}

export default Track