import Container from "@/components/Container";
import Image from "next/image";

import landingPageBookIcon from "../../../public/landingPageBookIcon.svg"
import { getAllCategory, getAllWriter } from "@/services/Services";
import Link from "next/link";
import Books from "./Books";

export default async function Home() {
  const getCategory = getAllCategory();
  const getWriter = getAllWriter();

  const [category, writer] = await Promise.all([getCategory, getWriter]);


  return (
    <div>
      <Container>
        <div className="hidden lg:flex gap-x-5 overflow-auto w-full my-1 px-2 md:px-0">
          {
            category.data.map((category: any) => (
              <Link
                href={`/categoryBooks/${category._id}`}
                key={category._id}
              >
                <p className="w-full hover:text-blue-500">{category.name}</p>
              </Link>
            ))
          }
        </div>
      </Container>


      <div className="bg-linear-to-bl from-orange-50 to-green-50">
        <Container>
          <div className="lg:flex flex-row-reverse items-center justify-between">

            <div className="lg:w-1/2 flex justify-center">
              <Image className="md:w-[400px] w-[300px]" src={landingPageBookIcon} alt="Book"></Image>
            </div>

            <div className="lg:w-1/2">
              <h1 className="font-bold LandingHeading">Unleash Your <span className="text-orange-500">Creativity</span> Withe The Power Of A Book</h1>
              <p className="description">This should be used to tell a story and let tour users know a little more about your product or service.</p>
            </div>
          </div>
        </Container>
      </div>


      <section className="mt-10">
        <Container>
          <div className="hidden md:block">
            <h1 className="heading">Best Writers</h1>
            <div className="flex gap-x-5">
              {
                writer.data.map((category: any) => (
                  <Link
                    href={`/writerBooks/${category._id}`}
                    key={category._id}
                  >
                    <p className="w-full line-clamp-1 hover:text-blue-500">{category.name}</p>
                  </Link>
                ))
              }
            </div>
          </div>
        </Container>
      </section>

      <section className="mt-5">
        <Books></Books>
      </section>

    </div>
  );
}
