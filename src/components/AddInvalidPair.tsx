import { useState } from "react";
import { InvalidPair, Participant } from "../Interfaces";

interface Props {
  participants: Participant[];
  invalidPairs: InvalidPair[];
  setInvalidPairs: (invalidPairs: InvalidPair[]) => void;
}

export default function AddInvalidPair({
  participants,
  invalidPairs,
  setInvalidPairs,
}: Props) {
  if (participants.length < 2) {
    return null;
  }

  const [participant1, setParticipant1] = useState<Participant | null>(null);
  const [participant2, setParticipant2] = useState<Participant | null>(null);

  const addInvalidPair = () => {
    if (!participant1 || !participant2) {
      alert("Please select two participants");
      return;
    }

    // check if the pair already exists
    if (
      invalidPairs.some((invalidPair) => {
        return (
          invalidPair.participant1.email === participant1.email &&
          invalidPair.participant2.email === participant2.email
        );
      })
    ) {
      alert("This pair already exists");
      return;
    }

    // check if the reverse pair already exists
    if (
      invalidPairs.some((invalidPair) => {
        return (
          invalidPair.participant1.email === participant2.email &&
          invalidPair.participant2.email === participant1.email
        );
      })
    ) {
      alert("This pair already exists");
      return;
    }

    // check if the pair is the same person
    if (participant1.email === participant2.email) {
      alert("You cannot add a pair with the same person");
      return;
    }

    setInvalidPairs([...invalidPairs, { participant1, participant2 }]);
  };

  return (
    <form className="mt-8 space-y-6">
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <label htmlFor="participant1" className="sr-only">
            Participant 1
          </label>
          <select
            id="participant1"
            name="participant1"
            value={participant1?.email || ""}
            onChange={(e) => {
              setParticipant1(
                participants.find(
                  (participant) => participant.email === e.target.value
                ) || null
              );
            }}
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          >
            <option value="">Select Participant 1</option>
            {participants.map((participant) => (
              <option key={participant.email} value={participant.email}>
                {participant.name}
              </option>
            ))}
          </select>
          <label htmlFor="participant2" className="sr-only">
            Participant 2
          </label>
          <select
            id="participant2"
            name="participant2"
            value={participant2?.email || ""}
            onChange={(e) => {
              setParticipant2(
                participants.find(
                  (participant) => participant.email === e.target.value
                ) || null
              );
            }}
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          >
            <option value="">Select Participant 2</option>
            {participants.map((participant) => (
              <option key={participant.email} value={participant.email}>
                {participant.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <button
          type="button"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={addInvalidPair}
        >
          Add Invalid Pair
        </button>
      </div>
    </form>
  );
}