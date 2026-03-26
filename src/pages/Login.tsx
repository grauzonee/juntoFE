import LoginForm from "@/components/forms/LoginForm"
import AuthCardLayout from "@/components/auth/AuthCardLayout"

function Login() {
    return (
        <AuthCardLayout
            eyebrow="Welcome back"
            title="Pick up where your plans left off."
            description="Log in to check upcoming events, message your groups, and jump back into your community."
        >
            <LoginForm />
        </AuthCardLayout>
    )
}

export default Login
