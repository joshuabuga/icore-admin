'use client'

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle, UserPlus, Loader2, Sparkles, ArrowRight } from "lucide-react";

interface UserData {
  id: string;
  email: string;
  name: string;
  role: string;
}

export default function OnboardingPage() {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [step, setStep] = useState(1);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setStep(1);
        setTimeout(() => setStep(2), 400);
        setTimeout(() => setStep(3), 800);

        const response = await fetch('/api/user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user }),
        });

        const body = await response.json();

        if (!response.ok) {
          throw new Error(body?.error ?? `Server error ${response.status}`);
        }

        const userData = body as UserData;
        setStep(4);
        toast.success(`Welcome ${userData.name}! Account ready.`);
        setIsComplete(true);

        setTimeout(() => { router.push("/summary/legacy"); }, 2000);

      } catch (error) {
        toast.error(`Setup failed: ${error instanceof Error ? error.message : String(error)}`);
        setIsComplete(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user, router]);

  const steps = [
    { id: 1, title: "Verifying Identity", description: "Confirming your account details" },
    { id: 2, title: "Setting Up Profile", description: "Creating your user profile" },
    { id: 3, title: "Configuring Permissions", description: "Setting up your access levels" },
    { id: 4, title: "Complete!", description: "Your account is ready to use" }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="text-center space-y-3 sm:space-y-4">
          <div className="flex items-center justify-center">
            <div className="p-2 sm:p-3 rounded-full border">
              <Sparkles className="h-6 w-6 sm:h-8 sm:w-8" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold">Welcome to Ushindi Box BackOffice</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Setting up your account. This will only take a moment.
            </p>
          </div>
        </div>

        {/* Main Card */}
        <Card>
          <CardHeader className="text-center px-4 sm:px-6">
            <div className="flex items-center justify-center mb-3 sm:mb-4">
              {isLoading ? (
                <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 animate-spin" />
              ) : (
                <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-success" />
              )}
            </div>
            <CardTitle className="text-lg sm:text-xl">
              {isLoading ? "Setting up your account" : "Account ready!"}
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              {isLoading 
                ? "Please wait while we prepare everything for you"
                : "You're all set to start using Ushindi Box BackOffice"
              }
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6">
            {/* Progress Steps */}
            <div className="space-y-3 sm:space-y-4">
              {steps.map((stepItem) => (
                <div key={stepItem.id} className="flex items-center space-x-3">
                  <div className={`shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium border-2 transition-all ${
                    step >= stepItem.id 
                      ? 'bg-primary text-primary-foreground border-primary' 
                      : step === stepItem.id 
                        ? 'border-primary text-primary' 
                        : 'border-muted text-muted-foreground'
                  }`}>
                    {step > stepItem.id ? (
                      <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                    ) : step === stepItem.id ? (
                      <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                    ) : (
                      stepItem.id
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${
                      step >= stepItem.id ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {stepItem.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {stepItem.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* User Info (when loading) */}
            {isLoading && user && (
              <div className="border rounded-lg p-3 sm:p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center">
                    <UserPlus className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{user.firstName}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.primaryEmailAddress?.emailAddress}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Success State */}
            {isComplete && !isLoading && (
              <div className="text-center space-y-3 sm:space-y-4">
                <div className="border rounded-lg p-3 sm:p-4 bg-success/10 border-success/20">
                  <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-success mx-auto mb-2" />
                  <p className="font-medium text-success text-sm sm:text-base">Account created successfully!</p>
                  <p className="text-xs sm:text-sm text-success/80">Redirecting you to the dashboard...</p>
                </div>
                
                <Button 
                  onClick={() => router.push("/summary/legacy")} 
                  className="w-full"
                  size="sm"
                >
                  Continue to Dashboard
                  <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 ml-2" />
                </Button>
              </div>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="space-y-2 sm:space-y-3">
                <Skeleton className="h-3 sm:h-4 w-full" />
                <Skeleton className="h-3 sm:h-4 w-3/4" />
                <Skeleton className="h-3 sm:h-4 w-1/2" />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center">
          <p className="text-xs sm:text-sm text-muted-foreground">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}