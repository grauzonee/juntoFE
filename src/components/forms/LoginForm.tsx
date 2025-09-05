import { type LoginSchema, loginSchema } from "@/schemas/AuthSchemas"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { FormField, FormControl, FormLabel, FormMessage, FormItem, Form } from "@/components/ui/form";
import { Button } from "../ui/button"
import { Link } from "react-router";

function LoginForm() {
    const form = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema)
    })

    function onSubmit(values: LoginSchema) {
        console.log(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2 items-stretch">
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

                <Button type="submit" className="mt-2">Log in</Button>
            </form>
            <Link to="/register">
                <Button type="button" variant="secondary" className="mt-2 w-full">Create an account</Button>
            </Link>
        </Form>
    )
}
export default LoginForm
