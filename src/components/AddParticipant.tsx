import { useState } from "react";
import { Participant } from "../Interfaces";

interface Props {
  addParticipant: (participant: Participant) => void;
}

export default function AddParticipant({ addParticipant }: Props) {
  const [name, setName] = useState("");

  const handleSubmit = (event: any) => {
    event.preventDefault();

    if (name === "") {
      alert("Please enter a name");
      return;
    }

    const newParticipant: Participant = {
      name,
    };
    addParticipant(newParticipant);
    setName("");
  };

  return (
    <form className="mt-8 space-y-6">
      <input type="hidden" name="remember" value="true" />
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <label htmlFor="name" className="sr-only">
            Name
          </label>
          <input
            className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm dark:bg-gray-800 dark:text-gray-100"
            id="name"
            placeholder="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            // pressing enter submits the form
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                handleSubmit(event);
              }
            }}
          />

          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mt-4 dark:bg-green-700 dark:hover:bg-green-800"
            onClick={(e) => handleSubmit(e)}
          >
            Add Participant
          </button>
        </div>
      </div>
    </form>
  );
}
