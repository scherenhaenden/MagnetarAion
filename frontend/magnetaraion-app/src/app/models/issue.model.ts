/**
 * Issue Model
 *
 * Represents an issue/ticket in the system.
 */
export interface Issue {
  id: number;
  title: string;
  description?: string;
  status?: string;
  priority?: string;
  assignee?: string;
  reporter?: string;
  created_at?: string;
  updated_at?: string;
  project_id?: number;
}
