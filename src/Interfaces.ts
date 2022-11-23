export interface Participant {
  name: string;
}

export interface InvalidPair {
  participant1: Participant;
  participant2: Participant;
}

export interface Pair {
  giver: Participant;
  receiver: Participant;
}
