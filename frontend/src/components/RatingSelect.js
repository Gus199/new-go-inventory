// import {useSatet, useContext, useEffect} from 'react'
// import DeviceContext from "../context/DeviceContext"
function RatingSelect({ select, selected }) {
  // const {  deviceEdit} = useContext(DeviceContext)
    // NOTE: We don't need local state here as it's a duplicate of parent state
    // also no real need for useEffect or context
    // useEffect(() => {
    //   select(deviceEdit.item.rating)
    // }, [deviceEdit])
  
    const handleChange = (e) => {
      select(+e.currentTarget.value)
    }
  
    // NOTE: simplified with iteration
    return (
      <ul className='rating'>
        {Array.from({ length: 10 }, (_, i) => (
          <li key={`rating-${i + 1}`}>
            <input
              type='radio'
              id={`num${i + 1}`}
              name='rating'
              value={i + 1}
              onChange={handleChange}
              checked={selected === i + 1}
            />
            <label htmlFor={`num${i + 1}`}>{i + 1}</label>
          </li>
        ))}
      </ul>
    )
  }
  
  export default RatingSelect