import fs from "node:fs/promises";
import path from "node:path";

export async function uploadFile(file: File | string | null): Promise<string | null> {
  if (typeof file === "string") return file;

  if (!file || file.size === 0) return null;

  try {
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    // Buat directory
    await fs.mkdir(uploadDir, { recursive: true });

    // Generate unique prefix name
    const uniqueSuffix = `${Date.now()}${Math.round(Math.random() * 1e9)}`;
    const fileExtension = path.extname(file.name);
    const fileName = `${uniqueSuffix}${fileExtension}`;
    const filePath = path.join(uploadDir, fileName);

    // Upload file ke directory yang telah ditentukan
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await fs.writeFile(filePath, buffer);

    return `/uploads/${fileName}`;
  } catch (error) {
    console.log(error);
    throw new Error("Gagal memproses upload file foto.");
  }
}

export async function deleteFile(filePath: string) {
  try {
    const oldFilePath = path.join(process.cwd(), "public", filePath);
    await fs.unlink(oldFilePath);
  } catch (error) {
    console.log(error);
    throw new Error("Gagal menghapus file.");
  }
}
