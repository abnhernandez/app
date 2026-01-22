import LoginForm from "@/app/components/login"
import AuthLayout from "@/app/components/AuthLayout"

export default function LoginPage() {
  return (
    <AuthLayout
      title="Bienvenido"
      subtitle="Inicia sesión para continuar"
    >
      <LoginForm />
    </AuthLayout>
  )
}