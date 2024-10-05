import React,{useState} from 'react'

const AddTodo=({onAddTodo})=> {
    const[txt,settext]=useState("");
    function handle(e){
      e.preventDefault();
      if (txt.trim()===""){
        return;
      }
        onAddTodo(txt);
        settext("");

    }

  return (
    <form className='s'onClick={handle}>
      <input className='h' type='text' value={txt} placeholder='Write Reviews' required onChange={(e)=>settext(e.target.value)}/>
      <button className='com' type='submit'>Comment</button>
    </form>
  )
}


export default AddTodo