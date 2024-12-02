// import CVSearchPage from "@/app/CVSearchPage";
import { applications } from "@/constants/apps";
import { countries, edu, yearsOfexp } from "@/constants/constants";
import { Filters, View } from "@/types";
import dynamic from "next/dynamic";

const CvsPge = dynamic(() => import("@/app/CVSearchPage"), { ssr: false });

export default function Home() {
  async function getCVCountries() {
    "use server";
    countries.sort((a, b) => b.count - a.count);
    return { total: 41, countries };
  }

  async function getEducationOptions() {
    "use server";
    edu.sort((a, b) => b.count - a.count);
    return { total: 41, edu };
  }

  async function getYearsOfExp() {
    "use server";
    return { total: 41, yearsOfexp };
  }

  async function getApplications(filters: Filters, view: View) {
    "use server";
    let filtered = [...applications];

    if (filters?.country.length > 0) {
      filtered = filtered.filter((app) => filters.country.includes(app.applicant.country));
    }
    if (filters.education.length > 0) {
      filtered = filtered.filter((app) => filters.education.includes(app.applicant.degree));
    }
    if (filters.yearsOfExp.length > 0) {
      filtered = filtered.filter(
        (app) =>
          !!filters.yearsOfExp.find(
            (exp) => app.applicant.experienceYears >= exp.min && (!exp.max || app.applicant.experienceYears <= exp.max)
          )
      );
    }

    if (view.state === "locked") {
      filtered = filtered.filter((app) => app.state === "locked");
    } else if (view.state === "unlocked") {
      filtered = filtered.filter((app) => app.state === "unlocked");
    } else if (view.state === "shortlisted") {
      filtered = filtered.filter((app) => app.isShortlisted);
    }

    if (view.sortBy === "age") {
      filtered = filtered.sort((a, b) => a.applicant.age - b.applicant.age);
    } else if (view.sortBy === "name") {
      filtered = filtered.sort((a, b) => (a.applicant.name[0] > b.applicant.name[0] ? 1 : -1));
    } else if (view.sortBy === "application") {
      filtered = filtered.sort((a, b) => (new Date(a.appliedDate) < new Date(b.appliedDate) ? 1 : -1));
    }

    return filtered;
  }

  return (
    <CvsPge
      actions={{ getApplications, getCVCountries, getEducationOptions, getYearsOfExp }}
      applications={applications}
    />
  );
}
