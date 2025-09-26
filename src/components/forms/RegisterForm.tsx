import { type RegisterSchema, registerSchema } from "@/schemas/AuthSchemas"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { FormField, FormControl, FormLabel, FormMessage, FormItem, Form } from "@/components/ui/form";
import { Button } from "../ui/button"
import { Link } from "react-router";
import { signUp } from "@/requests/auth";
import { useNavigate } from "react-router";

function RegisterForm() {
    const navigate = useNavigate()
    const form = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema)
    })

    async function onSubmit(values: RegisterSchema) {
        try {
            await signUp(values)
            navigate("/")
        } catch (error) {
            form.setError("root", { type: "manual", message: error instanceof Error ? error.message : undefined })
        }
    }

    return (
        <Form {...form}>
            {form.formState.errors.root && (
                <p className="text-red-500 text-sm mt-1">
                    {form.formState.errors.root.message}
                </p>
            )}
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2 items-stretch">
                <FormField control={form.control} name="username" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="username..." {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>

                )} />
                <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input type="email" placeholder="email..." {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>

                )} />
                <FormField control={form.control} name="password" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input type="password" placeholder="password..." {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>

                )} />
                <FormField control={form.control} name="repeatPassword" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Repeat password</FormLabel>
                        <FormControl>
                            <Input type="password" placeholder="repeat password..." {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>

                )} />

                <Button type="submit" className="mt-2">Create account</Button>
            </form>
            <Link to="/login">
                <Button type="button" variant="secondary" className="mt-2 w-full">Login</Button>
            </Link>
        </Form>
    )
}
export default RegisterForm
