import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState=(props)=>{
  const host =process.env.REACT_APP_BASE_URL
    const notesInitial=[]
      const [notes,setNotes]=useState(notesInitial);
      //Get All Notes
      const getNotes=async()=>{
        //API Call
        const response=await fetch(`${host}/api/notes/fetchallnotes`,{
          method:'GET',
          headers:{
            'content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
          },
        });
        const json=await response.json()
        //console.log(json)
        setNotes(json)


      }

    //Add a Note
    const addNote=async (title,description,tag)=>{
      //TODO Api call
      const response=await fetch(`${host}/api/notes/addnote`,{
        method:'POST',
        headers:{
          'content-Type':'application/json',
          'auth-token':localStorage.getItem('token')
        },
        body:JSON.stringify({title,description,tag})
      });
      const note=await response.json();
      setNotes(notes.concat(note))
      

    }
    //Delete a Note
    const deleteNote=async(id)=>{
      //TODO Api call
      const response=await fetch(`${host}/api/notes/deletenote/${id}`,{
      method:'DELETE',
        headers:{
          'content-Type':'application/json',
          'auth-token':localStorage.getItem('token')
        },
      });
      const json= await response.json();
      //console.log(json)

      //console.log("Deleting the note with id");
      const newNotes=notes.filter((note)=>{return note._id!==id})
      setNotes(newNotes)

    }


    //Edit a Note
    const editNote=async (id,title,description,tag)=>{
      //API Call
      const response=await fetch(`${host}/api/notes/updatenote/${id}`,{
        method:'PUT',
        headers:{
          'content-Type':'application/json',
          'auth-token':localStorage.getItem('token')
        },
        body:JSON.stringify({title,description,tag})
      });
      const json= await response.json();
      //console.log(json);
      let newNotes=JSON.parse(JSON.stringify(notes))
      //Logic to edit in client
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if(element._id===id){
          newNotes[index].title=title;
          newNotes[index].description=description;
          newNotes[index].tag=tag;
          break;
        }
      }
      setNotes(newNotes)

    }
    return (
        <noteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;