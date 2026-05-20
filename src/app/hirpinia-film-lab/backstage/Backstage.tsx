"use client";

import Footer from "@/components/Footer";
import Metadata from "@/components/Metadata";
import Navbar from "@/components/Navbar";
import { useNav } from "@/contexts/NavContext";
import { useSearchParams } from "next/navigation";
import { useRef, useState, Activity, Suspense } from "react";
import { FiInfo, FiCheck, FiX } from "react-icons/fi";

const FORM_TEXT_INPUTS: {
  label: string;
  id: string;
}[] = [
  {
    id: "firstName",
    label: "Nome",
  },
  {
    id: "lastName",
    label: "Cognome",
  },
];

type UploadSession = {
  name: string;
  size: number;
  type: string;
  uploadUrl: string;
};

const RESUMABLE_CHUNK_SIZE = 4 * 1024 * 1024;
const MAX_FILES = 300;

const getUploadBatchSize = () => {
  const connection = (
    navigator as Navigator & {
      connection?: {
        effectiveType?: string;
      };
    }
  ).connection;

  const effectiveType = connection?.effectiveType;

  if (effectiveType === "slow-2g" || effectiveType === "2g") {
    return 1;
  }

  if (effectiveType === "3g") {
    return 2;
  }

  return 3;
};

export default function Backstage() {
  const { isNavOpen } = useNav();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [fileError, setFileError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResponse, setSubmissionResponse] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const fileKey = (file: File) =>
    `${file.name}-${file.size}-${file.lastModified}`;

  const isAllowedMediaFile = (file: File) => {
    if (file.type.startsWith("image/") || file.type.startsWith("video/")) {
      return true;
    }

    const allowedExtensions = [
      ".jpg",
      ".jpeg",
      ".png",
      ".gif",
      ".webp",
      ".avif",
      ".heic",
      ".heif",
      ".mp4",
      ".mov",
      ".webm",
      ".m4v",
      ".avi",
      ".mkv",
    ];

    const lowerCaseName = file.name.toLowerCase();

    return allowedExtensions.some((extension) =>
      lowerCaseName.endsWith(extension)
    );
  };

  const addFiles = (incomingFiles: FileList | File[]) => {
    const files = Array.from(incomingFiles);
    const validFiles = files.filter((file) => isAllowedMediaFile(file));
    const invalidFiles = files.length - validFiles.length;

    if (invalidFiles > 0) {
      setFileError("Solo immagini e video sono consentiti.");
    } else {
      setFileError("");
    }

    if (validFiles.length === 0) {
      return;
    }

    setSelectedFiles((currentFiles) => {
      const mergedFiles = [...currentFiles];
      const uniqueFilesToAdd = validFiles.filter(
        (file) =>
          !mergedFiles.some(
            (existingFile) => fileKey(existingFile) === fileKey(file)
          )
      );
      const availableSlots = Math.max(0, MAX_FILES - mergedFiles.length);
      const filesToAdd = uniqueFilesToAdd.slice(0, availableSlots);

      mergedFiles.push(...filesToAdd);

      if (uniqueFilesToAdd.length > filesToAdd.length) {
        setFileError(`Puoi selezionare al massimo ${MAX_FILES} file.`);
      } else if (invalidFiles === 0) {
        setFileError("");
      }

      return mergedFiles;
    });
  };

  const handleFileSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      addFiles(event.target.files);
      event.target.value = "";
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    if (event.dataTransfer.files.length > 0) {
      addFiles(event.dataTransfer.files);
    }
  };

  const removeFile = (fileToRemove: File) => {
    setSelectedFiles((currentFiles) =>
      currentFiles.filter((file) => fileKey(file) !== fileKey(fileToRemove))
    );
  };

  const formatFileSize = (size: number) => {
    if (size < 1024 * 1024) {
      return `${Math.max(1, Math.round(size / 1024))} KB`;
    }

    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const uploadFileViaSession = async (
    file: File,
    uploadUrl: string
  ): Promise<{ id: string }> => {
    if (!code) {
      throw new Error("Missing authorization code");
    }

    let offset = 0;

    while (offset < file.size) {
      const chunkEnd = Math.min(offset + RESUMABLE_CHUNK_SIZE, file.size);
      const chunk = file.slice(offset, chunkEnd);
      const rangeEnd = chunkEnd - 1;

      const response = await fetch(
        `/api/backstage-upload/chunk?code=${encodeURIComponent(code)}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": file.type || "application/octet-stream",
            "Content-Range": `bytes ${offset}-${rangeEnd}/${file.size}`,
            "X-Upload-Url": uploadUrl,
          },
          body: chunk,
        }
      );

      if (response.status === 308) {
        const rangeHeader = response.headers.get("range");

        if (rangeHeader) {
          const match = rangeHeader.match(/bytes=0-(\d+)/i);

          if (match) {
            offset = Number(match[1]) + 1;
            continue;
          }
        }

        offset = chunkEnd;
        continue;
      }

      if (!response.ok) {
        throw new Error(`Resumable upload failed for ${file.name}`);
      }

      const data = (await response.json()) as { id?: string };

      if (!data.id) {
        throw new Error(`Missing file ID after uploading ${file.name}`);
      }

      return { id: data.id };
    }

    throw new Error(`Upload incomplete for ${file.name}`);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!code) {
      setSubmissionResponse({
        success: false,
        message:
          "Il codice di autorizzazione è mancante. Controlla il tuo link.",
      });
      return;
    }

    if (selectedFiles.length === 0) {
      setSubmissionResponse({
        success: false,
        message: "Seleziona almeno un file.",
      });
      return;
    }

    const formElement = event.currentTarget;
    const firstName = (
      formElement.querySelector("#firstName") as HTMLInputElement
    )?.value;
    const lastName = (
      formElement.querySelector("#lastName") as HTMLInputElement
    )?.value;

    if (!firstName?.trim() || !lastName?.trim()) {
      setSubmissionResponse({
        success: false,
        message: "Inserisci il tuo nome e il tuo cognome.",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmissionResponse(null);

    try {
      const initResponse = await fetch(
        `/api/backstage-upload?code=${encodeURIComponent(code)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName,
            lastName,
            files: selectedFiles.map((file) => ({
              name: file.name,
              size: file.size,
              type: file.type,
            })),
          }),
        }
      );

      const data = (await initResponse.json()) as {
        success?: boolean;
        message?: string;
        error?: string;
        folderName?: string;
        uploadSessions?: UploadSession[];
      };

      if (!initResponse.ok) {
        setSubmissionResponse({
          success: false,
          message: data.error || "Caricamento fallito, riprova più tardi.",
        });
        return;
      }

      const uploadSessions = data.uploadSessions ?? [];

      if (uploadSessions.length === 0) {
        setSubmissionResponse({
          success: false,
          message: "Nessuna sessione di upload è stata creata.",
        });
        return;
      }

      const uploadedResults: Array<{ name: string; id: string; size: number }> =
        [];

      const uploadBatchSize = getUploadBatchSize();

      for (
        let index = 0;
        index < uploadSessions.length;
        index += uploadBatchSize
      ) {
        const batchSessions = uploadSessions.slice(
          index,
          index + uploadBatchSize
        );
        const batchFiles = selectedFiles.slice(index, index + uploadBatchSize);

        const batchResults = await Promise.all(
          batchSessions.map(async (session, batchIndex) => {
            const file = batchFiles[batchIndex];

            if (!file) {
              throw new Error("Upload session/file mismatch.");
            }

            const uploadedFile = await uploadFileViaSession(
              file,
              session.uploadUrl
            );

            return {
              name: file.name,
              id: uploadedFile.id,
              size: file.size,
            };
          })
        );

        uploadedResults.push(...batchResults);
      }

      setSubmissionResponse({
        success: true,
        message: `Caricati con successo ${uploadedResults.length} file su Google Drive.`,
      });
      setSelectedFiles([]);
      formElement.reset();
    } catch {
      setSubmissionResponse({
        success: false,
        message: "Errore di rete. Riprova più tardi.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Metadata
        title="HirpiniaFilmLab - Frame"
        description="Laboratorio cinematografico dedicato alla formazione audiovisiva e alla crescita di giovani filmmaker. Hirpinia Film Lab unisce teoria e pratica per sviluppare nuove produzioni e voci del cinema indipendente."
        keywords="laboratorio cinematografico, formazione audiovisiva, cinema indipendente, filmmaking, produzione video, Irpinia film lab, corsi cinema"
      />

      <main className="h-dvh">
        <Navbar hasLeftPadding fixed />

        <Activity mode={isNavOpen ? "hidden" : "visible"}>
          <div className="pt-32 mx-auto text-left xl:w-half-width flex flex-col text-white">
            <div className="bg-secondary p-8 flex flex-col gap-4">
              <div className="border-l-accent border-l-2 flex flex-col px-8">
                <div className="font-family-secondary">
                  Caricamento materiale backstage
                </div>
                <div className="font-family-regular-md">
                  Hai registrato del materiale backstage durante le riprese?
                  Caricalo qui!
                </div>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col my-8">
                <div className="flex flex-row w-full gap-4">
                  {FORM_TEXT_INPUTS.map(({ id, label }, index) => (
                    <div
                      key={`form-input-${index}`}
                      className="flex flex-col items-start relative w-full"
                    >
                      <input
                        type="text"
                        name={id}
                        id={id}
                        className="border-b border-b-white focus:border-b-accent outline-0 peer w-full"
                        placeholder=" "
                      />

                      <label
                        htmlFor={id}
                        className="absolute top-0 peer-focus:-top-5 peer-[:not(:placeholder-shown)]:-top-5 peer-focus:text-accent transition-all duration-(--transition-duration) cursor-text"
                      >
                        {label}
                      </label>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-col gap-4">
                  <input
                    ref={fileInputRef}
                    type="file"
                    name="media"
                    id="media"
                    accept="image/*,video/*"
                    multiple
                    onChange={handleFileSelection}
                    className="sr-only"
                  />

                  <div
                    role="button"
                    tabIndex={0}
                    onClick={openFilePicker}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        openFilePicker();
                      }
                    }}
                    onDragOver={(event) => {
                      event.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragEnter={(event) => {
                      event.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    className={`flex cursor-pointer flex-col gap-4 border border-dashed px-6 py-6 transition-all duration-(--transition-duration) ${
                      isDragging
                        ? "border-accent bg-accent/10"
                        : "border-white/30 bg-white/5 hover:border-white/60"
                    }`}
                  >
                    <div className="flex flex-col gap-1">
                      <div className="font-family-secondary text-lg text-white">
                        Carica file
                      </div>
                      <div className="font-family-regular-md text-white/70">
                        Trascina qui foto o video, oppure clicca per
                        selezionarli.
                      </div>
                      <div className="text-sm text-white/55">
                        Puoi caricare fino a {MAX_FILES} file.
                      </div>
                    </div>
                  </div>

                  {fileError ? (
                    <div className="border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                      {fileError}
                    </div>
                  ) : null}

                  {selectedFiles.length > 0 ? (
                    <div className="flex flex-col gap-3">
                      <div className="font-family-secondary text-sm uppercase tracking-[0.2em] text-white/70">
                        Selected files
                      </div>

                      <div className="flex flex-col gap-2">
                        {selectedFiles.map((file) => (
                          <div
                            key={fileKey(file)}
                            className="flex items-center justify-between gap-4 border border-white/15 bg-black/20 px-4 py-3"
                          >
                            <div className="min-w-0 flex flex-col">
                              <span className="truncate font-family-regular-md text-white">
                                {file.name}
                              </span>
                              <span className="text-sm text-white/55">
                                {formatFileSize(file.size)}
                              </span>
                            </div>

                            <button
                              type="button"
                              onClick={() => removeFile(file)}
                              className="shrink-0 border border-white/20 px-3 py-1 text-sm text-white/80 transition-colors hover:border-accent hover:text-accent"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  <div className="mt-4 flex flex-col gap-3">
                    <button
                      type="submit"
                      disabled={isSubmitting || selectedFiles.length === 0}
                      className={`
                        w-fit border px-4 py-2 text-sm font-family-secondary
                        transition-all duration-(--transition-duration)
                        ${
                          isSubmitting || selectedFiles.length === 0
                            ? "cursor-not-allowed border-white/10 text-white/40"
                            : "cursor-pointer border-white/20 text-white hover:border-accent hover:bg-accent/10 hover:text-accent"
                        }
                      `}
                    >
                      {isSubmitting ? "Caricamento..." : "Invia"}
                    </button>

                    <div className="flex max-w-3xl items-center gap-2 text-sm leading-relaxed text-white/60">
                      <FiInfo className="mt-0.5 shrink-0 text-white/40" />
                      <p>
                        Inviando questo modulo, acconsenti all&apos;utilizzo,
                        pubblicazione e condivisione delle foto e dei video per
                        il progetto &quot;Hirpinia Film Lab&quot;, anche sui
                        social media e materiali promozionali.
                      </p>
                    </div>

                    {submissionResponse ? (
                      <div
                        className={`
                          flex items-center gap-3 border px-4 py-3 text-sm
                          ${
                            submissionResponse.success
                              ? "border-green-500/40 bg-green-500/10 text-green-200"
                              : "border-red-500/40 bg-red-500/10 text-red-200"
                          }
                        `}
                      >
                        {submissionResponse.success ? (
                          <FiCheck className="shrink-0" />
                        ) : (
                          <FiX className="shrink-0" />
                        )}
                        <p>{submissionResponse.message}</p>
                      </div>
                    ) : null}
                  </div>
                </div>
              </form>
            </div>
          </div>
          <Suspense fallback={<Footer usesDate={false} />}>
            <Footer />
          </Suspense>
        </Activity>
      </main>
    </>
  );
}
