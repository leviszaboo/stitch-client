import { useForm, useFormState } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod";
import { signUpSchema } from "../../schema/signUpSchema";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form"
import { Input } from "../ui/input";
import axios from "axios";
  
export default function SignUpDialog() {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema)
  })

  const { errors } = useFormState({ control: form.control })

  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    console.log(values);
    await axios.post(`${process.env.REACT_APP_API_ROUTE}/users/register`, values)
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.error(error)
    });
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button>
          Sign Up
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create an Account </DialogTitle>
        </DialogHeader>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex justify-between">
                      <p>Email</p> 
                      <p className="">{errors.email && errors.email.message}</p>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="example@email.com" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex justify-between">
                      <p>Password</p> 
                      <p className="">{errors.password && errors.password.message}</p>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Password" type="password" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex justify-between">
                      <p>Confirm Password</p> 
                      <p className="">{errors.confirmPassword && errors.confirmPassword.message}</p>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Confirm Password" type="password" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit">Sign Up</Button>
            </form>
          </Form>
      </DialogContent>
    </Dialog>
  )
}
  