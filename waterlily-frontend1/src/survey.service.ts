import { apiRequest } from "./apiBase";

export interface Question {
  id: string;
  surveyId: string;
  title: string;
  description: string;
  type: string;
  required: boolean;
  order: number;
  options: string[];
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface Survey {
  id: string;
  title: string;
  description?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  questions?: Question[];
}

export async function getSurveys(): Promise<Survey[]> {
  return apiRequest<Survey[]>({ method: "GET", path: "/surveys" });
}

export async function getSurveyById(id: string): Promise<Survey | null> {
  if (!id) return null;
  return apiRequest<Survey>({ method: "GET", path: `/surveys/${id}` });
}
