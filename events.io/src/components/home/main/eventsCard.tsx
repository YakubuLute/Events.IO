'use client'

import { FC } from 'react'
import { IEvent } from "../../../interface/interface"

export const EventsCard: FC<{ events: IEvent[] }> = ({ events }) => {
  return (
    <div>
      <h1>EventsCard</h1>
      {events.length > 0 ? (
        <div>
          {events.map((event) => (
            <div key={event._id ? event._id.toString() : Math.random().toString()}>
              <h2>{event.title}</h2>
              <p>{event.description}</p>
              <p>{event.category}</p>
              <p>{event.tags}</p>
              <p>{event.status}</p>
              <p>{event.visibility}</p>
              <p>{event.capacity}</p>
              <p>{event.attendeeCount}</p>
              <p>{event.totalRevenue}</p>
              <p>{event.images}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No events available</p>
      )}
    </div>
  )
}