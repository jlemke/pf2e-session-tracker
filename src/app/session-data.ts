export function getTimestamp(): string {
    let date = new Date().toISOString();
    return date.substring(0, date.indexOf("."));
}

export interface SessionData {
    character: string; // player character's name
    startTime: string;  //"YYYY-MM-DDTHH-MM-SS"
    endTime: string;  //"YYYY-MM-DDTHH-MM-SS"
    combats: CombatData[];
    rolls: RollData[];
  }
  
export interface CombatData {
    startTime: string;
    endTime: string;
    rounds: number; // can still be 0, meaning combat ended before you got a turn
}

export interface RollData {
    time: string; // "YYYY-MM-DDTHH-MM-SS" (can track stats of how many rolls per hour this way)
    dieRoll: number; // on the die, (between 1 and 20)
    checkResult: string; // "critical success"|"success"|"failure"|"critical failure"
//  checkResult: number; 0,1,2,3 ["critical success", "success", "failure", "critical failure"]
    checkType: string; //enum?? acrobatics, athletics,
}

export const CHECKTYPES: string[] = [
    'Attack Roll', 'Fortitude Save', 'Will Save', 'Reflex Save'
]

//const groupRollsByCheckType = (sessions: SessionData[]) => {
//    sessions.reduce(
//        (acc, x) => {
//            x.rolls.forEach(y => acc.set(
//                y.checkType,
//                [... (acc.get(y.checkType) ?? []), x]
//            ))
//            return acc;
//        },
//        new Map<string, RollData[]>()
//
//    )
//}