

const AboutSection = () => {
  return (
    <div>
        <div className="grid md:grid-cols-2 lg:grid-cols-2 pt-30 bg-[#F9FAFB] ">
          {/* image to left */}
          <div className="mx-auto">
            <img className="h-2/3 rounded-sm"src="/images/about-section-cleaning.jpg"/>
          </div>
          {/* 2/3 words to the right */}
          <div className="md:mt-30 lg:mt-30 animate-appear">
              <h2 className="text-3xl font-bold">Mobile Cleaning Made Easy - Book & Relax!</h2>
              <p className=" md:py-10 lg:py-10 tracking-wide">
                Welcome to NeatFleet - Your Trusted Mobile Cleaning Service! We bring the shine to your space with fast,
                reliable, and eco-friendly cleaning solutions. Whether it is your home, office, or car,
                our professional team arrives fully equipped to leave every corner spotless.
                With flexible scheduling and affordable rates, NeatFleet makes cleaning effortless.
                Book now and experience the convenience of sparkling clean, wherever you are!"
              </p>
          </div>
          </div>
          {/* About section */}
          <div className="grid md:grid-cols-2 lg:grid-cols-2 md:px-30 lg:px-30">
              <div className=" ">
                <h2 className="text-3xl font-bold ">Fresh & Spotless - On the Go!</h2>
                <p className="tracking-wide">
                  In early 2025, founder Alex Rivera was running late for an important client meeting when they spilled coffee all over their car seats. Frantically searching for a last-minute mobile cleaner, Alex realized there was no reliable, on-demand cleaning service that could come fast—without sky-high prices.
                  That frustration sparked an idea: What if cleaning could be as easy as ride-sharing? With a background in logistics and a passion for eco-friendly solutions, Alex teamed up with friend and tech whiz Jamie Chen to build NeatFleet—a fleet of professional cleaners armed with smart scheduling, green products, and a commitment to convenience.
                  Starting with just one van and an app built in Jamie’s garage, they tested the service in their hometown. Word spread fast. Busy parents, overwhelmed remote workers, and even local businesses loved the "tap-and-clean" simplicity. By the end of 2025, NeatFleet had expanded to three cities, with a loyal customer base and a mission: to make "clean" effortless for everyone.
                  Today, NeatFleet isn’t just a service—it’s a movement. Because life’s messy enough.
                </p>
          </div>
            <div className="">
              <img className="h-2/3 rounded-sm"src="/images/about-section-cleaning.jpg"/>
            </div>
          </div>

    </div>
  )
}

export default AboutSection;
