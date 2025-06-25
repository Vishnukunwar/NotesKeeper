import React, { useEffect } from 'react';
import MainScreen from '../../components/MainScreen';
import { Badge, Button, Card, Accordion } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNoteAction, listNotes } from '../../actions/noteAction';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';


const MyNotes = ({ search }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const noteList = useSelector((state)=>state.noteList);
  const { notes } = noteList;

  const userLogin = useSelector((state)=>state.userLogin);
  const { userInfo } = userLogin;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate} = noteCreate;

    const noteUpdate = useSelector((state) => state.noteUpdate);
    const { success: successUpdate } = noteUpdate;

    const noteDelete = useSelector((state)=> state.noteDelete);
    const {loading: loadingDelete, error: errorDelete, success: successDelete} = noteDelete;

  function deleteHandler (id){
    if(window.confirm("Are you sure?")){
      dispatch(deleteNoteAction(id))
    }
    navigate("/mynotes");
  }

  useEffect(()=>{
    dispatch(listNotes());
    if(!userInfo){
      navigate('/');
    }
  },[dispatch, navigate, userInfo, successUpdate, successCreate,successDelete ])

  return (
    <MainScreen title= {`Welcome back ${userInfo.name}`}>
      <Link to="/createnote"><Button style={{ marginLeft:10, marginBottom:6}} size='lg'>Create New Note</Button></Link>  
      { errorDelete &&  <ErrorMessage variant='danger'>{errorDelete}</ErrorMessage>}
      { loadingDelete &&  <Loading/>}
      { notes?.reverse().filter(filteredNote => (
        filteredNote.title.toLowerCase().includes(search.toLowerCase())
      )).map((note)=>(
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
                      <footer className="blockquote-footer">Created on{" "} <cite title='Source Title'>{note.createdAt.substring(0,10)}</cite></footer>
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