import { useState } from "react";
import AddParticipant from "./components/AddParticipant";
import { Participant, InvalidPair } from "./Interfaces";
import ParticipantDisplay from "./components/ParticipantDisplay";
import InvalidPairs from "./components/InvalidPairs";
import AddInvalidPair from "./components/AddInvalidPair";

function App() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [invalidPairs, setInvalidPairs] = useState<InvalidPair[]>([]);

  const addParticipant = (participant: Participant) => {
    setParticipants([...participants, participant]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-rose-900">
              Secret Santa
            </h2>
          </div>

          <AddParticipant addParticipant={addParticipant} />

          <div className="mt-6">
            {participants.length > 0 && (
              <h2 className="mt-6 text-center text-2xl font-extrabold text-rose-900">
                Participants
              </h2>
            )}
            <ul className="divide-y divide-gray-200">
              {participants.map((participant) => (
                <ParticipantDisplay
                  key={participant.email}
                  participant={participant}
                  deleteParticipant={() => {
                    setParticipants(
                      participants.filter((p) => p.email !== participant.email)
                    );
                  }}
                />
              ))}
            </ul>
          </div>

          <AddInvalidPair
            participants={participants}
            invalidPairs={invalidPairs}
            setInvalidPairs={setInvalidPairs}
          />

          <InvalidPairs
            invalidPairs={invalidPairs}
            setInvalidPairs={setInvalidPairs}
            participants={participants}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
