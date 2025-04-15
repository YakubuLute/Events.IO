'use client'
import {
  Button,
  Container,
  Paper,
  Stack,
  TextInput,
  Title,
  Text,
  Box,
  Anchor,
  useMantineTheme
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@/components/shared/notification/mantine-notification'
import { IconAt, IconArrowLeft } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { useForgotPassword } from '@/hooks/hooks'

// global styles for the hover effect
const hoverPaperStyles = `
  .hover-paper {
    transition: transform 200ms ease, box-shadow 200ms ease;
  }
  .hover-paper:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.06);
  }
`;

interface ForgotPasswordFormValues {
  email: string;
}

export default function ForgotPasswordPage() {
  const theme = useMantineTheme();
  const router = useRouter();
  
  const form = useForm<ForgotPasswordFormValues>({
    initialValues: {
      email: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const { isPending, mutate: forgotPassword } = useForgotPassword({
    onSuccess: (data) => {
      showNotification({
        type: 'success',
        message: data.message || 'Password reset instructions sent to your email',
      });
      
      // In development, show the OTP and token for testing purposes
      if (data._dev_only_otp && data._dev_only_token) {
        console.log('Development mode - Reset password OTP:', data._dev_only_otp);
        console.log('Development mode - Reset password token:', data._dev_only_token);
        
        showNotification({
          type: 'info',
          message: `DEV MODE: OTP is ${data._dev_only_otp}`,
        });
      }
      
      // Redirect to login page after a delay
      setTimeout(() => {
        router.push('/auth/login');
      }, 3000);
    },
    onError: (error) => {
      showNotification({
        type: 'error',
        message: error.message || 'Failed to send reset instructions',
      });
    },
  });

  const handleSubmit = (values: ForgotPasswordFormValues) => {
    forgotPassword(values.email);
  };

  return (
    <Container size={490} my={30}>
      <style>{hoverPaperStyles}</style>
      <Box mb={10} ta="center">
        <Title 
          order={1} 
          fw={900} 
          c={theme.colors.blue[7]} 
          size="h2"
        >
          Events.IO
        </Title>
        <Text c="dimmed" size="sm" mt={5}>
          Reset your password
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
        <Title order={3} ta="center" mb={5} fw={600}>
          Forgot Password
        </Title>
        
        <Text size="sm" c="dimmed" ta="center" mb={20}>
          Enter your email address and we&apos;ll send you instructions to reset your password.
        </Text>
        
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack style={{ gap: '16px' }}>
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
            
            <Button 
              type="submit" 
              radius="md" 
              size="md"
              fullWidth
              loading={isPending}
              color={theme.colors.blue[7]}
            >
              Send Reset Instructions
            </Button>
            
            <Anchor 
              component="button" 
              type="button" 
              c="dimmed" 
              size="sm" 
              fw={500}
              onClick={() => router.push('/auth/login')}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
            >
              <IconArrowLeft size={14} stroke={1.5} />
              Back to Login
            </Anchor>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}

