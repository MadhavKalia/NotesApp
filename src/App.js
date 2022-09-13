import {useState, useEffect} from 'react';
import {nanoid} from 'nanoid';
import NotesList from './components/NotesList';
import SearchBar from './components/SearchBar'
import Header from './components/Header';

const App = () => {
  const [notes, setNotes] = useState([
    {
      id: nanoid(),
      text: "first note ", 
      date: "12/09/2022",
    },
    {
      id: nanoid(),
      text: "second note ", 
      date: "12/09/2022",
    },
    {
      id: nanoid(),
      text: "third note ", 
      date: "12/09/2022",
    },
    {
      id: nanoid(),
      text: "new note ", 
      date: "12/10/2022",
    },
  ]);

  const [searchText, setSearchText] = useState ('');

  const [darkMode, setDarkMode] = useState(false);

  useEffect(()=>{
    localStorage.setItem("notes-app-data", JSON.stringify(notes));
    }, [notes]);
  
  useEffect(()=> {
      const savedNotes = JSON.parse(localStorage.getItem("notes-app-data"));
      if (savedNotes){
        setNotes(savedNotes);
      }
  }, []);

  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString(),
    }
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  };

  const deleteNote =  (id) => {
    const newNotes = notes.filter((note)=> note.id !==id);
    setNotes(newNotes);
  }

  return (
      <div  className = {`${darkMode && 'dark-mode'}`} >
        <div className = 'container'>
          <Header handleToggleDark={setDarkMode}/>
          <SearchBar handleSearchNote = {setSearchText}
          />
          <NotesList 
            notes={notes.filter((note)=> note.text.toLowerCase().includes(searchText))} 
            handleAddNote = {addNote}
            handleDeleteNote = {deleteNote}
          />
      </div>> 


      </div>

  );
};

export default App;