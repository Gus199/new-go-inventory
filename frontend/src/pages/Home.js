import {Link} from 'react-router-dom'
import {FaQuestionCircle,  FaTicketAlt} from 'react-icons/fa'




function Home() {
  return (
    <>
    {/* <Test /> */}
    <section className='heading'>
        <h1>What do you need help with</h1>
        <p>Please choose from an option below</p>
      
    </section>
  
    <Link to='/new-device' className='btn btn-reverse btn-block'>
   <FaQuestionCircle /> Create new Item
    </Link>
    <Link to='/devices' className='btn  btn-block'>
   <FaTicketAlt /> View my Items
    </Link>
    <Link to='/all' className='btn  btn-block'>
   <FaTicketAlt /> View All Devices
    </Link>
  
    </>

  )
}

export default Home