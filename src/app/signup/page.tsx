"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeftRight, Wallet } from "lucide-react"
import Link from "next/link"
import { ConnectButton } from "@rainbow-me/rainbowkit"

export default function SignupPage() {
  const [activeTab, setActiveTab] = useState<"email" | "wallet">("email")

  const handleEmailSignup = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Email signup submitted")
  }

  return (
    <div className="min-h-screen bg-[#191B1F] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-[#191B1F] border border-[#F0F0F033] rounded-lg p-8 space-y-6">
          {/* Header */}
          <div className="text-start space-y-2">
            <h1 className="text-2xl font-semibold text-[#288C3B]">Create Your Account</h1>
            <p className="text-[#B9B9B9] text-sm">Get started with your journey</p>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 bg-[#2D302D] p-1 rounded-lg">
            <button
              onClick={() => setActiveTab("email")}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                activeTab === "email" ? "bg-[#288C3B] text-white" : "text-[#56745B]"
              }`}
            >
              Email
            </button>
            <button
              onClick={() => setActiveTab("wallet")}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                activeTab === "wallet" ? "bg-[#288C3B] text-white" : "text-[#56745B]"
              }`}
            >
              Wallet
            </button>
          </div>

          {/* Content */}
          <div className="space-y-6">
            {activeTab === "email" ? (
              <form onSubmit={handleEmailSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-[#56745B] text-sm">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    className="bg-[#2D302D] py-5 my-3 border-[#444B44] text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[#56745B] text-sm">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    className="bg-[#2D302D] py-5 my-3 border-[#444B44] text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-[#56745B] py-3 text-sm">
                    Create Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    className="bg-[#2D302D] py-5 my-3 border-[#444B44] text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-[#56745B] py-3 text-sm">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    className="bg-[#2D302D] py-5 my-3 border-[#444B44] text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#288C3B] text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2"
                >
                  <ArrowLeftRight className="w-4 h-4" />
                  Sign Up
                </Button>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="text-center">
                  <p className="text-[#56745B] text-sm">Connect your wallet to get started</p>
                </div>

                <ConnectButton.Custom>
                  {({
                    account,
                    chain,
                    openAccountModal,
                    openChainModal,
                    openConnectModal,
                    mounted,
                  }) => {
                    const ready = mounted
                    const connected = ready && account && chain

                    return (
                      <div
                        className="w-full bg-[#288C3B] hover:bg-green-600 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 cursor-pointer"
                        aria-hidden={!ready}
                        onClick={
                          !connected
                            ? openConnectModal
                            : chain.unsupported
                            ? openChainModal
                            : openAccountModal
                        }
                      >
                        <Wallet className="w-4 h-4" />
                        {(() => {
                          if (!connected) return <span>Connect Wallet</span>
                          if (chain.unsupported) return <span>Wrong network</span>
                          return <span>{account.displayName}</span>
                        })()}
                      </div>
                    )
                  }}
                </ConnectButton.Custom>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-[#56745B]">
            {"Already have an account? "}
            <Link href="/login" className="text-[#288C3B]">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
