import { useState, useRef, useEffect } from 'react'
import { MdDownload } from "react-icons/md";
import { IoPlaySharp, IoPauseSharp } from "react-icons/io5";

function formatTime(time) {
    let formattedTime = ''
    let minutes = 0
    let seconds = 0
    minutes = Math.floor(time / 60)
    seconds = Math.floor(time % 60)
    if (seconds < 10) {
        seconds = '0' + seconds
    }
    formattedTime = `${minutes}:${seconds}`

    return formattedTime
}

function Track({ trackName, trackUrl, downloadUrl, onPlay, isPlaying }) {
    const [progress, setProgress] = useState(0)
    const [isPaused, setIsPaused] = useState(true)
    const audioRef = useRef(new Audio(trackUrl))
    const progressBarRef = useRef(null)
    const isDragging = useRef(false)
    const [trackTime, setTrackTime] = useState(0)

    useEffect(function () {
        const audio = audioRef.current;

        function onMetadataLoaded() {
            setTrackTime(formatTime(audio.duration))
        }

        audio.addEventListener('loadedmetadata', onMetadataLoaded)

        return function () {
            audio.removeEventListener('loadedmetadata', onMetadataLoaded)
            audio.pause()
        }
    }, [])

    useEffect(function () {
        if (isPaused) {
            audioRef.current.pause()
        } else {
            audioRef.current.play()
        }
        function onAudioEnd() {
            setIsPaused(true)
            setProgress(0)
        }
        const audio = audioRef.current
        audio.addEventListener('ended', onAudioEnd)
        return function () {
            audio.removeEventListener('ended', onAudioEnd)
        }
    }, [isPaused])

    useEffect(function () {
        function updateProgress() {
            if (isDragging.current) return
            const duration = audioRef.current.duration || 1
            const currentTime = audioRef.current.currentTime
            const progress = (currentTime / duration) * 100
            setProgress(progress)

        }
        const audio = audioRef.current
        audio.addEventListener('timeupdate', updateProgress)

        return function () {
            audio.removeEventListener('timeupdate', updateProgress)
        }
    }, [])

    useEffect(() => {
        setIsPaused(!isPlaying)
    }, [isPlaying])

    function handlePlay() {
        if (!isPlaying) {
            onPlay(trackUrl)
        } else {
            setIsPaused(!isPaused)
        }
    }

    function startDragging(e) {
        isDragging.current = true
        progressBarRef.current.classList.add('grabbing')
        updatePosition(e)
    }
    function stopDragging() {
        if (!isDragging.current) return
        isDragging.current = false
        progressBarRef.current.classList.remove('grabbing')
    }
    function updatePosition(e) {
        if (!isDragging.current) return
        const progressBar = progressBarRef.current
        const bounds = progressBar.getBoundingClientRect()
        let percent = (e.clientX - bounds.left) / bounds.width
        percent = Math.max(0, Math.min(1, percent))
        const newTime = percent * audioRef.current.duration
        audioRef.current.currentTime = newTime
        setProgress(percent * 100)
    }
    useEffect(function () {
        document.addEventListener('mousemove', updatePosition)
        document.addEventListener('mouseup', stopDragging)
        return function () {
            document.removeEventListener('mousemove', updatePosition)
            document.removeEventListener('mouseup', stopDragging)
        }
    })

    return (
        <div className='track'>
            <div className='trackinfo'>
                <span className='trackName'>{trackName}</span>
                <div onClick={handlePlay} className='playbutton'>
                    {isPaused ? <IoPlaySharp /> : <IoPauseSharp />}
                </div>
            </div>
            <div className='time'>{formatTime(audioRef.current.currentTime)}</div>
            <div className="progressbarcontainer" ref={progressBarRef} onMouseDown={startDragging}>
                <div className='progressbar' style={{ width: `${progress}%` }}>
                    <div className='progressindicator' style={{ transform: `translateX(${progressBarRef.current ? progressBarRef.current.offsetWidth * progress / 100 - 2 : 0}px)` }}></div>
                </div>
            </div>
            <div className='time'>
                {trackTime}</div>
            <a href={trackUrl} download className='downloadbutton'>
                <MdDownload />
            </a>
        </div>
    )
}

export default Track