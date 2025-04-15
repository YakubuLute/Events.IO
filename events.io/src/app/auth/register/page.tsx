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
  Select,
  Text,
  Box
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useUserSignup } from '@/hooks/hooks'
import { showNotification } from '@/components/shared/notification/mantine-notification'
import { countryCodes } from '@/utils/countryCodeList'
import { RegisterFormValues } from '@/interface/interface'
import { IconAt, IconLock, IconPhone, IconWorld, IconUser } from '@tabler/icons-react'

// Add global styles for the hover effect
const hoverPaperStyles = `
  .hover-paper {
    transition: transform 200ms ease, box-shadow 200ms ease;
  }
  .hover-paper {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.06);
  }
`;

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
      showNotification({
        type: 'success',
        message: `Account created for ${data.user.name}!`
      })
      form.reset()
      window.location.href = '/auth/login'
    },
    onError: error => {
      console.log('Error registering account:', error)
      showNotification({
        type: 'error',
        message: error.message || 'Failed to create account'
      })
    }
  })

  const handleSubmit = (values: RegisterFormValues) => {
    signup({
      name: values.name,
      email: values.email,
      phoneNumber: values.phoneNumber,
      countryCode: values.countryCode,
      password: values.password,
      role: 'user'
    })
  }

  return (
    <Container size={460} my={30}>
      <style>{hoverPaperStyles}</style>
      <Box mb={10} ta="center">
        <Title 
          order={1} 
          fw={900} 
          c="blue.7" 
          size="h2"
          style={{
            fontFamily: `'Poppins', sans-serif`,
            letterSpacing: '-0.5px'
          }}
        >
          Events.IO
        </Title>
        <Text c="dimmed" size="sm" mt={5}>
          Create your account to start selling tickets and creating Events
        </Text>
      </Box>

      <Paper 
        withBorder 
        shadow="lg" 
        p={35} 
        radius="md" 
        bg="white"
        style={{
          borderTop: `4px solid #339af0`,
          transition: 'transform 200ms ease, box-shadow 200ms ease'
        }}
        className="hover-paper"
      >
        <Title order={3} ta="center" mb={5} fw={600}>
          Create Account
        </Title>
        
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack style={{ gap: '16px' }}>
            <TextInput
              label="Name"
              placeholder="Your full name"
              value={form.values.name}
              onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
              error={form.errors.name}
              radius="md"
              size="md"
              leftSection={<IconUser size={16} stroke={1.5} />}
              styles={(theme) => ({
                input: {
                  '&:focusWithin': {
                    borderColor: theme.colors.blue[5]
                  }
                }
              })}
              required
            />

            <TextInput
              required
              label="Email"
              placeholder="your.email@example.com"
              value={form.values.email}
              onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
              error={form.errors.email}
              radius="md"
              size="md"
              leftSection={<IconAt size={16} stroke={1.5} />}
              styles={(theme) => ({
                input: {
                  '&:focusWithin': {
                    borderColor: theme.colors.blue[5]
                  }
                }
              })}
            />

            <Group grow align="flex-start" style={{ gap: '8px' }}>
              <Select
                required
                label="Country Code"
                placeholder="+1"
                data={countryCodes}
                value={form.values.countryCode}
                onChange={(value) => form.setFieldValue('countryCode', value || '+233')}
                error={form.errors.countryCode}
                radius="md"
                size="md"
                searchable
                leftSection={<IconWorld size={16} stroke={1.5} />}
                styles={(theme) => ({
                  input: {
                    '&:focusWithin': {
                      borderColor: theme.colors.blue[5]
                    }
                  }
                })}
              />
              <TextInput
                required
                label="Phone Number"
                placeholder="1234567890"
                value={form.values.phoneNumber}
                onChange={(event) => form.setFieldValue('phoneNumber', event.currentTarget.value)}
                error={form.errors.phoneNumber}
                radius="md"
                size="md"
                  className='flex-1'
                leftSection={<IconPhone size={16} stroke={1.5} />}
                styles={(theme) => ({
                  input: {
                    '&:focusWithin': {
                      borderColor: theme.colors.blue[5]
                    }
                  }
                })}
              />
            </Group>
            <PasswordInput
              required
              label="Password"
              placeholder="Create a secure password"
              value={form.values.password}
              onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
              error={form.errors.password}
              radius="md"
              size="md"
              leftSection={<IconLock size={16} stroke={1.5} />}
              styles={(theme) => ({
                input: {
                  '&:focusWithin': {
                    borderColor: theme.colors.blue[5]
                  }
                }
              })}
            />

            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
              error={form.errors.terms}
              styles={() => ({
                input: { cursor: 'pointer' },
                label: { cursor: 'pointer' }
              })}
              color="blue"
            />
          </Stack>

          <Button
            fullWidth
            type="submit"
            mt={25}
            mb={10}
            radius="md"
            size="md"
            disabled={isPending}
            gradient={{ from: 'blue.7', to: 'cyan.5', deg: 45 }}
            variant="gradient"
          >
            {isPending ? 'Creating Account...' : 'Create Account'}
          </Button>
          
          <Text ta="center" size="sm" mt={15} c="dimmed">
            Already have an account?{' '}
            <Anchor href="/auth/login" fw={500} c="blue.5">
              Sign in
            </Anchor>
          </Text>
        </form>
      </Paper>
    </Container>
  )
}
