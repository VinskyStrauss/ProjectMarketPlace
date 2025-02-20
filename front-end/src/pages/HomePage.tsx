import React from "react";
import { PageLayout } from "../layouts/PageLayout";
import { SearchBar } from "../components/SearchBar";

function HomePage() {
  return (
    <PageLayout>
      <SearchBar handleSearch={(val: string) => console.log(val)} />
      <div>HomePage</div>
    </PageLayout>
  );
}

export default HomePage;
