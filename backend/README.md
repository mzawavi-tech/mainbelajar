# Setup kod auto (Awie buat sendiri, ~15 minit)

1. Supabase: buat project baru (atau guna sedia ada) > SQL Editor > paste `schema.sql` > Run.
2. ToyyibPay: dapatkan `userSecretKey` dan buat 1 Category > salin `categoryCode`. (Cuba dulu guna sandbox dev.toyyibpay.com.)
3. Brevo: SMTP & API > buat API key. Sahkan emel pengirim (Senders).
4. Pasang Supabase CLI, kemudian dalam folder `backend`:
   supabase login
   supabase link --project-ref <PROJECT_REF>
   supabase secrets set TOYYIB_SECRET=... TOYYIB_CATEGORY=... BREVO_API_KEY=... BREVO_SENDER=emel@domain.com SITE_URL=https://mzawavi-tech.github.io/mainbelajar
   (sandbox: tambah TOYYIB_BASE=https://dev.toyyibpay.com)
   supabase functions deploy create-bill --no-verify-jwt
   supabase functions deploy toyyib-callback --no-verify-jwt
   supabase functions deploy verify-code --no-verify-jwt
5. Beritahu Claude `PROJECT_REF` sahaja (bukan key). Claude akan isi URL dalam `beli/index.html` dan `mb.js`, dan buang kod statik.
