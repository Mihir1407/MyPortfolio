import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import CTA from "../components/CTA";
import { experiences, skills } from "../constants";
import { Canvas } from "@react-three/fiber";
import Loader from '../components/Loader';
import Sky from '../models/Sky';
import "react-vertical-timeline-component/style.min.css";
import { Suspense } from "react";

const About = () => {
  return (
    <div className="w-full h-screen relative"> {/* Set to the height of the screen */}
      <Canvas className='w-full h-screen fixed top-0 left-0 z-0'> {/* Positioned fixed */}
        <Suspense fallback={<Loader />}>
          <Sky isRotating={true} />
        </Suspense>
      </Canvas>
      <div className='w-full h-screen absolute top-0 left-0 overflow-y-scroll'> {/* Make this div scrollable */}
        <section className='bg-slate-800 max-container pt-20 pb-10'> {/* Add padding to account for viewport height */}
          <h1 className='head-text text-white'>
            Hello, I'm{" "}
            <span className='blue-gradient_text font-semibold drop-shadow'>
              {" "}
              Mihir
            </span>{" "}
          </h1>

          <div className='mt-5 flex flex-col gap-3 text-slate-500'>
            <p className="text-white">
              Software Engineer based in Boston, pursuing Master of Science in Computer Science at Northeastern University.
            </p>
          </div>

          <div className='py-10 flex flex-col'>
            <h3 className='subhead-text text-white'>My Skills</h3>

            <div className='mt-16 flex flex-wrap gap-12'>
              {skills.map((skill) => (
                <div className='block-container w-20 h-20' key={skill.name}>
                  <div className='btn-back rounded-xl btn-back-white' />
                  <div className='btn-front-about rounded-xl flex justify-center items-center'>
                    <img
                      src={skill.imageUrl}
                      alt={skill.name}
                      className='w-1/2 h-1/2 object-contain'
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='py-16'>
            <h3 className='subhead-text text-white'>Work Experience.</h3>
            <div className='mt-5 flex flex-col gap-3 text-slate-500'>
              <p className="text-white">
                I've worked with all sorts of companies, leveling up my skills and
                teaming up with smart people. Here's the rundown:
              </p>
            </div>

            <div className='mt-12 flex'>
              <VerticalTimeline>
                {experiences.map((experience, index) => (
                  <VerticalTimelineElement
                    key={experience.company_name}
                    date={<div className="text-white">{experience.date}</div>}
                    iconStyle={{ background: experience.iconBg }}
                    icon={
                      <div className='flex justify-center items-center w-full h-full'>
                        <img
                          src={experience.icon}
                          alt={experience.company_name}
                          className='w-[80%] h-[80%] object-contain'
                        />
                      </div>
                    }
                    contentStyle={{
                      borderBottom: "8px",
                      borderStyle: "solid",
                      borderBottomColor: experience.iconBg,
                      boxShadow: "none",
                      background: 'rgb(15 23 42 / var(--tw-bg-opacity)',
                    }}
                  >
                    <div>
                      <h3 className='text-white text-xl font-poppins font-semibold'>
                        {experience.title}
                      </h3>
                      <p
                        className='text-white font-medium text-base'
                        style={{ margin: 0 }}
                      >
                        {experience.company_name}
                      </p>
                    </div>

                    <ul className='my-5 list-disc ml-5 space-y-2'>
                      {experience.points.map((point, index) => (
                        <li
                          key={`experience-point-${index}`}
                          className='text-white font-normal pl-1 text-sm'
                        >
                          {point}
                        </li>
                      ))}
                    </ul>
                  </VerticalTimelineElement>
                ))}
              </VerticalTimeline>
            </div>
          </div>

          <hr className='border-slate-200' />

          <CTA />
        </section>
      </div>
    </div>
  );
};

export default About;