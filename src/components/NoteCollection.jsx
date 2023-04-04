import React, { useEffect, useState } from 'react'

const URL = process.env.REACT_APP_SERVER_URL;

const NoteCollection = () => {
    const [notes, setNotes] = useState([])
    const fetchNotes = async () => {
        const response = await fetch(URL);
        const data = await response.json();
        setNotes(data)
      };

      const handleComplete = async (item) => {
        try {
          const response = await fetch(`${URL}/${item._id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: item.text, completed: !item.completed }),
          });
          const updatedNote = await response.json();
          setNotes((prevNotes) =>
            prevNotes.map((note) => (note._id === updatedNote._id ? updatedNote : note))
          );
        } catch (err) {
          console.error(err.message);
        }
      };

      const handleDelete = async (item) => {
        try {
            await fetch(`${URL}/${item._id}`, {
              method: 'DELETE',
            });
            setNotes((prevNotes) => prevNotes.filter((note) => note._id !== item._id));
          } catch (err) {
            console.error(err.message);
          }
      }

    useEffect(() => {
        fetchNotes()
    }, [notes])
  return (
    <>
    <h1 className='mt-6 text-xl font-bold text-gray-700'>All Notes</h1>
    <ul>
        {notes.map((item, index) => {
            return (
                <div className={`${index % 2 == 0 ? 'bg-gray-100' : ''} flex items-center justify-between gap-x-4 px-2`}>
                    <div onClick={() => handleComplete(item)} className='flex items-center gap-x-4'>
                        <input type="checkbox" checked={item.completed} />
                        <li className={`${item.completed ? 'line-through text-gray-400' : ''} cursor-pointer`}>{item.text}</li>
                    </div>
                    <p onClick={() => handleDelete(item)} className='font-bold cursor-pointer hover:text-gray-400 duration-300 text-xl'>X</p>
                </div>
            )
        })}
    </ul>
    </>
  )
}

export default NoteCollection