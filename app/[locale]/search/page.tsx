import SearchResults from "@/components/search/SearchResults";
import { Metadata, NextPage } from "next";

export const metadata: Metadata = {
  title: "Search",
  description: "Search results for team members and services",
};

const SearchPage: NextPage = () => {
  return <SearchResults />;
};

export default SearchPage;
