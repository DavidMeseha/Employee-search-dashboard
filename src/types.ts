export interface Application {
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

export type Actions = {
  getCVCountries: () => Promise<{
    total: number;
    countries: {
      name: string;
      count: number;
    }[];
  }>;
  getEducationOptions: () => Promise<{
    total: number;
    edu: {
      degree: string;
      count: number;
    }[];
  }>;
  getYearsOfExp: () => Promise<{
    total: number;
    yearsOfexp: (
      | {
          name: string;
          count: number;
          min: number;
          max: number;
        }
      | {
          name: string;
          count: number;
          min: number;
          max?: undefined;
        }
    )[];
  }>;
  getApplications: (filters: Filters, view: View) => Promise<Application[]>;
};
