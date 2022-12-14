import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
    const user = useSelector(state => state.userReducer)
    const calendarEvents = useSelector(state => state.calendarEventReducer)

    return (
        <div className="profileCard">
            <div className="profileContent">
                <strong className="profileName">
                    {user.name}
                </strong>
                <div className="profileText">
                    {user.info}
                </div>
                <div>
                    {calendarEvents.map(element =>
                        <div className="eventCard" key={element.day.toString().concat(element.month.toString().concat(element.year.toString()))}>
                            <strong>{element.event}: </strong>{element.participants}. {element.day}.{element.month}.{element.year}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Profile;