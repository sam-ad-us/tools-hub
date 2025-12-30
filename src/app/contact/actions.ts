"use server";

import { z } from "zod";

const formSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
});

export async function sendContactMessage(values: z.infer<typeof formSchema>) {
  // Here you would typically send an email, save to a database, etc.
  // For this example, we'll just simulate a successful submission.
  console.log("Received contact form submission:", values);

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Simulate a potential error
  if (values.email.includes("error")) {
    return {
      success: false,
      message: "This email address is blocked.",
    };
  }

  return {
    success: true,
    message: "Message sent successfully!",
  };
}
