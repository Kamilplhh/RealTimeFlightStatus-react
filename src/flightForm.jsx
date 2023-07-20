import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCity, faPlaneUp, faCalendarDays } from '@fortawesome/free-solid-svg-icons';

export function FlightForm() {
    const current = new Date();
    const today = `${current.getFullYear()}-${('0' + (current.getMonth() + 1)).slice(-2)}-${('0' + current.getDate()).slice(-2)}`;
    const tomorrow = `${current.getFullYear()}-${('0' + (current.getMonth() + 1)).slice(-2)}-${('0' + (current.getDate() + 1)).slice(-2)}`;

    return (
        <div className="flightForm">
            <img src="./images/plane.png" />
            <form>
                <div className="forms">
                    <div>
                        <span>
                            <FontAwesomeIcon icon={faCity} className='fa'></FontAwesomeIcon>
                        </span>
                        <input type="text" id="airLine" className="formRows" autoComplete="off" placeholder="Airline (e.g United Airlines)" required />
                    </div>
                    <div>
                        <span className="formIcon">
                            <FontAwesomeIcon icon={faPlaneUp} className='fa'></FontAwesomeIcon>
                        </span>
                        <input type="text" id="flightNumber" className="formRows" autoComplete="off" placeholder="Flight Number (e.g. UA2402)" required />
                    </div>
                    <div>
                        <span className="formIcon">
                            <FontAwesomeIcon icon={faCalendarDays} className='fa'></FontAwesomeIcon>
                        </span>
                        <select id="date" className="formRowsS" required>
                            <option value={today}>Today</option>
                            <option value={tomorrow}>Tomorrow</option>
                        </select>
                    </div>

                    <button className="btn">Search Flight</button>
                </div>
            </form>
        </div>
    )
}