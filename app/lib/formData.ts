/**
 * Safe form value extraction. FormDataEntryValue can be string | File;
 * calling .trim() or other string methods on a File throws.
 */
export function safeFormString(v: FormDataEntryValue | null): string {
  return typeof v === "string" ? v.trim() : "";
}
