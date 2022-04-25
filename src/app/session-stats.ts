import { getDuration, SessionData } from "./session-data";


export function calculateTotalSesssionTime(sessions: SessionData[]) {
    return sessions.reduce((acc, session) => acc + getDuration(session), 0)
}

export function calculateLongestSession(sessions: SessionData[]) {
    return sessions.reduce((acc, session) => Math.max(acc, getDuration(session)), 0)
}

export function calculateMostRecentSession(sessions: SessionData[]) {
    return sessions.reduce((acc, session) => 
        Date.parse(session.startTime) > Date.parse(acc.startTime) ? session : acc, sessions[0]);
}

export function calculateNumberOfRolls(sessions: SessionData[]) {
    return sessions.reduce((acc, session) => acc + session.rolls.length, 0);
}