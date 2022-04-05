import { SessionData, CombatData, RollData } from './session-data';

export const SESSIONS: SessionData[] = [

];

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
    startTime : "2022-02-21T10:00:00",
    endTime : "2022-02-21T18:00:00",
    combats : combats1,
    rolls : rolls1
}
