import { useEffect } from "react"

export default function OfflinePage() {
    useEffect(() => {
        const online = () => {
            console.log("online!")
            location.reload()
        }

        window.addEventListener('online', online)

        return () => {
            window.removeEventListener('online', online)
        }
    }, [])

    return (
        <div className='tiles-cont'>
            <div className="offline-mssg">No Internet Connection</div>
        </div>
    )
}
