'use client';

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { loginFormSchema, LoginFormSchema } from "../schema.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@/components/ui/checkbox";
import { logUserInAction } from "@/app/actions/auth.action";

type LoginFormProps = {}

const LoginForm = ({  }: LoginFormProps) => {
  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
      rememberMe: false,
    },
    mode: "all",
  })

  const handleSubmit = async (formData: LoginFormSchema) => {
    try {
      const res = await logUserInAction(formData);
      if (res) {
        console.log("Login successful", res)
        // handle success
      } else {
        console.log("Login failed")
        // handle failure
      }
    } catch(exc: any) {
      console.log('Exception while logging in', JSON.stringify(exc))
    }
  }

  return (
    <Form {...form}>
      <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(handleSubmit, (e) => console.log)}>
        <FormField control={form.control} name="username" render={({ field }) => {
          return <FormItem>
            <FormLabel>Username:</FormLabel>
            <FormControl>
              <Input placeholder="Username" {...field} />
            </FormControl>
            {/* <FormMessage className="text-xs" /> */}
            <FormDescription className="text-xs px-2 ">
              Either of the registered email or contact number can be used as the username.
            </FormDescription>
          </FormItem>
        }} />
        <FormField control={form.control} name="password" render={({ field }) => {
          return <FormItem>
            <FormLabel>Password:</FormLabel>
            <FormControl>
              <Input type="password" placeholder="Password" {...field} />
            </FormControl>
            {/* <FormMessage /> */}
            {/* <FormDescription>
                    This is your public display name.
                  </FormDescription> */}
          </FormItem>
        }} />
        <FormField control={form.control} name="rememberMe" render={({ field }) => {
          return <FormItem className="flex items-center gap-2">
            <FormControl>
              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
            <FormLabel className="text-xs">Remember me</FormLabel>
          </FormItem>
        }
        } />
        <Button variant='default' type="submit" disabled={!form.formState.isValid}>Login</Button>
      </form>
    </Form>
  )
}

export default LoginForm;