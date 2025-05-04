export interface Application {
  id: string;
  appliedDate: string;
  state: "locked" | "unlocked";
  isShortlisted: boolean;
  applicant: {
    imgUrl: string;
    name: string;
    location: string;
    country: string;
    age: number;
    experienceYears: number;
    degree: string;
    careerLevel: string;
    field: string;
    phone: string;
    email: string;
    experience: Array<{ yearFrom: number; yearTo: number; country: { code: string; name: string }; title: string }>;
    cvUrl: string;
  };
}

export interface Filters {
  country: string[];
  education: string[];
  yearsOfExp: { max?: number; min: number }[];
}
export interface View {
  sortBy: "name" | "age" | "application" | "any";
  state: "locked" | "unlocked" | "shortlisted" | "all";
}
