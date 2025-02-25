export default function AuthLayout ({
  children
}: {
  children: React.ReactNode
}) {
  console.log('Auth layout rendering...')
  return <>{children}</>
}
