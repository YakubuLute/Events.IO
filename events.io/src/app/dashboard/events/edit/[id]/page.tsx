/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'
import { useState } from 'react'
import { useForm } from '@mantine/form'
import { TextInput, Textarea, Button, Group, Paper, Title, Select, MultiSelect, NumberInput, Divider, Grid, FileInput, Text, Stepper } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import { IconUpload } from '@tabler/icons-react'
import { useCreateEvent } from '@/hooks/hooks'
import { showNotification } from '@/components/shared/notification/mantine-notification'
import {  IEventPayload } from '@/interface/interface'

export default function CreateEventPage() {
  const [active, setActive] = useState(0)
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current))
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current))
  
  const form = useForm({
    initialValues: {
      title: '',
      description: '',
      category: [],
      tags: [],
      startDate: '',
      endDate: '',
      timezone: 'UTC',
      venueName: '',
      venueAddress: '',
      venueCity: '',
      venueCountry: '',
      venuePostalCode: '',
      capacity: 100,
      visibility: 'public',
      ticketTypes: [{ name: 'General Admission', price: 0, quantity: 100, description: 'Standard entry ticket' }],
      bannerImage: null,
      images: [],
    },
    validate: {
      title: (value) => (value.length < 3 ? 'Title must have at least 3 characters' : null),
      description: (value) => (value.length < 10 ? 'Description must have at least 10 characters' : null),
      startDate: (value) => (value === null ? 'Start date is required' : null),
      endDate: (value, values) => {
        if (value === null) return 'End date is required'
        if (values.startDate && value < values.startDate) return 'End date must be after start date'
        return null
      },
      venueName: (value) => (value.length < 3 ? 'Venue name is required' : null),
      venueCity: (value) => (value.length < 2 ? 'City is required' : null),
      venueCountry: (value) => (value.length < 2 ? 'Country is required' : null),
    },
  })
  
  const { mutate: createEvent, isPending } = useCreateEvent({
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: 'Event created successfully!'
      })
      // Redirect to events page
    },
    onError: (error) => {
      showNotification({
        type: 'error',
        message: error.message || 'Failed to create event'
      })
    }
  })
  
  const handleSubmit = (values: IEventPayload) => {
    // Transform form values to event data structure
    const eventData = {
      title: values.title,
      description: values.description,
      category: values.category,
      tags: values.tags,
      schedule: {
        startDate: values.startDate ? new Date(values.startDate) : new Date(),
        endDate: values.endDate ? new Date(values.endDate) : new Date(),
        timezone: values.timezone,
      },
      venue: {
        name: values.venueName,
        address: values.venueAddress,
        city: values.venueCity,
        country: values.venueCountry,
        postalCode: values.venuePostalCode,
        capacity: values.capacity,
      },
      visibility: values.visibility,
      ticketTypes: values.ticketTypes,
      // Handle image uploads
    }
    
    createEvent(eventData as any)
  }
  
  return (
    <div>
      <Title order={2} mb="xl">Create New Event</Title>
      
      <Stepper active={active} onStepClick={setActive} mb="xl">
        <Stepper.Step label="Basic Info" description="Event details">
          <Paper p="xl" radius="md" withBorder>
            <Title order={3} mb="md">Event Details</Title>
            
            <TextInput
              label="Event Title"
              placeholder="Enter a catchy title for your event"
              required
              {...form.getInputProps('title')}
              mb="md"
            />
            
            <Textarea
              label="Event Description"
              placeholder="Describe your event"
              minRows={4}
              required
              {...form.getInputProps('description')}
              mb="md"
            />
            
            <Grid>
              <Grid.Col span={6}>
                <MultiSelect
                  label="Category"
                  placeholder="Select categories"
                  data={[
                    { value: 'conference', label: 'Conference' },
                    { value: 'workshop', label: 'Workshop' },
                    { value: 'concert', label: 'Concert' },
                    { value: 'exhibition', label: 'Exhibition' },
                    { value: 'networking', label: 'Networking' },
                  ]}
                  {...form.getInputProps('category')}
                  mb="md"
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <MultiSelect
                  label="Tags"
                  placeholder="Add tags"
                  data={[
                    { value: 'tech', label: 'Technology' },
                    { value: 'business', label: 'Business' },
                    { value: 'music', label: 'Music' },
                    { value: 'art', label: 'Art' },
                    { value: 'food', label: 'Food' },
                  ]}
                  searchable
                  creatable
                  getCreateLabel={(query: string) => `+ Create ${query}`}
                  {...form.getInputProps('tags')}
                  mb="md"
                />
              </Grid.Col>
            </Grid>
            
            <Select
              label="Visibility"
              placeholder="Select visibility"
              data={[
                { value: 'public', label: 'Public - Anyone can find this event' },
                { value: 'private', label: 'Private - Only people with the link can access' },
                { value: 'unlisted', label: 'Unlisted - Hidden from search results' },
              ]}
              {...form.getInputProps('visibility')}
              mb="md"
            />
            
            <Group justify="flex-end" mt="xl">
              <Button onClick={nextStep}>Next Step</Button>
            </Group>
          </Paper>
        </Stepper.Step>
        
        <Stepper.Step label="Date & Venue" description="When and where">
          <Paper p="xl" radius="md" withBorder>
            <Title order={3} mb="md">Date & Venue</Title>
            
            <Grid>
              <Grid.Col span={6}>
                <div style={{ marginBottom: '1rem' }}>
                  <Text fw={500} mb={5}>Start Date <span style={{ color: 'red' }}>*</span></Text>
                  <DatePicker
                    value={form.values.startDate ? new Date(form.values.startDate) : null}
                    onChange={(date) => {
                      form.setFieldValue('startDate', date ? date.toISOString() : '')
                    }}
                 
                    allowDeselect={false}
                  
                  />
                </div>

              </Grid.Col>
              <Grid.Col span={6}>
                <div style={{ marginBottom: '1rem' }}>
                  <Text fw={500} mb={5}>End Date <span style={{ color: 'red' }}>*</span></Text>
                  <DatePicker
                  
                    value={form.values.endDate ? new Date(form.values.endDate) : null}
                    onChange={(date) => {
                      form.setFieldValue('endDate', date ? date.toISOString() : '')
                    }}
                    minDate={form.values.startDate ? new Date(form.values.startDate) : undefined}
                 
                    allowDeselect={false}
                    
                  />
                </div>
              </Grid.Col>
            </Grid>
            
            <Select
              label="Timezone"
              placeholder="Select timezone"
              data={[
                { value: 'UTC', label: 'UTC' },
                { value: 'America/New_York', label: 'Eastern Time (ET)' },
                { value: 'America/Chicago', label: 'Central Time (CT)' },
                { value: 'America/Denver', label: 'Mountain Time (MT)' },
                { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
              ]}
              {...form.getInputProps('timezone')}
              mb="md"
            />
            
            <Divider my="lg" label="Venue Information" labelPosition="center" />
            
            <TextInput
              label="Venue Name"
              placeholder="Enter venue name"
              required
              {...form.getInputProps('venueName')}
              mb="md"
            />
            
            <Textarea
              label="Address"
              placeholder="Enter venue address"
              {...form.getInputProps('venueAddress')}
              mb="md"
            />
            
            <Grid>
              <Grid.Col span={4}>
                <TextInput
                  label="City"
                  placeholder="City"
                  required
                  {...form.getInputProps('venueCity')}
                  mb="md"
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <TextInput
                  label="Country"
                  placeholder="Country"
                  required
                  {...form.getInputProps('venueCountry')}
                  mb="md"
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <TextInput
                  label="Postal Code"
                  placeholder="Postal code"
                  {...form.getInputProps('venuePostalCode')}
                  mb="md"
                />
              </Grid.Col>
            </Grid>
            
            <NumberInput
              label="Venue Capacity"
              placeholder="Maximum number of attendees"
              min={1}
              {...form.getInputProps('capacity')}
              mb="md"
            />
            
            <Group justify="flex-end" mt="xl">
              <Button variant="default" onClick={prevStep}>Back</Button>
              <Button onClick={nextStep}>Next Step</Button>
            </Group>
          </Paper>
        </Stepper.Step>
        
        <Stepper.Step label="Tickets" description="Pricing and availability">
          <Paper p="xl" radius="md" withBorder>
            <Title order={3} mb="md">Ticket Information</Title>
            
            {/* Ticket type form fields would go here */}
            <Text>Ticket configuration would go here</Text>
            
            <Group justify="flex-end" mt="xl">
              <Button variant="default" onClick={prevStep}>Back</Button>
              <Button onClick={nextStep}>Next Step</Button>
            </Group>
          </Paper>
        </Stepper.Step>
        
        <Stepper.Step label="Media" description="Images and videos">
          <Paper p="xl" radius="md" withBorder>
            <Title order={3} mb="md">Event Media</Title>
            
            <FileInput
              label="Banner Image"
              placeholder="Upload banner image"
              accept="image/png,image/jpeg"
              leftSection={<IconUpload size={14} />}
              {...form.getInputProps('bannerImage')}
              mb="md"
            />
            
            <FileInput
              label="Additional Images"
              placeholder="Upload event images"
              accept="image/png,image/jpeg"
              multiple
              leftSection={<IconUpload size={14} />}
              {...form.getInputProps('images')}
              mb="md"
            />
            
            <Group justify="flex-end" mt="xl">
              <Button variant="default" onClick={prevStep}>Back</Button>
              <Button color="green" onClick={() => handleSubmit(form.values)} loading={isPending}>
                Create
              </Button>
            </Group>
          </Paper>
        </Stepper.Step>
      </Stepper>
    </div>
  )
}