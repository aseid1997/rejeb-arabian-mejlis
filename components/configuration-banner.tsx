"use client"

import { useState } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { X, AlertTriangle, ExternalLink } from 'lucide-react'

interface ConfigurationBannerProps {
  isSupabaseConfigured: boolean
}

export default function ConfigurationBanner({ isSupabaseConfigured }: ConfigurationBannerProps) {
  const [dismissed, setDismissed] = useState(false)

  if (isSupabaseConfigured || dismissed) {
    return null
  }

  return (
    <div className="fixed top-16 left-0 right-0 z-40 mx-4">
      <Alert className="bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800 shadow-lg">
        <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
        <AlertDescription className="flex items-center justify-between">
          <div className="flex-1">
            <span className="font-semibold text-amber-800 dark:text-amber-200">Demo Mode Active:</span>
            <span className="text-amber-700 dark:text-amber-300 ml-2">
              Configure Supabase to enable full functionality (product management, contact forms, orders).
            </span>
            <a 
              href="https://supabase.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center ml-2 text-amber-600 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-200 underline"
            >
              Get Supabase <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDismissed(true)}
            className="text-amber-600 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-200 ml-4"
          >
            <X className="h-4 w-4" />
          </Button>
        </AlertDescription>
      </Alert>
    </div>
  )
}
