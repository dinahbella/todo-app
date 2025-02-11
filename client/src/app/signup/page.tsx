"use client";

import z from "zod";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeClosed } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as React from "react";

import Link from "next/link";
import LoginForm from "@/components/loginForm";

// Define validation schema
export const signupSchema = z.object({
  username: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const Signup = () => {
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
    },
  });

  const [eyeOpen, setEyeOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = (values: z.infer<typeof signupSchema>) => {
    console.log("Form Submitted:", values);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-96">
        <CardHeader>
          <CardTitle className="text-center">Signup</CardTitle>
          <CardDescription className="text-center">
            Create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="example@gmail.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Username Field */}
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={eyeOpen ? "text" : "password"}
                          placeholder="Password"
                          {...field}
                        />
                      </FormControl>
                      <div
                        className="absolute right-3 top-2 cursor-pointer"
                        onClick={() => setEyeOpen((prev) => !prev)}
                      >
                        {eyeOpen ? <EyeClosed /> : <Eye />}
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button type="submit" className="w-full mt-2 font-medium">
                {loading ? "Loading..." : "Signup"}
              </Button>
            </form>
          </FormProvider>
          <div className="space-y-3">
            <p className="text-xs text-center mt-2 text-muted-foreground">
              Or continue with
            </p>
            <LoginForm />
            <p className="text-xs text-center mt-2 text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login">
                <span className="text-yellow-600">Login</span>
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
