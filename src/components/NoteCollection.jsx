import React, { useEffect, useState } from 'react'
import EditModal from './EditModal';
import EditIcon from './EditIcon';

const URL = "https://note-node-crud.onrender.com/api/notes"

const NoteCollection = () => {
    const [notes, setNotes] = useState([])
    const [selectedItem, setSelectedItem] = useState({})
    const [showEdit, setShowEdit] = useState(false)
    const [text, setText] = useState('')

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

    const handleEdit = (item) => {
      setShowEdit(true)
      setSelectedItem(item)
      setText(selectedItem.text)
    }

    const sendEdit = async(item) => {
      try {
        const response = await fetch(`${URL}/${item._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: text }),
        });
        const updatedNote = await response.json();
        setNotes((prevNotes) =>
          prevNotes.map((note) => (note._id === updatedNote._id ? updatedNote : note))
        );
      } catch (err) {
        console.error(err.message);
      }
      setShowEdit(false)
    }
    const handleClose = () => {
      setShowEdit(false)
    }
  return (
    <>
    <h1 className='mt-6 text-xl font-bold text-gray-600'>All Notes</h1>
    <ul>
        {notes.map((item, index) => {
            return (
                <div key={item.id} className={`${index % 2 === 0 ? 'bg-gray-200' : ''} flex items-center justify-between gap-x-4 px-4 p-2 rounded-lg`}>
                    <div onClick={() => handleComplete(item)} className='flex items-center gap-x-4'>
                        <input type="checkbox" checked={item.completed} />
                        <li className={`${item.completed ? 'line-through text-gray-400' : ''} cursor-pointer`}>{item.text}</li>
                    </div>
                    <div className='flex gap-x-4 items-center'>
                      <EditIcon 
                        handleClick={() => handleEdit(item)}  
                      />
                      <p onClick={() => handleDelete(item)} className='font-bold cursor-pointer hover:text-gray-400 duration-300 text-xl'>X</p>
                    </div>
                </div>
            )
          })}
          {showEdit ? <EditModal handleClose={handleClose} item={selectedItem} initialState={selectedItem.text} sendEdit={() => sendEdit(selectedItem)} text={text} setText={setText} /> : ''}
    </ul>
    </>
  )
}

export default NoteCollection