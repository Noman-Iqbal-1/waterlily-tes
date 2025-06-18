"use server";

import { redirect } from "next/navigation";
import { createUser } from "../../user.service";

export async function handleCreateUser(formData: FormData) {
  const email = formData.get("email");
  if (!email || typeof email !== "string") {
    redirect("/get-started?error=Email%20is%20required");
  }
  try {
    await createUser(email as string);
  } catch (err: unknown) {
    let msg = "Something went wrong";
    if (err instanceof Error) {
      msg = err.message;
    }
    msg = encodeURIComponent(msg);
    redirect(`/get-started?error=${msg}`);
  }

  redirect("/survey");
}
