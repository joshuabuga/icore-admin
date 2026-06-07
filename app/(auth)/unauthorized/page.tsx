'use client'

import { SignOutButton } from '@clerk/nextjs';
import { ShieldX } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-sm w-full text-center space-y-6">
        <div className="flex justify-center">
          <div className="p-4 rounded-full border border-destructive/30 bg-destructive/10">
            <ShieldX className="h-10 w-10 text-destructive" />
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Access Denied</h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Your account is not authorised to access the Ushindi Box BackOffice.
            Contact your administrator to request access.
          </p>
        </div>
        <SignOutButton redirectUrl="/sign-in">
          <Button variant="outline" className="w-full">Sign out</Button>
        </SignOutButton>
      </div>
    </div>
  );
}
