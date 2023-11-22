# Images

Anytime you add an image to Svelte, you need to import it as if it
were a module/function/class from another file. You can see +layout.svelte
for an example of this, where the images for the sun and moon are imported
into the files.

# Environment variables

After you get the .env.development.local file in the root of the project directory,
you have to import each of the variables (e.g. POSTGRES_URL) in the "+page.server.ts" files.
This is similar to how you have to import images in order to use them.