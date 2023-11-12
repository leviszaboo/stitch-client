import { useForm, useFormState } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod";
import axios from "axios";
import { useMutation } from "react-query";
import { useState } from "react";

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
  
export default function SignInDialog() {
  const [error, setError] = useState<string | undefined>(undefined);

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema)
  })

  const { errors } = useFormState({ control: form.control });

  async function signIn(userData: z.infer<typeof signInSchema>) {
    const res = await axios.post(`${process.env.REACT_APP_API_ROUTE}/users/login`, userData);
    return res.data;
  }

  const {
    mutate,
    isLoading,
  } = useMutation(signIn, {
    onError: (err: any) => {
      if (
        err.response.data.errorCode === "USER_NOT_FOUND"
        ||         err.response.data.errorCode === "INCORRECT_PASSWORD"
      ) {
        setError(err.response.data.message)
      } else {
        setError("Something went wrong. Try again.")
      }
    }
  });

  async function onSubmit(userData: z.infer<typeof signInSchema>) {
    mutate(userData);
  };

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
                      {errors.email && <p>{errors.email.message}</p>}
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
                      {errors.password && <p>{errors.password.message}</p>}
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Password" type="password" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex flex-col gap-4">
                <Button type="submit" disabled={isLoading}>{isLoading ? "Signing you in..." : "Sign In"}</Button>
                {error && <p className="text-red-500 text-sm font-semibold mr-auto ml-auto">{error}</p>}
              </div>
            </form>
          </Form>
      </DialogContent>
    </Dialog>
  )
}