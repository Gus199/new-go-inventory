import { Link } from "react-router-dom";
// import {FaQuestionCircle,  FaTicketAlt} from 'react-icons/fa'

function Home() {
  return (
    <>
      <section className="heading">
        {/* <h1>What do you need help with</h1> */}
        <p>Please choose from an option below</p>
      </section>
      <div className="main">
        <Link to="/new-device" className="btn btn-reverse btn-block">
          Create new Item
        </Link>
        <Link to="/devices" className="btn  btn-block">
          View my Items
        </Link>
        <Link to="/all" className="btn  btn-block">
          View All Devices
        </Link>
        <Link to="/test" className="btn  btn-block">
          View closed Cases
        </Link>
      </div>
    </>
  );
}

export default Home;
