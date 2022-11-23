import { Participant } from "../Interfaces";

interface Props {
  participant: Participant;
  deleteParticipant: (participant: Participant) => void;
}

export default function ParticipantDisplay({
  participant,
  deleteParticipant,
}: Props) {
  return (
    <li key={participant.email}>
      <div className="block hover:bg-gray-50">
        <div className="flex items-center px-4 py-4 sm:px-6">
          <div className="min-w-0 flex-1 flex items-center justify-between">
            <div className="min-w-0 flex-1 px-4">
              <div>
                <div className="text-sm font-medium text-gray-600 truncate">
                  {participant.name}
                </div>
              </div>
            </div>
            <div className="min-w-0 flex-1 px-4">
              <div>
                <div className="text-sm font-medium text-gray-600 truncate">
                  {participant.email}
                </div>
              </div>
            </div>
            <div className="ml-4 flex-shrink-0">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => deleteParticipant(participant)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
