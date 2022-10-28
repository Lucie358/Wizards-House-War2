export interface Year {
    name: string
    gryffondor: number,
    serdaigle: number,
    poufsouffle: number,
    serpentard: number,
    nbMatchs: number
    matchs: Match
  }

  export interface Match {
    description: string,
    team1: string,
    team1Points: number,
    team2: string,
    team2Points: number
  }
  
  export interface Game {
    id: any
    name: string
    description: string
    years: Year[]
  }

  export enum Spells {
    accio = 'accio',
    expecto = "expecto",
    arresto = "arresto",
    meteo = "meteo",
    aguamenti = "aguamenti"

}

export const SpellsOrder = [
    Spells.accio, 
    Spells.expecto,
    Spells.arresto,
    Spells.meteo,
    Spells.aguamenti

]