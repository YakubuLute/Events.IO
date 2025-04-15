'use client'
import { useEffect, useState } from 'react'
import {
  Button,
  Container,
  Paper,
  Stack,
  PasswordInput,
  Title,
  Text,
  Box,
  Anchor,
  useMantineTheme,
  Alert
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@/components/shared/notification/mantine-notification'
import { IconArrowLeft, IconLock, IconAlertCircle } from '@tabler/icons-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useResetPassword } from '@/hooks/hooks'

// Global styles for the hover effect
const hoverPaperStyles = `
  .hover-paper {
    transition: transform 200ms ease, box-shadow 200ms ease;
  }
  .hover-paper:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.06);
  }
`;

interface ResetPasswordFormValues {
  password: string;
  confirmPassword: string;
}

export default function ResetPasswordPage() {
  const theme = useMantineTheme();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [tokenVerified, setTokenVerified] = useState<boolean | null>(null);
  const [email, setEmail] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const [verificationError, setVerificationError] = useState<string>('');

  const form = useForm<ResetPasswordFormValues>({
    initialValues: {
      password: '',
      confirmPassword: ''
    },
    validate: {
      password: (value) => (value.length < 8 ? 'Password must be at least 8 characters' : null),
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords do not match' : null
    },
  });

  // Get token and email from URL parameters
  useEffect(() => {
    const tokenParam = searchParams.get('token');
    const emailParam = searchParams.get('email');

    if (tokenParam && emailParam) {
      setToken(tokenParam);
      setEmail(emailParam);
      setTokenVerified(true); // In a real app, you would verify the token with the server here
    } else {
      setVerificationError('Invalid or missing reset token. Please request a new password reset.');
      setTokenVerified(false);
    }
  }, [searchParams]);

  const { isPending, mutate: resetPassword } = useResetPassword({
    onSuccess: (data) => {
      showNotification({
        type: 'success',
        message: data.message || 'Your password has been reset successfully',
      });
      
      // Redirect to login page after a delay
      setTimeout(() => {
        router.push('/auth/login');
      }, 2000);
    },
    onError: (error) => {
      showNotification({
        type: 'error',
        message: error.message || 'Failed to reset password',
      });
    },
  });

  const handleSubmit = (values: ResetPasswordFormValues) => {
    resetPassword({
      email,
      token,
      newPassword: values.password
    });
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
          Reset Password
        </Title>
        
        {tokenVerified === false ? (
          <>
            <Alert 
              icon={<IconAlertCircle size={16} />} 
              title="Invalid Reset Link" 
              color="red"
              mt={20}
            >
              {verificationError}
            </Alert>
            <Anchor 
              component="button" 
              type="button" 
              c="dimmed" 
              size="sm" 
              fw={500}
              mt={20}
              onClick={() => router.push('/auth/forgot-password')}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
            >
              <IconArrowLeft size={14} stroke={1.5} />
              Back to Forgot Password
            </Anchor>
          </>
        ) : tokenVerified === true ? (
          <>
            <Text size="sm" c="dimmed" ta="center" mb={20}>
              Please enter your new password below.
            </Text>
            
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Stack style={{ gap: '16px' }}>
                <PasswordInput
                  required
                  label="New Password"
                  placeholder="Enter your new password"
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
                
                <PasswordInput
                  required
                  label="Confirm Password"
                  placeholder="Confirm your new password"
                  value={form.values.confirmPassword}
                  onChange={(event) => form.setFieldValue('confirmPassword', event.currentTarget.value)}
                  error={form.errors.confirmPassword}
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
                
                <Button 
                  type="submit" 
                  radius="md" 
                  size="md"
                  fullWidth
                  loading={isPending}
                  color={theme.colors.blue[7]}
                >
                  Reset Password
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
          </>
        ) : (
          <Text ta="center" mt={20}>Verifying reset token...</Text>
        )}
      </Paper>
    </Container>
  );
}
