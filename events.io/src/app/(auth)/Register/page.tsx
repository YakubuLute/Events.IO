'use client'
import {
  Anchor,
  Button,
  Checkbox,
  Group,
  Paper,
  Container,
  PasswordInput,
  Stack,
  Title,
  TextInput
} from '@mantine/core'
import { useForm } from '@mantine/form'
import classes from './Register.module.scss'
import { useUserSignup } from '@/hooks/eventHooks'
import { notifications } from '@mantine/notifications'

export default function RegistrationPage () {
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      phone: '',
      password: '',
      terms: true
    },

    validate: {
      name: val => (val.length < 1 ? 'Name is required' : null),
      email: val => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      phone: val =>
        /^\d{7,15}$/.test(val) ? null : 'Invalid phone number (7-15 digits)',
      password: val =>
        val.length <= 6 ? 'Password must be at least 6 characters' : null,
      terms: val =>
        val === false ? 'You must accept terms and conditions' : null
    }
  })

  const { mutate: signup, isPending } = useUserSignup({
    onSuccess: data => {
      notifications.show({
        title: 'Success',
        message: `Account created for ${data.user.name}!`,
        color: 'green'
      })
      form.reset() // Clear form on success
      // Optionally redirect: window.location.href = '/dashboard';
    },
    onError: error => {
      notifications.show({
        title: 'Error',
        message: error.message || 'Failed to create account',
        color: 'red'
      })
    }
  })

  const handleSubmit = (values: typeof form.values) => {
    signup({
      name: values.name,
      email: values.email,
      phone: values.phone,
      password: values.password,
      role: 'user' // Default role; adjust if needed
    })
  }

  return (
    <Container size={420} my={40}>
      <Title size='lg' ta='center' className={`${classes.title} capitalize`}>
        Start Selling Tickets with Events.IO
      </Title>
      <Paper withBorder shadow='md' p={30} mt={30} radius='md'>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              label='Name'
              placeholder='Your name'
              value={form.values.name}
              onChange={event =>
                form.setFieldValue('name', event.currentTarget.value)
              }
              error={form.errors.name}
              radius='md'
              required
            />

            <TextInput
              required
              label='Email'
              placeholder='hello@mantine.dev'
              value={form.values.email}
              onChange={event =>
                form.setFieldValue('email', event.currentTarget.value)
              }
              error={form.errors.email}
              radius='md'
            />

            <TextInput
              required
              label='Phone'
              placeholder='1234567890'
              value={form.values.phone}
              onChange={event =>
                form.setFieldValue('phone', event.currentTarget.value)
              }
              error={form.errors.phone}
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

            <Checkbox
              label='I accept terms and conditions'
              checked={form.values.terms}
              onChange={event =>
                form.setFieldValue('terms', event.currentTarget.checked)
              }
              error={form.errors.terms}
            />
          </Stack>

          <Group justify='space-between' mt='xl'>
            <Anchor
              component='button'
              type='button'
              c='dimmed'
              onClick={() => (window.location.href = '/login')} // Redirect to login
              size='xs'
            >
              Already have an account? Login
            </Anchor>
          </Group>
          <Button
            fullWidth
            type='submit'
            mt={10}
            radius='xl'
            disabled={isPending}
          >
            {isPending ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>
      </Paper>
    </Container>
  )
}
