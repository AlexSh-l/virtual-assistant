import React, { useEffect, useState } from "react";
import { addCalendarEventAction, editCalendarEventAction } from "../reducers/CalendarEventReducer";
import { useDispatch, useSelector } from 'react-redux';
import { DAYS_IN_A_WEEK, getDayOfWeek, getDaysInAMonth } from "../utils/calendar";

const Calendar = () => {
    const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    const monthDays = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const currentDate = new Date()
    const calendarEvents = useSelector(state => state.calendarEventReducer)
    const [date, setDate] = useState(currentDate)
    const [searchQuery, setSearchQuery] = useState("")
    const [addComponentActive, setAddComponentActive] = useState("modalWindow")
    const [editComponentActive, setEditComponentActive] = useState("modalWindow")
    const [addEvent, setAddEvent] = useState("")
    const [editEvent, setEditEvent] = useState("")
    const [addParticipants, setAddParticipants] = useState("")
    const [editParticipants, setEditParticipants] = useState("")
    const dispatch = useDispatch()
    const [selectedDate, setSelectedDate] = useState()

    const getMonthData = (month, year) => {
        const result = []
        const inputDate = new Date(year, month)
        const daysInMonth = getDaysInAMonth(inputDate)
        const monthStartsOn = getDayOfWeek(inputDate)
        let day = 1

        for (let i = 0; i < (daysInMonth + monthStartsOn) / DAYS_IN_A_WEEK; i++) {
            result[i] = []
            for (let j = 0; j < DAYS_IN_A_WEEK; j++) {
                const daysEvent = calendarEvents.filter((item) => ((item.day === day)
                    && (item.month === month)
                    && (item.year === year)))[0]
                if ((i === 0 && j < monthStartsOn) || day > daysInMonth) {
                    result[i][j] = {
                        index: j,
                        date: undefined,
                        event: undefined,
                        participants: undefined
                    }
                } else {
                    let currentEvent = ""
                    let currentParticipants = ""
                    if (daysEvent !== undefined) {
                        currentEvent = daysEvent.event
                        currentParticipants = daysEvent.participants
                    }
                    result[i][j] = {
                        index: j,
                        date: new Date(year, month, day++),
                        event: currentEvent,
                        participants: currentParticipants
                    }
                }
            }
        }
        return result
    }

    const [data, setData] = useState(getMonthData(date.getMonth(), date.getFullYear()))

    useEffect(() => {
        setData(getMonthData(date.getMonth(), date.getFullYear()))
    }, [calendarEvents, searchQuery, date])

    const findEvent = (eventQuery, dateQuery, participantQuery) => {
        const dateQueryArray = dateQuery.split(".")
        const dayQuery = parseInt(dateQueryArray[0])
        const monthQuery = parseInt(dateQueryArray[1]) - 1
        const yearQuery = parseInt(dateQueryArray[2])

        const result = calendarEvents.filter(event =>
            event.event.includes(eventQuery)
            || (event.year === yearQuery && event.month === monthQuery && event.day === dayQuery)
            || event.participants.includes(participantQuery)
        )
        if (result[0] !== undefined) {
            setDate(new Date(result[0].year, result[0].month))
        }
    }

    return (
        <div>
            <div className="calendarTopPanel">
                <div className="calendarTopPanelContent">
                    <div>
                        <input type="button" value="Add event" className="calendarEditButton" onClick={() => {
                            addComponentActive === "modalWindow"
                                ? setAddComponentActive("activeModalWindow")
                                : setAddComponentActive("modalWindow")
                        }} />
                        <input type="button" value="Edit event" className="calendarEditButton" onClick={() => {
                            editComponentActive === "modalWindow"
                                ? setEditComponentActive("activeModalWindow")
                                : setEditComponentActive("modalWindow")
                        }} />
                    </div>
                    <div>
                        <input type="button" value="Search" className="calendarEditButton" onClick={(e) => {
                            findEvent(searchQuery, searchQuery, searchQuery)
                            setSearchQuery("")
                        }} />
                        <input type="text" value={searchQuery} placeholder="Event, date or participant" className="calendarInput" onChange={(e) => {
                            setSearchQuery(e.target.value)
                        }} />
                    </div>
                </div>
                <div className={addComponentActive}>
                    <input type="text" value={addEvent} placeholder="event..." className="calendarInput" onChange={(e) => {
                        setAddEvent(e.target.value)
                    }} />
                    <input type="text" value={addParticipants} placeholder="participants..." className="calendarInput" onChange={(e) => {
                        setAddParticipants(e.target.value)
                    }} />
                    <input type="button" value="Add" className="calendarEditButton" onClick={() => {
                        dispatch(addCalendarEventAction({
                            event: addEvent,
                            participants: addParticipants,
                            year: selectedDate.getFullYear(),
                            month: selectedDate.getMonth(),
                            day: selectedDate.getDate()
                        }))
                        setAddComponentActive("modalWindow")
                        setAddEvent("")
                        setAddParticipants("")
                    }} />
                </div>
                <div className={editComponentActive}>
                    <input type="text" value={editEvent} placeholder="event..." className="calendarInput" onChange={(e) => {
                        setEditEvent(e.target.value)
                    }} />
                    <input type="text" value={editParticipants} placeholder="participants..." className="calendarInput" onChange={(e) => {
                        setEditParticipants(e.target.value)
                    }} />
                    <input type="button" value="Edit" className="calendarEditButton" onClick={() => {
                        dispatch(editCalendarEventAction({
                            event: editEvent,
                            participants: editParticipants,
                            year: selectedDate.getFullYear(),
                            month: selectedDate.getMonth(),
                            day: selectedDate.getDate()
                        }))
                        setEditComponentActive("modalWindow")
                        setEditEvent("")
                        setEditParticipants("")
                    }} />
                </div>
            </div>
            <div className="calendarMonthChangePanel">
                <input type="button" value="<" className="calendarMonthChangeButton" onClick={() => {
                    setDate(new Date(date.getFullYear(), date.getMonth() - 1))
                }} /><strong className="calendarMonthChangeText">{monthDays[date.getMonth()]} {date.getFullYear()}</strong>
                <input type="button" value=">" className="calendarMonthChangeButton" onClick={() => {
                    setDate(new Date(date.getFullYear(), date.getMonth() + 1))
                }} />
            </div>
            <div className="calendarTable">
                <table>
                    <thead>
                        <tr>
                            {weekDays.map(day => <th key={day}>{day}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((week, index) =>
                            <tr key={index}>
                                {week.map((element) => element.date
                                    ?
                                    ((element.date.getDate() === currentDate.getDate()
                                        && element.date.getMonth() === currentDate.getMonth()
                                        && element.date.getFullYear() === currentDate.getFullYear())
                                        ?
                                        (element.event === "" || element.event === undefined)
                                            ?
                                            <td className="currentDate" key={element.index} onClick={(e) => {
                                                e.target.className === "currentDate"
                                                    ?
                                                    e.target.className = "currentSelectedCell"
                                                    :
                                                    e.target.className = "currentDate"
                                                setSelectedDate(element.date)
                                            }}>{element.date.getDate()}<br />
                                                <strong>{element.event}</strong>
                                                <br />{element.participants}</td>
                                            :
                                            <td className="eventCurrentCell" key={element.index} onClick={(e) => {
                                                e.target.className === "eventCurrentCell"
                                                    ?
                                                    e.target.className = "currentSelectedCell"
                                                    :
                                                    e.target.className = "eventCurrentCell"

                                                setSelectedDate(element.date)
                                            }}>{element.date.getDate()}<br />
                                                <strong>{element.event}</strong>
                                                <br />{element.participants}</td>
                                        :
                                        (element.event === "" || element.event === undefined)
                                            ? <td key={element.index} className="cell" onClick={(e) => {
                                                e.target.className === "cell"
                                                    ?
                                                    e.target.className = "selectedCell"
                                                    :
                                                    e.target.className = "cell"
                                                setSelectedDate(element.date)
                                            }}>{element.date.getDate()}<br />
                                                <strong>{element.event}</strong>
                                                <br />{element.participants}</td>
                                            :
                                            <td key={element.index} className="eventCell" onClick={(e) => {
                                                e.target.className === "eventCell"
                                                    ?
                                                    e.target.className = "selectedEventCell"
                                                    :
                                                    e.target.className = "eventCell"
                                                setSelectedDate(element.date)
                                            }}>{element.date.getDate()}<br />
                                                <strong>{element.event}</strong>
                                                <br />{element.participants}</td>)
                                    :
                                    <td key={element.index} className="blankDate" />
                                )}
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Calendar;