export type DrawingType =
  | "residential"
  | "commercial"
  | "industrial"
  | "mixed-use"
  | "multi-family"
  | "interior-design"
  | "urban-planning";

export type DrawingStatus = "active" | "inactive" | "pending";

export type OrderStatus = "pending" | "approved" | "declined";

export type AssetStatus = "sent" | "pending" | "cancelled";

export type NotificationType = "order" | "message" | "system";

export type NotificationReferenceType = "orders" | "messages" | "drawings";

// ---------- Table Row Types ----------

export interface Drawing {
  id: string;
  title: string;
  price: number; // stored in kobo
  area: string | null;
  number_of_floors: number | null;
  type: DrawingType;
  status: DrawingStatus;
  description: string | null;
  preview_images: string[] | null;
  full_file_paths: string[] | null;
  number_of_downloads: number;
  created_at: string;
}

export type ProjectType = "building" | "land";

export interface ProjectCategory {
  id: string;
  name: string;
  created_at: string;
}

export interface Project {
  id: string;
  title: string;
  location: string | null;
  area: string | null;
  completion_year: number | null;
  category: string | null;
  type: ProjectType;
  description: string | null;
  images: string[] | null;
  created_at: string;
}

export interface Order {
  id: string;
  order_ref: string;
  buyer_name: string;
  buyer_email: string;
  amount: number; // kobo
  status: OrderStatus;
  asset_status: AssetStatus;
  drawing_id: string;
  drawing_title: string | null;
  paystack_reference: string | null;
  download_token: string | null;
  download_expires_at: string | null;
  created_at: string;
}

export interface Notification {
  id: string;
  title: string;
  description: string | null;
  type: NotificationType;
  is_read: boolean;
  reference_id: string | null;
  reference_type: NotificationReferenceType | null;
  created_at: string;
}

export interface AdminSettings {
  id: string;
  user_id: string;
  email_on_new_order: boolean;
  email_on_contact_message: boolean;
  created_at: string;
}

// ---------- Insert Types (omit auto-generated fields) ----------

export type DrawingInsert = Omit<Drawing, "id" | "created_at" | "number_of_downloads">;

export type ProjectInsert = Omit<Project, "id" | "created_at">;

export type OrderInsert = Omit<Order, "id" | "created_at" | "order_ref">;

// ---------- Helpers ----------

/** Format a naira value with the local currency symbol and separators */
export function formatNairaAmount(
  naira: number,
  showSymbol: boolean = true,
): string {
  const formattedNumber = naira.toLocaleString("en-NG", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  // If showSymbol is true, add the ₦; otherwise, just return the number
  return showSymbol ? `₦${formattedNumber}` : formattedNumber;
}

/** Convert kobo value to formatted naira string */
export function koboToNaira(kobo: number, showSymbol: boolean = true): string {
  return formatNairaAmount(kobo / 100, showSymbol);
}

/** Convert naira to kobo */
export function nairaToKobo(naira: number): number {
  return Math.round(naira * 100);
}
