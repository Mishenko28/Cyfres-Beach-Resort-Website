import { useState } from 'react'


export default function AboutUs() {
    const [isLoading, setIsLoading] = useState(false)

    return (
        <div className="about-us">
            {isLoading && <div className="loader"></div>}
            <div className="nav">
                <h2>About us<i class="fa-solid fa-users-gear"></i></h2>
            </div>
        </div>
    )
}
