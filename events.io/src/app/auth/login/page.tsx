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
  Group,
  Text,
  Divider,
  Box,
  Anchor,
  useMantineTheme
} from '@mantine/core'
import { useForm, UseFormReturnType } from '@mantine/form'
import { useUserSignin } from '@/hooks/hooks'
import { showNotification } from '@/components/shared/notification/mantine-notification'
import { countryCodes } from '@/utils/countryCodeList'
import { LoginFormValues } from '@/interface/interface'
import { IconAt, IconLock, IconPhone, IconWorld } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'

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

export default function LoginPage () {
  const theme = useMantineTheme();
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
      showNotification({
        type: 'success',
        message: 'Logged in successfully!'
      })
      // Redirect: window.location.href = '/dashboard';
    },
    onError: (error: Error & { response?: { data?: { error?: string } } }) => {
      const errorMessage = error.response?.data?.error || error.message || 'Login failed';
      showNotification({
        type: 'error',
        message: errorMessage
      })
      console.error('Login error:', error);
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

  const router = useRouter();
  return (
    <Container size={490} my={30}>
      <style>{hoverPaperStyles}</style>
      <Box mb={30} ta="center">
        <Title 
          order={1} 
          fw={900} 
          c={theme.colors.blue[7]} 
          size="h2"
        >
          Events.IO
        </Title>
        <Text c="dimmed" size="sm" mt={5}>
          Sign in to your account to continue
        </Text>
      </Box>

      <Paper 
        withBorder 
        shadow="lg" 
        p={35} 
        radius="md" 
        bg="white"
        style={{
          borderTop: `4px solid ${theme.colors.blue[5]}`,
          transition: 'transform 200ms ease, box-shadow 200ms ease'
        }}
        className="hover-paper"
      >
        <Title order={3} ta="center" mb={25} fw={600}>
          Welcome Back
        </Title>
        
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack style={{ gap: '16px' }}>
            <TextInput
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
            
            <Divider label="Or use phone number" labelPosition="center" />
            
            <Group grow align="flex-start" style={{ gap: '8px' }}>
              <Select
                label="Country"
                placeholder="+1"
                data={countryCodes}
                value={form.values.countryCode}
                onChange={(value) => form.setFieldValue('countryCode', value || '')}
                error={form.errors.countryCode}
                radius="md"
                size="md"
                className='w-[35%]'
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
              placeholder="Your secure password"
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
            
            <Group justify="space-between" mt="xs">
              <Anchor component="button" type="button" c="dimmed" size="sm" fw={500} onClick={() => router.push('/auth/forgot-password')}>
                Forgot password?
              </Anchor>
            </Group>
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
            {isPending ? 'Signing in...' : 'Sign in'}
          </Button>
          
          <Text ta="center" size="sm" mt={15} c="dimmed">
            Don&apos;t have an account?{' '}
            <Anchor href="/auth/register" fw={500} c="blue.5">
              Create account
            </Anchor>
          </Text>
        </form>
      </Paper>
    </Container>
  )
}
