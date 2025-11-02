import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Heart } from "lucide-react";
import { ministryInfo } from "../mock"; // ✅ Correct import

const About = () => {
  // ✅ Ensure data exists
  const info = ministryInfo || {};
  const founder = info.founder || {};

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-blue-800 border-blue-200">
            About Our Ministry
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
            Called to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-amber-600">
              Transform Lives
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            {info.intro ||
              "Founded by God's calling to reach the nations with the Gospel of Jesus Christ."}
          </p>
        </div>

        {/* Ministry Story */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-bold text-slate-800 mb-6">Our Story</h3>
            <div className="prose text-slate-600 space-y-4">
              {(info.story || [
                "Word of Hope International Ministries Worldwide was founded with a divine mandate to win souls for Jesus Christ. Our ministry is totally dedicated to the cause of Christ, devoted to winning souls not just in Canada, but also delivering the gospel to countries all over the world.",
                "Founded by Apostle Sandra Ross and her husband David Murray Ross, who have been walking side by side working for the cause of Christ for over 30 years. Their journey began with missions to India in 2005 and 2010, and has expanded to include invitations from Pakistan, Nigeria, Kenya, and other nations.",
                "We are taking one step at a time knowing God is in control in all that we do. This Ministry belongs to God and we are His workmanship.",
              ]).map((para, index) => (
                <p key={index}>{para}</p>
              ))}
            </div>
          </div>

          {/* Founder Card */}
          <div>
            <Card className="bg-gradient-to-br from-blue-50 to-amber-50 border-none shadow-lg">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <img
                    src={founder.image || "/default-image.png"}
                    alt={founder.name || "Founder"}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover shadow-lg"
                  />
                  <h4 className="text-xl font-bold text-slate-800">
                    {founder.name || "Founder Name Unavailable"}
                  </h4>
                  <p className="text-amber-600 font-medium">
                    {founder.title || "Founder & President"}
                  </p>
                  <p className="text-sm text-slate-600 mt-4">
                    {founder.bio || "Biography not available."}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Vision */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="text-blue-800" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-800">Our Vision</h3>
              </div>
              <ul className="space-y-3">
                {info.vision?.length ? (
                  info.vision.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="bg-blue-600 w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <p className="text-slate-600">{item}</p>
                    </li>
                  ))
                ) : (
                  <p className="text-slate-500 italic text-center">
                    Vision details coming soon.
                  </p>
                )}
              </ul>
            </CardContent>
          </Card>

          {/* Mission */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="text-amber-600" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-800">Our Mission</h3>
              </div>
              <p className="text-slate-600 mb-4">
                {info.mission ||
                  "Our mission is to spread the Gospel, impact lives, and build communities in faith."}
              </p>
              <div className="bg-slate-50 p-4 rounded-lg">
                <p className="text-sm text-slate-700 font-medium text-center">
                  "We need to LEAD, LIVE, and LOVE — having a passion for souls and sharing the love of Jesus."
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Countries Reached */}
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold text-slate-800 mb-6">
            Countries We've Reached
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {info.countries?.length ? (
              info.countries.map((country, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-blue-100 text-blue-800 px-4 py-2 text-sm"
                >
                  {country}
                </Badge>
              ))
            ) : (
              <p className="text-slate-500 italic">No countries listed yet.</p>
            )}
          </div>
          <p className="text-slate-600 mt-4">
            ...and many more nations awaiting the Gospel
          </p>
        </div>

        {/* Core Values/Objectives */}
        <div>
          <h3 className="text-2xl font-bold text-slate-800 text-center mb-12">
            Our Objectives
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {info.objectives?.length ? (
              info.objectives.slice(0, 6).map((objective, index) => (
                <Card
                  key={index}
                  className="shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-blue-600"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <div className="bg-blue-100 w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                        <span className="text-blue-800 font-bold text-sm">{index + 1}</span>
                      </div>
                      <p className="text-slate-600 text-sm">{objective}</p>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-slate-500 italic text-center w-full">
                Objectives will be shared soon.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
