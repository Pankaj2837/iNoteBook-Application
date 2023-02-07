import React,{useContext, useEffect} from 'react'
import NoteContext from '../context/notes/NoteContext'
const About=()=> {
  const a = useContext(NoteContext)
  useEffect(() =>{
    a.update();
  },[])
  return (
    <div>
      this about us {a.state.name} who is in class {a.state.class}
    </div>
  )
}

export default About;
