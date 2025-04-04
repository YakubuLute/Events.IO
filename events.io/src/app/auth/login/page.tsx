'use client'
import {
  Button,
  Container,
  Paper,
  Stack,
  TextInput,
  PasswordInput,
  Select,
  Title,
  Group
} from '@mantine/core'
import { useForm, UseFormReturnType } from '@mantine/form'
import { useUserSignin } from '@/hooks/hooks'
import { notifications } from '@mantine/notifications'
import { countryCodes } from '@/utils/countryCodeList'
import { LoginFormValues } from '@/interface/interface'

export default function LoginPage () {
  const form: UseFormReturnType<LoginFormValues> = useForm<LoginFormValues>({
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
    onSuccess: () => {
      notifications.show({
        title: 'Success',
        message: 'Logged in successfully!',
        color: 'green'
      })
      // Redirect: window.location.href = '/dashboard';
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
              placeholder='name@domain.com'
              value={form.values.email}
              onChange={event =>
                form.setFieldValue('email', event.currentTarget.value)
              }
              error={form.errors.email}
              radius='md'
            />
            <Group justify='space-between' align='center'>
              <Select
                flex={1}
                label='Country Code'
                placeholder='Select country code'
                data={countryCodes}
                value={form.values.countryCode}
                onChange={value =>
                  form.setFieldValue('countryCode', value || '')
                }
                error={form.errors.countryCode}
                radius='md'
                searchable
              />
              <TextInput
                label='Phone Number (optional)'
                placeholder='1234567890'
                value={form.values.phoneNumber}
                onChange={event =>
                  form.setFieldValue('phoneNumber', event.currentTarget.value)
                }
                error={form.errors.phoneNumber}
                radius='md'
              />
            </Group>
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
