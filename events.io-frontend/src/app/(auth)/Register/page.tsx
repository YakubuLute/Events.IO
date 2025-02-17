'use client'
import {
  Anchor,
  Button,
  Checkbox,
  Group,
  Container,
  PaperProps,
  PasswordInput,
  Stack,
  Title,
  TextInput
} from '@mantine/core'
import { useForm } from '@mantine/form'
import classes from './Register.module.scss'

export default function RegisterationPage (props: PaperProps) {
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true
    },

    validate: {
      email: val => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: val =>
        val.length <= 6 ? 'Password should include at least 6 characters' : null
    }
  })

  return (
    <Container size={420} my={40}>
      <Title size='lg' ta='center' className={classes.title}>
        Start Selling tickets with Events.IO
      </Title>

      <form onSubmit={form.onSubmit(() => {})}>
        <Stack>
          <TextInput
            label='Name'
            placeholder='Your name'
            value={form.values.name}
            onChange={event =>
              form.setFieldValue('name', event.currentTarget.value)
            }
            radius='md'
          />

          <TextInput
            required
            label='Email'
            placeholder='hello@mantine.dev'
            value={form.values.email}
            onChange={event =>
              form.setFieldValue('email', event.currentTarget.value)
            }
            error={form.errors.email && 'Invalid email'}
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
            error={
              form.errors.password &&
              'Password should include at least 6 characters'
            }
            radius='md'
          />

          <Checkbox
            label='I accept terms and conditions'
            checked={form.values.terms}
            onChange={event =>
              form.setFieldValue('terms', event.currentTarget.checked)
            }
          />
        </Stack>

        <Group justify='space-between' mt='xl'>
          <Anchor
            component='button'
            type='button'
            c='dimmed'
            onClick={() => {}}
            size='xs'
          >
            Already have an account? Login
          </Anchor>
          <Button type='submit' radius='xl'>
            Create Account
          </Button>
        </Group>
      </form>
    </Container>
  )
}
