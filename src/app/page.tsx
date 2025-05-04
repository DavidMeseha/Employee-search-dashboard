import CVSearchPage from "@/components/pages/CVSearchPage";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getApplications, getCountries, getEducationOptions, getYearsOfExp } from "@/actions";
import { viewInit } from "@/constants/initials";
import {
  APPLICATIONS_QUERY_KEY,
  COUNTRIES_FILTERS_QUERY_KEY,
  EDUCATION_FILTERS_QUERY_KEY,
  EXPERIANCE_FILTERS_QUERY_KEY
} from "@/constants/query-keys";

export const revalidate = 86400;

const queryClient = new QueryClient({});

export default async function Home() {
  await queryClient.prefetchQuery({
    queryKey: [APPLICATIONS_QUERY_KEY, viewInit.state, viewInit.sortBy],
    queryFn: () => getApplications()
  });
  await queryClient.prefetchQuery({ queryKey: [COUNTRIES_FILTERS_QUERY_KEY], queryFn: getCountries });
  await queryClient.prefetchQuery({ queryKey: [EDUCATION_FILTERS_QUERY_KEY], queryFn: getEducationOptions });
  await queryClient.prefetchQuery({ queryKey: [EXPERIANCE_FILTERS_QUERY_KEY], queryFn: getYearsOfExp });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CVSearchPage />
    </HydrationBoundary>
  );
}
