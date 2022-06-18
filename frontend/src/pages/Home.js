import {Link} from 'react-router-dom'
import {FaQuestionCircle,  FaTicketAlt} from 'react-icons/fa'

function Home() {
  return (
    <>
    <section className='heading'>
        <h1>What do you need help with</h1>
        <p>Please choose from an option below</p>
    </section>
  
    <Link to='/new-item' className='btn btn-reverse btn-block'>
   <FaQuestionCircle /> Create new Item
    </Link>
    <Link to='/items' className='btn  btn-block'>
   <FaTicketAlt /> View my Items
    </Link>
  
    </>

  )
}

export default Home