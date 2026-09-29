# Phonemica

Interactive phonology course: lessons, vowel space, rule derivations, and Optimality Theory tableaux.
Works fully offline. No API key needed.

## Get the APK

1. Create a new GitHub repository.
2. Upload these files to the repo root (see below for phone tips).
3. Open the **Actions** tab. The "Build Android APK" workflow starts by itself (about 5–8 minutes).
4. When it finishes, open the repo's **Releases** page and download `Phonemica.apk`.
   (It is also under the run's Artifacts as a zip.)
5. Install it on your phone. Android will ask you to allow installs from your browser or file manager.

## Uploading from a phone

GitHub's web upload can't take folders or zip files, so:

1. Unzip this project on your phone.
2. On the repo page: Add file → Upload files → select all the files in the top level (not folders), then Commit.
3. Add file → Create new file. In the name box type `.github/workflows/build-apk.yml`
   (typing the slashes creates the folders), paste in the contents of `build-apk.yml`, then Commit.

On a computer you can simply drag the whole folder contents into the upload page.

## Run locally

    npm install
    npm run dev
