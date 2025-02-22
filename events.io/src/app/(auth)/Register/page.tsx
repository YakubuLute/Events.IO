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
  TextInput,
  Select
} from '@mantine/core'
import { useForm } from '@mantine/form'
import classes from './Register.module.scss'
import { useUserSignup } from '@/hooks/hooks'
import { notifications } from '@mantine/notifications'
import { countryCodes } from '@/utils/countryCodeList'

export default function RegistrationPage () {
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      phoneNumber: '',
      countryCode: '+233', // Default to Ghana
      password: '',
      terms: true
    },

    validate: {
      name: val => (val.length < 1 ? 'Name is required' : null),
      email: val => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      phoneNumber: val =>
        /^\d{7,15}$/.test(val) ? null : 'Phone number must be 7-15 digits',
      countryCode: val => (val ? null : 'Country code is required'),
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
      form.reset()
    window.location.href = '/login';
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
      phoneNumber: Number(values.phoneNumber),
      countryCode: values.countryCode,
      password: values.password,
      role: 'user'
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

            <Select
              required
              label='Country Code'
              placeholder='Select country code'
              data={countryCodes}
              value={form.values.countryCode}
              onChange={value =>
                form.setFieldValue('countryCode', value || '+1')
              }
              error={form.errors.countryCode}
              radius='md'
              searchable
            />

            <TextInput
              required
              label='Phone Number'
              placeholder='1234567890'
              value={form.values.phoneNumber}
              onChange={event =>
                form.setFieldValue('phoneNumber', event.currentTarget.value)
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
              onClick={() => (window.location.href = '/login')}
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
