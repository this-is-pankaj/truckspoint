import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { signupFormSchema, SignupFormSchema } from "../schema.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { signUserUpAction } from "@/app/actions/auth.action";
import { useState } from "react";

type SignupFormProps = {
  
}

const SignupForm = ({ }: SignupFormProps) => {
  const [errorStatusCode, setErrorStatusCode] = useState<string | undefined>(undefined)
  const form = useForm<SignupFormSchema>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {},
    mode: "all"
  })

  const handleSubmit = async (formData: SignupFormSchema) => {
    const res = await signUserUpAction(formData)
    if (res) {
      if(res.status === 200) {
        console.log("User signed up successfully", res)
        setErrorStatusCode(undefined)
        // handle success
      } else {
        setErrorStatusCode(res.status.toString())
      }
    } else {
      console.log("Signup failed")
      setErrorStatusCode('500')
      // handle failure
    }
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit, (e) => console.log(e))} className="flex flex-col gap-8">
        <div className="flex gap-4">
          <FormField control={form.control} name="firstName" render={({ field }) => {
            return <FormItem>
              <FormLabel>First name:</FormLabel>
              <FormControl>
                <Input placeholder="First name" {...field} />
              </FormControl>
              {/* <FormMessage className="text-xs" /> */}
            </FormItem>
          }} />
          <FormField control={form.control} name="middleName" render={({ field }) => {
            return <FormItem>
              <FormLabel>Middle name:</FormLabel>
              <FormControl>
                <Input placeholder="Middle name" {...field} />
              </FormControl>
              {/* <FormMessage className="text-xs" /> */}
            </FormItem>
          }} />
          <FormField control={form.control} name="lastName" render={({ field }) => {
            return <FormItem>
              <FormLabel>Last name:</FormLabel>
              <FormControl>
                <Input placeholder="Last name" {...field} />
              </FormControl>
              {/* <FormMessage className="text-xs" /> */}
            </FormItem>
          }} />
        </div>

        <div className="flex gap-4">
          <FormField control={form.control} name="email" render={({ field }) => {
            return <FormItem className="flex-1">
              <FormLabel>Email:</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              {/* <FormMessage className="text-xs" /> */}
            </FormItem>
          }} />
          <FormField control={form.control} name="phoneNumber" render={({ field }) => {
            return <FormItem className="flex-1">
              <FormLabel>Phone number:</FormLabel>
              <FormControl>
                <Input placeholder="Phone number" {...field} />
              </FormControl>
              {/* <FormMessage className="text-xs" /> */}
            </FormItem>
          }
          } />
        </div>
        <div className="flex gap-4 items-baseline">
          <FormField control={form.control} name="password" render={({ field }) => {
            return <FormItem className="flex-1">
              <FormLabel>Password:</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormDescription className={cn("text-xs px-1", {
                "text-red-600": form.formState.errors.password
              })}>
                Password must be at least 10 characters long and contain at least one letter, one number and one special character.
              </FormDescription>
              {/* <FormMessage className="text-xs" /> */}
            </FormItem>
          }
          } />
          <FormField control={form.control} name="confirmPassword" render={({ field }) => {
            return <FormItem className="flex-1">
              <FormLabel>Confirm password:</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Confirm password" {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          }
          } />
        </div>
        <div className="flex flex-col gap-4">
          <FormField control={form.control} name="termsAccepted" render={({ field }) => {
            return <FormItem className="flex flex-col gap-1">
              <div className="flex gap-2">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div>
                  <FormLabel className="text-xs">I agree to the terms and conditions</FormLabel>
                  <FormDescription className="text-xs">
                    By signing up, you agree to our terms and conditions.
                  </FormDescription>
                </div>
              </div>
            </FormItem>
          }
          } />
          <FormField control={form.control} name="privacyPolicyAccepted" render={({ field }) => {
            return <FormItem className="flex flex-col gap-1">
              <div className="flex gap-2">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div>
                  <FormLabel className="text-xs">I agree to the privacy policy</FormLabel>
                  <FormDescription className="text-xs">
                    By signing up, you agree to our privacy policy.
                  </FormDescription>
                </div>
              </div>
            </FormItem>
          }
          } />
        </div>
        {
          !errorStatusCode
            ? null
            : <p className="text-red-600 text-xs text-center">
              {errorStatusCode === '500'
                ? "Something went wrong. Please try again later."
                : errorStatusCode === '409'
                  ? "User already exists. Please try again with a different email or phone number."
                  : "An unknown error occurred. Please try again later."}
            </p>
        }
        <Button type="submit" disabled={!form.formState.isValid} className="">Sign up</Button>
      </form>
    </Form>
  )
}

export default SignupForm;