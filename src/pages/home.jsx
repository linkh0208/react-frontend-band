import homebg from '../assets/tvbonfire.webp'

function Home() {
    return (
        <div className="home-page">
            <div className='homebg-container'>
                <img className='homebg' src={homebg} />
            </div>
        </div>
    )
}

export default Home