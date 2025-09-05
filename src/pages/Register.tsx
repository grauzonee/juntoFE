import RegisterForm from "@/components/forms/RegisterForm"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

function Register() {
    return (
        <Card className="items-center flex flex-col md:w-1/2 max-w-80 px-5 py-7">
            <CardHeader className="font-bold text-xl text-background/80">Welcome on board!</CardHeader>
            <Separator className="mb-5" />
            <CardContent>
                <RegisterForm />
            </CardContent>
        </Card>
    )
}

export default Register
