// src/app/login/page.tsx
'use client'
import {
  Button,
  Container,
  Paper,
  Stack,
  TextInput,
  PasswordInput,
  Select,
  Title
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useUserSignin } from '@/hooks/hooks'
import { notifications } from '@mantine/notifications'
import { countryCodes } from '@/utils/countryCodeList'

export default function LoginPage () {
  const form = useForm({
    initialValues: {
      email: '',
      phoneNumber: '',
      countryCode: '',
      password: ''
    },
    validate: {
      email: val => (val && !/^\S+@\S+$/.test(val) ? 'Invalid email' : null),
      phoneNumber: val =>
        val && !/^\d{7,15}$/.test(val)
          ? 'Phone number must be 7-15 digits'
          : null,
      countryCode: val =>
        val && form.values.phoneNumber && !val
          ? 'Country code is required with phone number'
          : null,
      password: val => (val.length < 1 ? 'Password is required' : null)
    }
  })

  const { mutate: signin, isPending } = useUserSignin({
    onSuccess: data => {
      notifications.show({
        title: 'Success',
        message: 'Logged in successfully!',
        color: 'green'
      })
      window.location.href = '/dashboard' // TODO: Replace with nextRoute
      
    },
    onError: error => {
      notifications.show({
        title: 'Error',
        message: error.message || 'Login failed',
        color: 'red'
      })
    }
  })

  const handleSubmit = (values: typeof form.values) => {
    signin({
      email: values.email || undefined,
      phoneNumber: values.phoneNumber || undefined,
      countryCode: values.phoneNumber ? values.countryCode : undefined,
      password: values.password
    })
  }

  return (
    <Container size={420} my={40}>
      <Title size='lg' ta='center'>
        Login to Events.IO
      </Title>
      <Paper withBorder shadow='md' p={30} mt={30} radius='md'>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              label='Email (optional)'
              placeholder='hello@mantine.dev'
              value={form.values.email}
              onChange={event =>
                form.setFieldValue('email', event.currentTarget.value)
              }
              error={form.errors.email}
              radius='md'
            />
            <Select
              label='Country Code (optional)'
              placeholder='Select country code'
              data={countryCodes}
              value={form.values.countryCode}
              onChange={value => form.setFieldValue('countryCode', value || '')}
              error={form.errors.countryCode}
              radius='md'
              searchable
            />
            <TextInput
              label='Phone Number (optional)'
              placeholder='1234567890'
              type='number'
              value={form.values.phoneNumber}
              onChange={event =>
                form.setFieldValue(
                  'phoneNumber',
                  Number(event.currentTarget.value)
                )
              }
              error={form.errors.phoneNumber}
              radius='md'
            />
            <PasswordInput
              required
              label='Password'
              placeholder='Your password'
              value={form.values.password}
              onChange={event =>
                form.setFieldValue('password', event.currentTarget.value)
              }
              error={form.errors.password}
              radius='md'
            />
          </Stack>
          <Button
            fullWidth
            type='submit'
            mt='xl'
            radius='xl'
            disabled={isPending}
          >
            {isPending ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </Paper>
    </Container>
  )
}
