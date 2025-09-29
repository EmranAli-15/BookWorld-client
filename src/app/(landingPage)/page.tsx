import Container from "@/components/Container";
import Navbar from "@/components/shared/navbar/Navbar";
import Image from "next/image";

import landingPageBookIcon from "../../../public/landingPageBookIcon.svg"

export default function Home() {
  return (
    <div>
      <Container>

        <Navbar></Navbar>
      </Container>

      <div className="bg-linear-to-bl from-orange-50 to-green-50">
        <Container>
          <div className="lg:flex flex-row-reverse items-center justify-between">

            <div className="lg:w-1/2 flex justify-center">
              <Image className="md:w-[400px] w-[300px]" src={landingPageBookIcon} alt="Book"></Image>
            </div>

            <div className="px-2 lg:w-1/2">
              <h1 className="font-bold LandingHeading">Unleash Your <span className="text-orange-500">Creativity</span> Withe The Power Of A Book</h1>
              <p className="description">This should be used to tell a story and let tour users know a little more about your product or service.</p>
            </div>
          </div>
        </Container>
      </div>

    </div>
  );
}
