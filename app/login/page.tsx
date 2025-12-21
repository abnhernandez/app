import LoginForm from "@/app/components/login"
import GithubButton from "@/app/components/GithubButton"

export default function LoginPage() {
  return (
    <div className="space-y-4">
      <LoginForm />
      <GithubButton />
    </div>
  )
}