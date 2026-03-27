import RegisterForm from "@/components/forms/RegisterForm"
import AuthCardLayout from "@/components/auth/AuthCardLayout"

function Register() {
    return (
        <AuthCardLayout
            eyebrow="Join Junto"
            title="Start finding your people."
            description="Create an account to discover local events, host your own gatherings, and stay in the loop."
        >
            <RegisterForm />
        </AuthCardLayout>
    )
}

export default Register
