import { useState } from "react";
import Status from "./Resevation/Status";
import Pending from "./Resevation/Pending";

export default function Reservation() {
    const [toggles, setToggles] = useState('ongoing')

    return (
        <div className="reserv">
            <div className="nav">
                <h2>Reservation<i className="fa-regular fa-calendar" /></h2>
            </div>
            <Status toggles={toggles} setToggles={setToggles} />
            <div className="status-body">
                {toggles == 'ongoing' &&
                    <div className="ongoing table">
                        <div className="head">

                        </div>
                        <div className="data">

                        </div>
                    </div>
                }
                {toggles == 'pending' && <Pending />}
                {toggles == 'confirmed' &&
                    <div className="confirmed table">
                        <div className="head">

                        </div>
                        <div className="data">

                        </div>

                    </div>
                }
                {toggles == 'completed' &&
                    <div className="completed table">
                        <div className="head">

                        </div>
                        <div className="data">

                        </div>

                    </div>
                }
                {toggles == 'cancelled' &&
                    <div className="cancelled table">
                        <div className="head">

                        </div>
                        <div className="data">

                        </div>

                    </div>
                }
                {toggles == 'noshow' &&
                    <div className="noshow table">
                        <div className="head">

                        </div>
                        <div className="data">

                        </div>

                    </div>
                }
            </div>
        </div>
    )
}
