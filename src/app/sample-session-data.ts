import { SessionData, CombatData, RollData } from './session-data';

export const PROFILES: string[] = [
    "Rohim",
    "Cinnamon",
    "Skooks",
    "Nimbus"
];

const combats1 : CombatData[] = [
    {
        startTime : "2022-02-21T14:00:00",
        endTime : "2022-02-21T15:00:00",
        rounds : 4
    }
]

const rolls1: RollData[] = [
    
]

const session1: SessionData = {
    character : "Rohim",
    startTime : "2022-02-21T00:00:00.000Z",
    endTime : "2022-02-21T02:53:00.000Z",
    combats : combats1,
    rolls : rolls1
}

export const SESSIONS: SessionData[] = [
    session1
];
