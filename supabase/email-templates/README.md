# Auth email templates (account activation)

The signup **activation email** is sent by **Supabase Auth**, not by the app, so
it is customised in the Supabase dashboard. This folder version-controls the
branded HTML so it's easy to copy and keep in sync.

## Apply the branded "activate your account" email

1. Open **Supabase Dashboard → Authentication → Emails → "Confirm signup"**.
2. **Subject:** `Action Required: Activate your BoostMySkills account`
3. **Message body:** paste the contents of
   [`confirm-signup.html`](confirm-signup.html).
4. In that HTML, replace `LOGO_URL_HERE` with a **publicly reachable** logo URL
   (emails can't use relative paths) — e.g. `https://<your-domain>/images/logo.png`.
   Supabase fills `{{ .ConfirmationURL }}` with the one-time activation link.
5. Save. New signups now receive the branded activation email; the user **cannot
   sign in until they click the activation link** (this matches the project's
   `mailer_autoconfirm = false` setting — see the app README §3).

## Make the activation link land somewhere sensible

After the user clicks **Activate your account**, Supabase verifies them and
redirects to a URL it must trust. Set these so the link works on each environment:

- **Authentication → URL Configuration → Site URL:** your app's base URL
  (`http://localhost:3000` for local, your real domain in production).
- **Redirect URLs:** add the same origins (and any preview URLs).

The user is confirmed server-side on click; they then sign in at `/login` and
land on `/dashboard` ("My Micro-credentials").

## Optional — send from info@boostmyskills.eu (Custom SMTP)

By default Supabase sends from its own address (`noreply@mail.app.supabase.io`)
with low rate limits (a few/hour on the free tier) — fine for testing, not for
production. To send the activation email **from `info@boostmyskills.eu`** like the
live platform:

- **Authentication → Emails → SMTP Settings → Enable Custom SMTP**, and enter the
  host/port/username/password + sender name/address for `boostmyskills.eu`'s mail
  provider. Verify the sender domain (SPF/DKIM) so mail doesn't land in spam.

No app code change is required for any of the above — it's all Supabase project
configuration.
