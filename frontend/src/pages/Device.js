import { useEffect, useState } from 'react'
import {FaPlus} from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import {getDevice, reset, closeDevice} from '../features/device/deviceSlice'
import { getNotes, reset as notesReset,createNote } from '../features/notes/noteSlice'
import BackButton from '../components/BackButton'
import Spinner from '../components/shared/Spinner'
import {useParams, useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'
import Modal from 'react-modal'
import NoteItem from '../components/NoteItem'


const customStyles = {
  content: {
    width: '600px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    position: 'relative',
  },
}
Modal.setAppElement('#root')

function Device() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [noteText, setNoteText] = useState('')
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth);
    const {device, isLaoding,isError, message } = useSelector((state) => state.devices)
    
    const {notes, isLaoding: notesIsLoading } = useSelector((state) => state.notes)

    const params = useParams()
    const dispatch = useDispatch()
    const {deviceId} = useParams()

    useEffect(() => {
        if(isError) {
            toast.error(message)
        }

        dispatch(getDevice(deviceId))
        dispatch(getNotes(deviceId))
        //  eslint-disble-next-line
    }, [isError, message, deviceId])

     // Close Case
  const onDeviceClose = () => {
    dispatch(closeDevice(deviceId))
    toast.success('Case Closed')
    navigate('/devices')
  }
// Open/close modal
const openModal = () => setModalIsOpen(true)
const closeModal = () => setModalIsOpen(false)

// Create note submit
const onNoteSubmit = (e) => {
  e.preventDefault()
  dispatch(createNote({ noteText, deviceId }))
  closeModal()
}

    if(isLaoding || notesIsLoading) {
        return <Spinner />
    }
    if(isError) {
        return<h3>Something when Wrong</h3>
    }
   
  return (
    <div className='ticket-page'>
          <header className='ticket-header'>
        <BackButton url='/devices' />
        <h2>
          Device ID: {device._id}
          <span className={`status status-${device.status}`}>
            {device.status}
          </span>
        </h2>
        <h3>Created by: {user.name}</h3>
        <h3>
          Date Submitted: {new Date(device.createdAt).toLocaleString('en-US')}
        </h3>
        <h3>Product: {device.product}</h3>
        <h3>Product: {device.condition}</h3>
        <hr />
        <div className='ticket-desc'>
          <h3>Description of Issue</h3>
          <p>{device.description}</p>
        </div>
        <h2>Notes</h2>
      </header>
      {device.status !== 'closed' && (
        <button onClick={openModal} className='btn'>
          <FaPlus /> Add Note
        </button>
      )}


<Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Add Note'
      >
        <h2>Add Note</h2>
        <button className='btn-close' onClick={closeModal}>
          X
        </button>
        <form onSubmit={onNoteSubmit}>
          <div className='form-group'>
            <textarea
              name='noteText'
              id='noteText'
              className='form-control'
              placeholder='Note text'
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            ></textarea>
          </div>
          <div className='form-group'>
            <button className='btn' type='submit'>
              Submit
            </button>
          </div>
        </form>
      </Modal>

      {notes.map((note) =>(
        <NoteItem key={note._id} note={note}/>
      ))}
      {device.status !== 'closed' && (
        <button onClick={onDeviceClose} className='btn btn-block btn-danger'>
          Close Case
        </button>
      )}
    </div>
  )
}

export default Device