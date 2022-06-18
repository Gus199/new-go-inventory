import spinner from '../assets/spinner.gif'

function Spinner() {
  return (<>
    <img
      src={spinner}
      alt='Loading...'
      style={{ width: '100px', height:'100px', margin: 'auto', display: 'block' }}
    />
    <h2>Loading...</h2>
    </>
  )
}

export default Spinner
