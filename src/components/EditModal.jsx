import React, { useEffect } from 'react'

const EditModal = ({item, text, setText, initialState, sendEdit}) => {
    

    useEffect(() => {
        setText(initialState)
    }, [initialState, text, setText])
  return (
    <div className='w-screen h-screen bg-gray-400 bg-opacity-80 absolute top-0 left-0 flex justify-center items-center'>
        <input 
            type="text"
            className='py-2 px-4 rounded-tl-md rounded-bl-md'
            value={text} 
            onChange={(e) => setText(e.target.value)} 
            />
        <input 
            type="submit"
            className='bg-indigo-500 py-2 px-4 text-white rounded-tr-md rounded-br-md font-bold'
            value="UPDATE" 
            onClick={sendEdit} 
            />
    </div>
  )
}

export default EditModal