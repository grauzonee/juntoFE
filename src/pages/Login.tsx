import LoginForm from "@/components/forms/LoginForm"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

function Login() {
    return (
        <Card className="items-center flex flex-col md:w-1/2 max-w-80 px-5 py-7">
            <CardHeader className="font-bold text-xl text-background/80">Nice to see you again</CardHeader>
            <Separator className="mb-5" />
            <CardContent>
                <LoginForm />
            </CardContent>
        </Card>
    )
}

export default Login
