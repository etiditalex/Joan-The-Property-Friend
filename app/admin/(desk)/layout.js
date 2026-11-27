import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { listEnquiries, listPosts, listProperties } from "@/lib/store";
import { DeskFrame } from "../frame";
import "../admin.css";

export const dynamic = "force-dynamic";

export const metadata = { title: "Admin | Joan Property Friend" };

export default async function DeskLayout({ children }) {
  if (!(await isAdmin())) redirect("/admin/login");
  const [properties, posts, enquiries] = await Promise.all([listProperties(), listPosts(), listEnquiries()]);
  return (
    <DeskFrame counts={{ properties: properties.length, posts: posts.length, enquiries: enquiries.length }}>
      {children}
    </DeskFrame>
  );
}
