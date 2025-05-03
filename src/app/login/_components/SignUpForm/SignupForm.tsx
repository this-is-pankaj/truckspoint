import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { signupFormSchema, SignupFormSchema } from "../schema.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

type SignupFormProps = {
  onSignup: (data: SignupFormSchema) => void
}

const SignupForm = ({ onSignup }: SignupFormProps) => {
  const form = useForm<SignupFormSchema>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {},
    mode: "all"
  })

  const handleSubmit = async (formData: SignupFormSchema) => {
    onSignup(formData)
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
                <Input placeholder="Password" {...field} />
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
                <Input placeholder="Confirm password" {...field} />
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
        <Button type="submit" disabled={!form.formState.isValid} className="">Sign up</Button>
      </form>
    </Form>
  )
}

export default SignupForm;