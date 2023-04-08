import NoteCollection from "./components/NoteCollection";
import NoteForm from "./components/NoteForm";


function App() {
  return (
    <div className="container mx-auto my-12 bg-gray-100 px-6 py-4 rounded-lg">
      <div className="my-6">
        <h2 className=" text-3xl text-gray-600 font-bold">Note-taking Application</h2>
        <p className="text-gray-500 text-xs italic">This application is built using MERN-stack (React, MongoDB, Express, NodeJS), just to show how CRUD is done with this stack. All the operations of create, read, update, and delete have been built both on the server and on the frontend</p>
      </div>
      <NoteForm />
      <NoteCollection />
    </div>
  );
}

export default App;
