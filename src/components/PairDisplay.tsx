import { Pair } from "../Interfaces";

interface Props {
  pair: Pair;
}

export default function PairDisplay({ pair }: Props) {
  return (
    <li key={pair.giver.name}>
      <div className="block hover:bg-gray-50 dark:hover:bg-gray-800">
        <div className="flex items-center px-4 py-4 sm:px-6">
          <div className="min-w-0 flex-1 flex items-center justify-between">
            <div className="min-w-0 flex-1 px-4">
              <div>
                <div className="text-sm font-medium text-gray-600 truncate dark:text-gray-300">
                  {pair.giver.name}
                </div>
              </div>
            </div>
            <div className="min-w-0 flex-1 px-4">
              <div>
                <div className="text-sm font-medium text-gray-600 truncate dark:text-gray-300">
                  {pair.receiver.name}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
