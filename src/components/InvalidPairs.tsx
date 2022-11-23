import { useEffect } from "react";
import { InvalidPair, Participant } from "../Interfaces";

interface Props {
  participants: Participant[];
  invalidPairs: InvalidPair[];
  setInvalidPairs: (invalidPairs: InvalidPair[]) => void;
}

export default function InvalidPairs({
  invalidPairs,
  setInvalidPairs,
  participants,
}: Props) {
  useEffect(() => {
    // remove any invalid pairs that include a participant that no longer exists
    setInvalidPairs(
      invalidPairs.filter((invalidPair) => {
        return participants.some((participant) => {
          return (
            participant.name === invalidPair.participant1.name ||
            participant.name === invalidPair.participant2.name
          );
        });
      })
    );
  }, [participants]);

  if (invalidPairs.length === 0) {
    return null;
  }

  return (
    <>
      <h2 className="mt-6 text-center text-2xl font-extrabold text-rose-900">
        Invalid Pairs
      </h2>
      <ul className="divide-y divide-gray-200">
        {invalidPairs.map((invalidPair) => (
          <li
            key={invalidPair.participant1.name + invalidPair.participant2.name}
          >
            <div className="block hover:bg-gray-50">
              <div className="flex items-center px-4 py-4 sm:px-6">
                <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-600 truncate">
                      {invalidPair.participant1.name} cannot be paired with{" "}
                      {invalidPair.participant2.name}
                    </div>
                  </div>
                  <div className="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => {
                        setInvalidPairs(
                          invalidPairs.filter((invalidPair2) => {
                            return (
                              invalidPair2.participant1.name !==
                                invalidPair.participant1.name ||
                              invalidPair2.participant2.name !==
                                invalidPair.participant2.name
                            );
                          })
                        );
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
