const defaultState = []

const ADD_CALENDAR_EVENT = "ADD_CALENDAR_EVENT"
const EDIT_CALENDAR_EVENT = "EDIT_CALENDAR_EVENT"

export const calendarEventReducer = (state = defaultState, action) => {
    const newState = [...state]
    switch (action.type) {
        case ADD_CALENDAR_EVENT:
            newState.push({
                event: action.payload.event,
                participants: action.payload.participants,
                year: action.payload.year,
                month: action.payload.month,
                day: action.payload.day
            })
            return newState
        case EDIT_CALENDAR_EVENT:
            const resultingArray = newState.map(element => (element.year === action.payload.year
                && element.month === action.payload.month
                && element.day === action.payload.day)
                ?
                { ...element, event: action.payload.event, participants: action.payload.participants }
                :
                element)
            return resultingArray
        default:
            return state
    }
}

export const addCalendarEventAction = (payload) => {
    return {
        type: ADD_CALENDAR_EVENT,
        payload
    }
}

export const editCalendarEventAction = (payload) => {
    return {
        type: EDIT_CALENDAR_EVENT,
        payload
    }
}