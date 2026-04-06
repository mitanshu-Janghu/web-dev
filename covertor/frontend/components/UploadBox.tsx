"use client";

import type { DragEvent } from "react";
import { useMemo, useState } from "react";
import { ToolDefinition } from "@/lib/tools";

type UploadBoxProps = {
  tool: ToolDefinition;
};

type Phase = "idle" | "uploading" | "converting" | "done" | "error";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export function UploadBox({ tool }: UploadBoxProps) {
  const [file, setFile] = useState<File | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [progress, setProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [error, setError] = useState("");
  const [statusText, setStatusText] = useState("Choose a file to begin.");

  const phaseLabel = useMemo(() => {
    switch (phase) {
      case "uploading":
        return "Uploading";
      case "converting":
        return "Converting";
      case "done":
        return "Ready";
      case "error":
        return "Retry";
      default:
        return "Upload";
    }
  }, [phase]);

  const isBusy = phase === "uploading" || phase === "converting";

  function resetTransientState() {
    setProgress(0);
    setDownloadUrl("");
    setError("");
  }

  function handlePickedFile(nextFile: File | null) {
    if (!nextFile) {
      return;
    }

    setFile(nextFile);
    setPhase("idle");
    setStatusText(`${nextFile.name} selected.`);
    resetTransientState();
  }

  function handleDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    if (isBusy) {
      return;
    }

    const droppedFile = event.dataTransfer.files?.[0] ?? null;
    handlePickedFile(droppedFile);
  }

  async function uploadAndConvert() {
    if (!file || isBusy) {
      return;
    }

    resetTransientState();
    setPhase("uploading");
    setStatusText("Uploading your file securely...");

    try {
      const uploadResult = await uploadFile(file);
      setPhase("converting");
      setProgress(72);
      setStatusText(`Running ${tool.shortLabel} conversion...`);

      const convertResponse = await fetch(`${API_URL}/convert/${tool.slug}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileName: uploadResult.file.storedName,
        }),
      });

      const convertPayload = await convertResponse.json();

      if (!convertResponse.ok) {
        throw new Error(convertPayload.error ?? "Conversion failed");
      }

      setDownloadUrl(`${API_URL}${convertPayload.file.downloadUrl}`);
      setProgress(100);
      setPhase("done");
      setStatusText("Conversion complete. Your file is ready to download.");
    } catch (nextError) {
      setPhase("error");
      setProgress(0);
      setError(nextError instanceof Error ? nextError.message : "Something went wrong");
      setStatusText("We couldn't complete that conversion.");
    }
  }

  function uploadFile(selectedFile: File) {
    return new Promise<{ file: { storedName: string } }>((resolve, reject) => {
      const formData = new FormData();
      formData.append("tool", tool.slug);
      formData.append("file", selectedFile);

      const request = new XMLHttpRequest();
      request.open("POST", `${API_URL}/upload`);

      request.upload.onprogress = (event) => {
        if (!event.lengthComputable) {
          return;
        }

        const nextProgress = Math.min(65, Math.round((event.loaded / event.total) * 65));
        setProgress(nextProgress);
      };

      request.onload = () => {
        try {
          const payload = JSON.parse(request.responseText);

          if (request.status < 200 || request.status >= 300) {
            reject(new Error(payload.error ?? "Upload failed"));
            return;
          }

          resolve(payload);
        } catch {
          reject(new Error("Upload response was invalid"));
        }
      };

      request.onerror = () => reject(new Error("Upload failed. Check backend connectivity."));
      request.send(formData);
    });
  }

  return (
    <section className="premium-card relative overflow-hidden rounded-[2.25rem] px-6 py-6 text-white shadow-soft">
      <div className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.22),transparent_68%)]" />
      <div className="space-y-6">
        <div className="relative space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/60">Start converting</p>
              <h2 className="mt-2 font-display text-3xl text-white">{tool.name}</h2>
            </div>
            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Free plan
            </span>
          </div>
          <p className="text-sm leading-7 text-white/70">{tool.acceptedFormatsLabel}</p>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-[1.35rem] border border-white/10 bg-white/10 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-white/50">Speed</p>
              <p className="mt-2 text-sm font-semibold text-white">Quick turnaround</p>
            </div>
            <div className="rounded-[1.35rem] border border-white/10 bg-white/10 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-white/50">Security</p>
              <p className="mt-2 text-sm font-semibold text-white">Validated uploads</p>
            </div>
            <div className="rounded-[1.35rem] border border-white/10 bg-white/10 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-white/50">Upgrade</p>
              <p className="mt-2 text-sm font-semibold text-white">Pro removes ads</p>
            </div>
          </div>
        </div>

        <label
          onDrop={handleDrop}
          onDragOver={(event) => event.preventDefault()}
          className="relative flex min-h-64 cursor-pointer flex-col items-center justify-center rounded-[1.9rem] border border-dashed border-white/20 bg-white/10 px-6 text-center transition hover:border-accent/70 hover:bg-white/10"
        >
          <input
            type="file"
            accept={tool.accept}
            className="hidden"
            disabled={isBusy}
            onChange={(event) => handlePickedFile(event.target.files?.[0] ?? null)}
          />
          <div className="space-y-3">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-2xl shadow-[0_0_0_12px_rgba(255,255,255,0.03)]">
              {phase === "done" ? "✓" : "↑"}
            </div>
            <p className="text-lg font-semibold text-white">Drag and drop your file here</p>
            <p className="text-sm text-white/60">or tap to browse from your device</p>
          </div>
        </label>

        <div className="space-y-3 rounded-[1.75rem] border border-white/10 bg-white/10 p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-white">{phaseLabel}</p>
              <p className="text-sm text-white/60">{file ? file.name : statusText}</p>
            </div>
            <p className="text-sm font-semibold text-accent">{progress}%</p>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-accent transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-white/70">{statusText}</p>
          {error ? <p className="text-sm text-rose-300">{error}</p> : null}
          {file ? (
            <div className="rounded-[1.35rem] border border-white/10 bg-black/10 px-4 py-3 text-sm text-white/70">
              Selected file: <span className="font-semibold text-white">{file.name}</span>
            </div>
          ) : null}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={uploadAndConvert}
            disabled={!file || isBusy}
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-accent px-6 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isBusy ? "Processing..." : `Convert ${tool.shortLabel}`}
          </button>
          <a
            href={downloadUrl || undefined}
            download
            className={`inline-flex min-h-12 items-center justify-center rounded-full border border-white/20 px-6 text-sm font-semibold text-white transition hover:bg-white/10 ${
              downloadUrl ? "" : "pointer-events-none opacity-50"
            }`}
            aria-disabled={!downloadUrl}
          >
            {tool.outputLabel}
          </a>
        </div>

        <div className="rounded-[1.75rem] border border-white/10 bg-white/10 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-white">Upgrade to Pro</p>
              <p className="mt-2 text-sm leading-7 text-white/70">
                Offer this upsell to remove ads, increase file limits, and give users a more premium workflow.
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-white/60">
                Files are auto-deleted after processing windows expire.
              </p>
            </div>
            <a
              href="/#pricing"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/20 px-5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              View plans
            </a>
          </div>
        </div>

        {phase === "done" ? (
          <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[1.5rem] border border-dashed border-accent/50 bg-accent/10 p-5">
              <p className="text-sm font-semibold text-white">AdSense placeholder</p>
              <p className="mt-2 text-sm leading-7 text-white/70">
                Show a monetization unit here after conversion. Replace this block with your AdSense script or sponsored CTA.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-white/10 p-5">
              <p className="text-sm font-semibold text-white">Premium no-ad alternative</p>
              <p className="mt-2 text-sm leading-7 text-white/70">
                Paying users can skip this ad unit and go straight to a cleaner post-conversion success state.
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
