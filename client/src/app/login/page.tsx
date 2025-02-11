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

const loginSchema = z.object({
  username: z.string().min(3, "Name must be at least 3 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const Login = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [eyeOpen, setEyeOpen] = useState(false);

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    console.log(values);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-96">
        <CardHeader>
          <CardTitle className="text-center">Login</CardTitle>
          <CardDescription className="text-center">
            Welcome back!!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
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
              <Button type="submit" className="w-full mt-2">
                Login
              </Button>
            </form>
          </FormProvider>
          <p className="text-xs text-center mt-2 text-muted-foreground">
            Or continue with
          </p>
          <LoginForm />
          <p className="text-xs text-center mt-2 text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/signup">
              {" "}
              <span className="text-yellow-600">Sign Up</span>{" "}
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
