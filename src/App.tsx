import { useState } from "react";
import AddParticipant from "./components/AddParticipant";
import { Participant, InvalidPair, Pair } from "./Interfaces";
import ParticipantDisplay from "./components/ParticipantDisplay";
import InvalidPairs from "./components/InvalidPairs";
import AddInvalidPair from "./components/AddInvalidPair";
import PairDisplay from "./components/PairDisplay";

function App() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [invalidPairs, setInvalidPairs] = useState<InvalidPair[]>([]);
  const [pairs, setPairs] = useState<Pair[]>([]);

  const addParticipant = (participant: Participant) => {
    // return if participant already exists
    if (participants.find((p) => p.name === participant.name)) {
      return;
    }

    setParticipants([...participants, participant]);
  };

  const generatePairs = () => {
    // every participant is a giver in one pair
    // every participant is a receiver in one pair

    const resPairs: Pair[] = [];

    // create a copy of the participants array
    const participantsCopy = [...participants];

    // loop through the participants
    for (let i = 0; i < participants.length; i++) {
      // get a random index
      const randomIndex = Math.floor(Math.random() * participantsCopy.length);

      // get the random participant
      const randomParticipant = participantsCopy[randomIndex];

      // remove the random participant from the array
      participantsCopy.splice(randomIndex, 1);

      // create a pair
      const pair: Pair = {
        giver: participants[i],
        receiver: randomParticipant,
      };

      // add the pair to the pairs array
      resPairs.push(pair);
    }

    // check if any of the pairs are invalid
    // a pair can be invalid if the giver is the receiver
    // or if the pair is in the invalid pairs array
    const invalidPairsFound = resPairs.some((pair) => {
      // check if the giver is the receiver
      if (pair.giver.name === pair.receiver.name) {
        return true;
      }

      // check if the pair is in the invalid pairs array
      if (
        invalidPairs.some((invalidPair) => {
          return (
            invalidPair.participant1.name === pair.giver.name &&
            invalidPair.participant2.name === pair.receiver.name
          );
        })
      ) {
        return true;
      }

      // check if the reverse pair is in the invalid pairs array
      if (
        invalidPairs.some((invalidPair) => {
          return (
            invalidPair.participant1.name === pair.receiver.name &&
            invalidPair.participant2.name === pair.giver.name
          );
        })
      ) {
        return true;
      }

      return false;
    });

    // if there are invalid pairs, generate new pairs
    if (invalidPairsFound) {
      generatePairs();
      return;
    }

    // set the pairs
    setPairs(resPairs);
  };

  return (
    <div className="dark:bg-gray-800 dark:text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-lg w-full space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-rose-900 dark:text-rose-100">
                Secret Santa Generator
              </h2>
            </div>

            <AddParticipant addParticipant={addParticipant} />

            <div className="mt-6">
              {participants.length > 0 && (
                <h2 className="mt-6 text-center text-2xl font-extrabold text-rose-900 dark:text-rose-100">
                  Participants
                </h2>
              )}
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {participants.map((participant) => (
                  <ParticipantDisplay
                    key={participant.name}
                    participant={participant}
                    deleteParticipant={() => {
                      setParticipants(
                        participants.filter((p) => p.name !== participant.name)
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

            {participants.length > 1 && (
              <div>
                <button
                  type="button"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mt-4 dark:bg-green-700 dark:hover:bg-green-800"
                  onClick={generatePairs}
                >
                  Generate Pairs
                </button>
              </div>
            )}

            {/* pairs */}
            <div>
              {pairs.length > 0 && (
                <>
                  <h2 className="mt-6 text-center text-2xl font-extrabold text-rose-900 dark:text-rose-100">
                    Pairs
                  </h2>
                  {/* table header: giver, receiver */}
                  <div className="mt-4 flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                              <tr>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Giver
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Receiver
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                              {pairs.map((pair) => (
                                <tr key={pair.giver.name}>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                                    {pair.giver.name}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                                    {pair.receiver.name}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {/* <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {pairs.map((pair) => (
                  <PairDisplay key={pair.giver.name} pair={pair} />
                ))}
              </ul> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
