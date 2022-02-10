import { useState } from "react"
import DatePicker from "react-multi-date-picker";
  
export default function Calender() {
  const today = new Date()
  const tomorrow = new Date()

 
  const [values, setValues] = useState([today, tomorrow])

  return (
      < div className="date" style={{marginTop:'15px', marginLeft:'40px'}}>
    <DatePicker 
      multiple
      value={values} 
      onChange={setValues}
    />
    </div>
  )
}