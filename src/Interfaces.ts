export interface Participant {
  name: string;
  email: string;
}

export interface InvalidPair {
  participant1: Participant;
  participant2: Participant;
}
