# File Converter Pro

File Converter Pro is a complete SaaS-style web app for fast browser-based file conversion. It includes a Next.js frontend, an Express backend, drag-and-drop uploads, progress UI, SEO metadata, rate limiting, and placeholder monetization after successful conversions.

## Features

- MP4 to MP3 conversion with FFmpeg
- PDF to Word conversion with LibreOffice CLI
- Image to PDF conversion with ImageMagick
- Minimal mobile-responsive UI with drag-and-drop uploads
- Progress bar, loading state, download action, and post-conversion ad placeholder
- 10MB free-plan file limit
- No-login usage
- Input validation, safe generated filenames, and shell-free command execution
- Automatic cleanup of uploaded and output files after 10 minutes
- Simple daily rate limiting at 5 upload/conversion starts per IP
- SEO-friendly metadata, headings, `robots.txt`, and `sitemap.xml`

## Project structure

```text
frontend/
  app/
    page.tsx
    mp4-to-mp3/page.tsx
    pdf-to-word/page.tsx
    image-to-pdf/page.tsx
  components/
    UploadBox.tsx

backend/
  server.js
  routes/
  uploads/
  outputs/
```

## Tech stack

- Frontend: Next.js App Router, React, Tailwind CSS
- Backend: Node.js, Express, Multer, child_process
- Conversion tools: FFmpeg, LibreOffice CLI, ImageMagick

## Local setup

### 1. Install Node.js

Use Node.js 20 or newer.

### 2. Install system conversion tools

#### Ubuntu

```bash
sudo apt update
sudo apt install -y ffmpeg libreoffice imagemagick
```

Verify:

```bash
ffmpeg -version
soffice --version
convert -version
```

#### Windows

Recommended package managers:

```powershell
choco install ffmpeg libreoffice imagemagick -y
```

Verify:

```powershell
ffmpeg -version
soffice --version
magick -version
```

Notes:

- On Windows, ImageMagick usually runs through `magick` instead of `convert`.
- If needed, set `IMAGEMAGICK_COMMAND=magick` in `backend/.env`.
- Make sure the installed binaries are available on your `PATH`.

### 3. Configure environment variables

Backend:

```bash
cp backend/.env.example backend/.env
```

Frontend:

```bash
cp frontend/.env.local.example frontend/.env.local
```

### 4. Install dependencies

Backend:

```bash
cd backend
npm install
```

Frontend:

```bash
cd frontend
npm install
```

## Run commands

Backend:

```bash
cd backend
npm run dev
```

Frontend:

```bash
cd frontend
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Backend API

### `POST /upload`

Accepts multipart form data:

- `tool`: `mp4-to-mp3` | `pdf-to-word` | `image-to-pdf`
- `file`: uploaded file

Response:

```json
{
  "message": "Upload complete",
  "file": {
    "storedName": "generated-file-name.mp4",
    "originalName": "video.mp4",
    "size": 123456
  }
}
```

### `POST /convert/mp4-to-mp3`

Request:

```json
{
  "fileName": "generated-file-name.mp4"
}
```

### `POST /convert/pdf-to-word`

Request:

```json
{
  "fileName": "generated-file-name.pdf"
}
```

### `POST /convert/image-to-pdf`

Request:

```json
{
  "fileName": "generated-file-name.png"
}
```

### `GET /download/:file`

Downloads the converted output file.

## Security and performance notes

- File size is limited to 10MB per upload.
- File types are validated by tool and extension.
- Generated filenames are validated before file system access.
- Converters run through `spawn()` without shell interpolation to prevent command injection.
- Uploaded and generated files are scheduled for deletion after 10 minutes.
- The frontend shows upload and conversion progress states.

## Deployment guide

### Free-friendly option

- Deploy the frontend on Vercel Hobby for demos, portfolios, or non-commercial testing rather than a live paid SaaS.
- Deploy the backend on an Oracle Cloud Always Free VM, or deploy both frontend and backend there if you want a fully free stack.
- Use the included `backend/Dockerfile` to install FFmpeg, LibreOffice, and ImageMagick consistently.
- Set frontend environment variable `NEXT_PUBLIC_API_URL` to the deployed backend URL.
- Set frontend environment variable `NEXT_PUBLIC_SITE_URL` to the deployed frontend URL.
- Set backend environment variable `CORS_ORIGIN` to the deployed frontend URL.
- If you deploy both apps on one VM, place Nginx in front and route `/api` traffic to the backend.

### Suggested production approach

1. Deploy the frontend on a commercial-ready host or paid plan.
2. Deploy the backend with Docker so FFmpeg, LibreOffice, and ImageMagick are installed at build time.
3. Add a reverse proxy or HTTPS endpoint.
4. Replace the AdSense placeholder block with your live ad snippet.
5. Move rate limiting to Redis if you need shared limits across multiple backend instances.

## Build commands

Frontend:

```bash
cd frontend
npm run build
npm run start
```

Backend:

```bash
cd backend
npm start
```
