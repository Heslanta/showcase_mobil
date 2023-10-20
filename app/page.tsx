import Hero from "@/components/Hero";
import Image from "next/image";
import {
  CarCard,
  CustomButton,
  CustomFilter,
  SearchBar,
  ShowMore,
} from "@/components";
import { fetchCars } from "@/utils";
import { fuels, yearsOfProduction } from "@/constants";

export default async function Home({ searchParams }: any) {
  const allCars = await fetchCars({
    // dari hasil searchparams yang dari url nanti akan menampilkan mobil seperti ini, tetapi jika tidak ada akan diberikan default
    manufacturer: searchParams.manufacturer || "",
    model: searchParams.model || "",
    year: searchParams.year || "2021",
    fuel: searchParams.fuel || "",
    // limit ini menampilkan jumlah mobil yang terlihat jika default akan menampilkan 10
    limit: searchParams.limit || 10,
  });
  console.log(allCars);
  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (
    <main className="overflow-hidden">
      <Hero />

      {/* section pada car catalogue */}
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore the cars you might like </p>
        </div>
        <div className="home__filters">
          <SearchBar />
          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} />
            <CustomFilter title="year" options={yearsOfProduction} />
          </div>
        </div>
        {!isDataEmpty ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars?.map((car) => (
                <CarCard car={car} />
              ))}
            </div>
            <ShowMore
              pageNumber={(searchParams.limit || 10) / 10}
              isNext={(searchParams.limit || 10) > allCars.length}
            />
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">No Cars</h2>
            <p>{allCars?.message}</p>
          </div>
        )}
      </div>
    </main>
  );
}
