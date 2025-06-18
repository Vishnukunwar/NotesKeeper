import React, { useEffect, useState } from 'react';
import MainScreen from '../../components/MainScreen';
import { Badge, Button, Card, Accordion } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import notes from './notes';
import axios from 'axios';


const MyNotes = () => {

  function deleteHandler (id){
    if(window.confirm("Are you sure?")){
    }
  }

  const [notes, setNotes] = useState([])

  const fetchNotes = async () => {
    const {data} = await axios.get('/notes');
    setNotes(data);
  }

  useEffect(()=>{
    fetchNotes();
  },[])

  return (
    <MainScreen title="Welcome back Vishnu Kunwar...">
      <Link to="/createnote"><Button style={{ marginLeft:10, marginBottom:6}} size='lg'>Create New Note</Button></Link>  
        {
          notes.map((note)=>(
            <Accordion key={note._id}>
              <Accordion.Item eventKey={note._id} >
                <Card style={{ margin:10 }}>
                  <Card.Header style={{ display:"flex" }}>
                    <span style={{ 
                        color:'black',
                        textDecoration:'none',
                        flex:1,
                        cursor:'pointer',
                        alignSelf:'center',
                        fontSize:18
                      }}><Accordion.Header as={Card} variant="link">{note.title}</Accordion.Header></span>
                    <div>
                      <Button href={`/note/${note._id}`}>Edit</Button>
                      <Button variant='danger' className='mx-2' onClick={()=>deleteHandler(note._id)}>Delete</Button>
                    </div>
                  </Card.Header>
                  <Accordion.Body>
                    <Card.Body>
                      <h4>
                        <Badge bg="success">Category - {note.category}</Badge>
                      </h4>
                      <blockquote className="blockquote mb-0">
                        <p>{note.content}</p>
                        <footer className="blockquote-footer">Created on - Date</footer>
                      </blockquote>
                    </Card.Body>
                  </Accordion.Body>
                </Card>
              </Accordion.Item>
            </Accordion>  
          ))
        }
    </MainScreen>
  )
};

export default MyNotes;