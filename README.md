# Joan Property Friend

Joan Property Friend is a Next.js site for houses, apartments, and land in Mombasa, Kilifi, Malindi, and Kwale. An admin desk adds properties and blog posts, and those records appear on the public pages.

## Run it locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The desk is at [http://localhost:3000/admin](http://localhost:3000/admin). On the live site, sign in with an email and password created in Supabase Authentication. Until Supabase is connected, the local password is `joan-property`.

Without Supabase keys, listings, posts, and enquiries are stored in `data/db.json` on this computer. That file is not committed.

## Admin desk

- **Property** adds and edits a listing. Photos can be chosen from the device, or pasted as a link.
- **Blog** does the same for a post and its cover photo.
- **Preview** on the property list or the blog list opens that page on the desk, without the public header.
- **Messages** shows enquiries sent from the public forms.
- **Team** lets an admin create another admin or manager. They sign in with that email and password.

Uploaded photos are saved in `public/uploads`.

## Supabase

1. Create a project and run `supabase/schema.sql` in the SQL editor.
2. Copy `.env.example` to `.env.local`.
3. Set `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and `ADMIN_SECRET` in Vercel and in `.env.local`.
4. In Supabase, open Authentication and add the first user with an email and password. Confirm the user. Leave public sign-up off if only invited people should enter the desk.
5. Restart the site. Sign in with that email and password, then use **Team** to create other admins and managers.
6. Open **Settings** and choose **Copy starter listings into Supabase**.

After that, the desk writes to Supabase and the public site reads from it. A user created in the Supabase dashboard signs in as an admin. A login created from **Team** is an admin or a manager, and only an admin can add more logins.
