import CVSearchPage from "@/components/pages/CVSearchPage";
import { applications } from "@/constants/apps";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getCVCountries, getEducationOptions, getYearsOfExp } from "@/actions";

export const revalidate = 86400;

const queryClient = new QueryClient({});

export default async function Home() {
  await queryClient.ensureQueryData({ queryKey: ["apps", {}, {}], queryFn: () => applications });
  await queryClient.prefetchQuery({ queryKey: ["countries-filter-data"], queryFn: getCVCountries });
  await queryClient.prefetchQuery({ queryKey: ["education-filter-data"], queryFn: getEducationOptions });
  await queryClient.prefetchQuery({ queryKey: ["experiance-filter-data"], queryFn: getYearsOfExp });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CVSearchPage />
    </HydrationBoundary>
  );
}
