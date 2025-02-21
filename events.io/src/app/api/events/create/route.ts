import { NextApiRequest, NextApiResponse } from 'next'
import { Event } from '../../../models'
import { authMiddleware } from '../../../middleware/auth' // Assume you have this

export default authMiddleware(
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST')
      return res.status(405).json({ message: 'Method not allowed' })

    try {
      const eventData = req.body
      const event = new Event({
        ...eventData,
        organizer: req.user._id // Assuming authMiddleware adds user to req
      })
      await event.save()
      res.status(201).json(event)
    } catch (error) {
      res.status(500).json({ message: 'Error creating event', error })
    }
  }
)
