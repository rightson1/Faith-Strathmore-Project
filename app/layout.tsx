"use client";
import "./globals.css";
import "./client.css";
import { Questrial, Manrope } from "@next/font/google";
import { useState } from "react";
import "yet-another-react-lightbox/styles.css";
import "react-loading-skeleton/dist/skeleton.css";
import ProgressBar from "next-nprogress-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/utils/AuthContext";
const questrail = Questrial({
  weight: "400",
  subsets: ["latin-ext", "vietnamese", "latin"],
  variable: "--font-quest",
});
const manrope = Manrope({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin-ext", "vietnamese", "latin"],
  variable: "--font-manrope",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <body
        className={` ${manrope.variable} ${questrail.variable} font-manrope w-screen overflow-x-hidden`}
      >
        <QueryClientProvider client={queryClient}>
          <Toaster />
          <AuthProvider>
            <ProgressBar
              height="6px"
              color="000"
              options={{ showSpinner: false }}
              shallowRouting
              appDirectory
            />
            {children}
          </AuthProvider>

          <ReactQueryDevtools />
        </QueryClientProvider>
      </body>
    </html>
  );
}
