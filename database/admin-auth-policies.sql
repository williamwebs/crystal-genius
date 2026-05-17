-- Apply this in the Supabase SQL editor if authenticated admin writes are still
-- blocked after the app-side fixes. The current app treats any authenticated
-- user who reaches the admin area as an admin user.

alter table public.drawings enable row level security;
alter table public.projects enable row level security;
alter table public.admin_settings enable row level security;

drop policy if exists "Authenticated users can manage drawings" on public.drawings;
drop policy if exists "Authenticated users can read drawings" on public.drawings;
drop policy if exists "Authenticated users can insert drawings" on public.drawings;
drop policy if exists "Authenticated users can update drawings" on public.drawings;
drop policy if exists "Authenticated users can delete drawings" on public.drawings;

create policy "Authenticated users can read drawings"
on public.drawings
for select
to authenticated
using (true);

create policy "Authenticated users can insert drawings"
on public.drawings
for insert
to authenticated
with check (true);

create policy "Authenticated users can update drawings"
on public.drawings
for update
to authenticated
using (true)
with check (true);

create policy "Authenticated users can delete drawings"
on public.drawings
for delete
to authenticated
using (true);

drop policy if exists "Authenticated users can read projects" on public.projects;
drop policy if exists "Authenticated users can insert projects" on public.projects;
drop policy if exists "Authenticated users can update projects" on public.projects;
drop policy if exists "Authenticated users can delete projects" on public.projects;

create policy "Authenticated users can read projects"
on public.projects
for select
to authenticated
using (true);

create policy "Authenticated users can insert projects"
on public.projects
for insert
to authenticated
with check (true);

create policy "Authenticated users can update projects"
on public.projects
for update
to authenticated
using (true)
with check (true);

create policy "Authenticated users can delete projects"
on public.projects
for delete
to authenticated
using (true);

drop policy if exists "Users can read own admin settings" on public.admin_settings;
create policy "Users can read own admin settings"
on public.admin_settings
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can insert own admin settings" on public.admin_settings;
create policy "Users can insert own admin settings"
on public.admin_settings
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "Users can update own admin settings" on public.admin_settings;
create policy "Users can update own admin settings"
on public.admin_settings
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Authenticated users can upload admin drawing assets" on storage.objects;
create policy "Authenticated users can upload admin drawing assets"
on storage.objects
for insert
to authenticated
with check (bucket_id in ('drawing-previews', 'drawing-files'));

drop policy if exists "Authenticated users can update admin drawing assets" on storage.objects;
create policy "Authenticated users can update admin drawing assets"
on storage.objects
for update
to authenticated
using (bucket_id in ('drawing-previews', 'drawing-files'))
with check (bucket_id in ('drawing-previews', 'drawing-files'));

drop policy if exists "Authenticated users can delete admin drawing assets" on storage.objects;
create policy "Authenticated users can delete admin drawing assets"
on storage.objects
for delete
to authenticated
using (bucket_id in ('drawing-previews', 'drawing-files'));

drop policy if exists "Authenticated users can upload admin project assets" on storage.objects;
create policy "Authenticated users can upload admin project assets"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'project-images');

drop policy if exists "Authenticated users can update admin project assets" on storage.objects;
create policy "Authenticated users can update admin project assets"
on storage.objects
for update
to authenticated
using (bucket_id = 'project-images')
with check (bucket_id = 'project-images');

drop policy if exists "Authenticated users can delete admin project assets" on storage.objects;
create policy "Authenticated users can delete admin project assets"
on storage.objects
for delete
to authenticated
using (bucket_id = 'project-images');
