import { useState } from "react";

import Status from "./Resevation/Status";
import Pending from "./Resevation/Pending";
import Cancelled from "./Resevation/Cancelled";
import Confirmed from "./Resevation/Confirmed";

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
                {toggles == 'confirmed' && <Confirmed />}
                {toggles == 'completed' &&
                    <div className="completed table">
                        <div className="head">

                        </div>
                        <div className="data">

                        </div>

                    </div>
                }
                {toggles == 'cancelled' && <Cancelled />}
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
