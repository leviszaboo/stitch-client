import { useForm, useFormState } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod";
import axios from "axios";
import { useMutation } from "react-query";
import { useState } from "react";

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
  
export default function SignUpDialog() {
  const [error, setError] = useState<string | undefined>(undefined);

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema)
  });

  const { errors } = useFormState({ control: form.control })

  async function signUp(userData: z.infer<typeof signUpSchema>) {
    const res = await axios.post(`${process.env.REACT_APP_API_ROUTE}/users/register`, userData);
    return res.data;
  }

  const {
    mutate,
    isLoading,
  } = useMutation(signUp, {
    onError: (err: any) => {
      if (err.response.data.errorCode === "EMAIL_ALREADY_EXISTS") {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Try again.")
      }
    }
  });

  async function onSubmit(userData: z.infer<typeof signUpSchema>) {
    mutate(userData);
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
               <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex justify-between">
                      <p>Confirm Password</p> 
                      {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Confirm Password" type="password" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex flex-col gap-4">
                <Button type="submit" disabled={isLoading}>{isLoading ? "Registering..." : "Register"}</Button>
                {error && <p className="text-red-500 text-sm font-semibold ml-auto mr-auto">{error}</p>}
              </div>
            </form>
          </Form>
      </DialogContent>
    </Dialog>
  )
}
  