import { summaryFileName } from "@angular/compiler/src/aot/util";
import { combineLatest } from "rxjs";
import { CombatData, getDuration, RollData, SessionData } from "./session-data";
import { SessionService } from "./session.service";

// Determines whether a given roll was made during a given combat
function isDuringThisCombat(roll: RollData, combat: CombatData): boolean {
    let rollTime = Date.parse(roll.time)
    if (rollTime > Date.parse(combat.startTime))
        if (rollTime < Date.parse(combat.endTime))
            return true;
    return false;
}

// May be defunct just by sorting the list...
export function calculateMostRecentSession(sessions: SessionData[]): SessionData {
    return sessions.reduce((acc, session) => 
        Date.parse(session.startTime) > Date.parse(acc.startTime) ? session : acc, sessions[0]);
}

export function calculateTotalSessionTime(sessions: SessionData[]): number {
    return sessions.reduce((acc, session) => acc + getDuration(session), 0)
}

export function calculateShortestSession(sessions: SessionData[]): SessionData {
    return sessions.reduce((acc, session) => getDuration(acc) < getDuration(session) ? acc : session, sessions[0]);
}

export function calculateLongestSession(sessions: SessionData[]): SessionData {
    return sessions.reduce((acc, session) => getDuration(acc) > getDuration(session) ? acc : session, sessions[0])
}

export function calculateAverageSessionTime(sessions: SessionData[]): number {
    let l = sessions.length;
    let sum = calculateTotalSessionTime(sessions);
    return sum / l;
}

export function calculateSessionLongestCombat(session: SessionData): CombatData {
    return session.combats.reduce((acc, combat) =>
        getDuration(combat) > getDuration(acc) ? combat : acc, session.combats[0]);
}

// Calculates total time in milliseconds of combat in a given SESSION
export function calculateSessionCombatTime(session: SessionData): number {
    return session.combats.reduce((acc, combat) => acc + getDuration(combat), 0);
}

// Calculates total time in milliseconds of combat of a LIST of sessions
export function calculateTotalCombatTime(sessions: SessionData[]): number {
    return sessions.reduce((acc, session) => acc + calculateSessionCombatTime(session), 0);
}

// Calculates total number of rounds of combat in a session
export function calculateSessionCombatRounds(session: SessionData): number {
    return session.combats.reduce((acc, combat) => acc + combat.rounds, 0);
}

// Calculates total number of rounds of combat in list of sessions
export function calculateTotalCombatRounds(sessions: SessionData[]): number {
    return sessions.reduce((acc, session) => acc + calculateSessionCombatRounds(session), 0);
}

// TODO remove because superfluous?
export function calculateSessionNumberOfRolls(session: SessionData): number {
    return session.rolls.length;
}

// Calculates sum of all rolls given a list of sessions
export function calculateTotalNumberOfRolls(sessions: SessionData[]): number {
    return sessions.reduce((acc, session) => acc + session.rolls.length, 0);
}

// Calculate number of rolls made during combat in a session
export function calculateSessionCombatRolls(session: SessionData): number {
    return session.rolls.reduce((acc, roll) => 
        session.combats.reduce((acc2, combat) => 
            isDuringThisCombat(roll, combat) ? acc2 + 1 : acc2, 0) + acc, 0);
}

