import React, { useState } from 'react'

const URL = "https://note-node-crud.onrender.com/api/notes"

const NoteForm = () => {
    const [text, setText] = useState('')
    const [completed, setCompleted] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch(URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text, completed }),
        });
        const data = await response.json();
        console.log(data);
      };
    
  return (
    <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="note" className="block mb-2 text-sm font-medium text-gray-900">Add Note</label>
            <input
                type="text" 
                id="note"
                value={text} 
                onChange={(e) => setText(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Write something..." required />
        </div>
        <p 
          onClick={handleSubmit}
          className="bg-indigo-500 rounded text-white px-4 py-1 text-md font-bold my-2 cursor-pointer hover:bg-indigo-700 duration-400"
          >Submit</p>
    </form>
  )
}

export default NoteForm