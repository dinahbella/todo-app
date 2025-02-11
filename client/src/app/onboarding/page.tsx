"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const OnboardingPage = () => {
  const [loading, setLoading] = useState(false);
  return (
    <div className="flex lg:flex md:grid justify-center items-center w-full h-screen gap-5 p-5">
      {/* Left Side - Image Card */}
      <Card className=" md:w-[50vh] h-[450px] bg-black flex flex-col items-center">
        <CardHeader>
          <CardTitle className="text-white text-center">
            Productive Mind
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center mt-20">
          <Image
            src="/onboard.png"
            alt="Onboarding Image"
            height={500}
            width={400}
            className="rounded-lg"
          />
        </CardContent>
      </Card>

      {/* Right Side - Text Card */}
      <Card className=" h-[450px] w-[400px]  flex flex-col border-2 border-gray-300  items-center justify-center p-5">
        <CardHeader>
          <CardTitle className="font-bold text-3xl text-center">
            Productive Mind
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-900 text-sm">
            With only the features you need, Productive Mind is customized for
            individuals seeking a stress-free way to stay focused on their
            goals, projects, and tasks.
          </p>
        </CardContent>
        <Button className="w-full text-black text-xs hover:bg-yellow-600 hover:scale-105 transition-all duration-300 ease-in-out">
          <Link href="/signup">{loading ? "Loading..." : "Get Started"}</Link>
        </Button>
        <CardFooter>
          <p className="text-black/85 text-xs mt-4">
            Already have an account?{" "}
            <Link href="/login">
              <span className="text-yellow-600">Login</span>
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default OnboardingPage;
