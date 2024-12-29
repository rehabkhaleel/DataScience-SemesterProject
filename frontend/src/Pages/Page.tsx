import { Users, UserCog } from 'lucide-react';
import { Card } from '@mui/material';
import Link from 'next/link'; 
import React from 'react';



export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-300 font-roboto">
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-medium text-white mb-2">
          Telecom Customer Services
        </h1>
        <h2 className="text-2xl text-white/90 mb-16">
          Portal Selection
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Admin Portal Card */}
          <Card className="p-8 bg-white/10 backdrop-blur border-white/20 text-center">
            <div className="flex justify-center mb-4">
              <UserCog className="w-16 h-16 text-blue-100" />
            </div>
            <h3 className="text-xl font-medium text-white mb-2">
              Admin
            </h3>
            <p className="text-white/80 mb-6 text-sm">
              Access administration tools and manage the system
            </p>
            <Link
              href="/admin"
              className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Enter Admin Portal
            </Link>
          </Card>

          {/* Customer Portal Card */}
          <Card className="p-8 bg-white/10 backdrop-blur border-white/20 text-center">
            <div className="flex justify-center mb-4">
              <Users className="w-16 h-16 text-green-100" />
            </div>
            <h3 className="text-xl font-medium text-white mb-2">
              Customer
            </h3>
            <p className="text-white/80 mb-6 text-sm">
              Access your account and manage your services
            </p>
            <Link
              href="/customer"
              className="inline-block px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Enter Customer Portal
            </Link>
          </Card>
        </div>
      </div>
    </main>
  )
}

