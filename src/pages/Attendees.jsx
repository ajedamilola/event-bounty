import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { listAttendees } from '../utils/etherum'

function Attendees() {
  const [attendees, setAttendees] = useState([])
  const { id } = useParams()

  async function fetchData() {
    const _data = await listAttendees(id)
    setAttendees(_data)
  }

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div>
      <div className="font-bold text-2xl mb-3">Event Attendees</div>
      {attendees.map(a => {
        return <div key={a.id} className='py-2 border-b' >{a.name}</div>
      })}
    </div>
  )
}

export default Attendees