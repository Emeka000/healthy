"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeftRight, Wallet } from "lucide-react"
import Link from "next/link"
import { ConnectButton } from "@rainbow-me/rainbowkit"

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<"email" | "wallet">("email")

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Email login submitted")
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white border border-gray-500 rounded-lg p-8 space-y-6">
          {/* Header */}
          <div className="text-start space-y-2">
            <h1 className="text-2xl font-semibold text-[#288C3B]">Login To Your Account</h1>
            <p className="text-[#B9B9B9] text-sm">To view get started</p>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 bg-white border border-gray-400 p-1 rounded-lg">
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
              <form onSubmit={handleEmailLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[#56745B] text-sm">
                    Enter Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    className="bg-white py-5 my-3 border-[#444B44] text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-[#56745B] py-3 text-sm">
                    Enter Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    className="bg-white py-5 my-3 border-[#444B44] text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </div>

                <div className="text-start">
                  <Link href="/forgot-password" className="text-[#288C3B] text-s">
                    Forget Password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#288C3B] text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2"
                >
                  <ArrowLeftRight className="w-4 h-4" />
                  Login
                </Button>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="text-center">
                  <p className="text-[#56745B] text-sm">Connect your wallet to continue</p>
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
            {"Don't have an account? "}
            <Link href="/signup" className="text-[#288C3B]">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
