import { type RegisterSchema, registerSchema } from "@/schemas/AuthSchemas"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { FormField, FormControl, FormLabel, FormMessage, FormItem, Form, FormRootMessage } from "@/components/ui/form";
import { Link, useNavigate } from "react-router";
import { signUp } from "@/requests/auth";
import BrutalButton from "@/components/ui/brutal-button";
import { testIds } from "@/testIds";
import { authFormLabelClassName } from "@/components/auth/auth-form-styles";

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
            <form
                data-testid={testIds.auth.registerForm}
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-5 items-stretch"
            >
                <FormRootMessage message={form.formState.errors.root?.message} className="mb-1" />
                <FormField control={form.control} name="username" render={({ field }) => (
                    <FormItem className="gap-2.5">
                        <FormLabel className={authFormLabelClassName}>
                            Username
                        </FormLabel>
                        <FormControl>
                            <Input
                                type="text"
                                placeholder="Choose a username"
                                variant="auth"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>

                )} />
                <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem className="gap-2.5">
                        <FormLabel className={authFormLabelClassName}>
                            Email
                        </FormLabel>
                        <FormControl>
                            <Input
                                type="email"
                                placeholder="you@example.com"
                                variant="auth"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>

                )} />
                <FormField control={form.control} name="password" render={({ field }) => (
                    <FormItem className="gap-2.5">
                        <FormLabel className={authFormLabelClassName}>
                            Password
                        </FormLabel>
                        <FormControl>
                            <Input
                                type="password"
                                placeholder="Create a password"
                                variant="auth"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>

                )} />
                <FormField control={form.control} name="repeatPassword" render={({ field }) => (
                    <FormItem className="gap-2.5">
                        <FormLabel className={authFormLabelClassName}>
                            Repeat password
                        </FormLabel>
                        <FormControl>
                            <Input
                                type="password"
                                placeholder="Repeat your password"
                                variant="auth"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>

                )} />

                <BrutalButton type="submit" tone="violet" className="mt-2 w-full">
                    Create account
                </BrutalButton>
            </form>
            <BrutalButton asChild type="button" tone="cream" className="mt-3 w-full">
                <Link to="/login">Log in</Link>
            </BrutalButton>
        </Form>
    )
}
export default RegisterForm
