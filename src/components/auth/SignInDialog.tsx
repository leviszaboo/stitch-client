import { useForm, useFormState } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod";
import { signInSchema } from "../../schema/signInSchema";

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
  
export default function SignInDialog() {
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema)
  })

  const { errors } = useFormState({ control: form.control })

  async function onSubmit(values: z.infer<typeof signInSchema>) {
    console.log(values);
    await axios.post(`${process.env.REACT_APP_API_ROUTE}/users/login`, values)
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
        <Button variant={"outline"}>
          Log In
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Log in to your account</DialogTitle>
        </DialogHeader>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
              <Button type="submit">Sign In</Button>
            </form>
          </Form>
      </DialogContent>
    </Dialog>
  )
}