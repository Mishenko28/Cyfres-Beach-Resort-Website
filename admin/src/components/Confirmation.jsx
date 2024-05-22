export default function Confirmation({ mssg, btn1, btn2, btn1F, btn2F }) {

    return (
        <div className="blur-cont">
            <div className="confirmation">
                <h4>{mssg}</h4>
                <div className="btns">
                    <button onClick={btn1F}>{btn1}</button>
                    <button onClick={btn2F}>{btn2}</button>
                </div>
            </div>
        </div>
    )
}
