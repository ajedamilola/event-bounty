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
      {JSON.stringify(attendees)}
    </div>
  )
}

export default Attendees