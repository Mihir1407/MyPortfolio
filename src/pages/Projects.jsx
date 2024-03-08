import { Link } from "react-router-dom";
import React, { Suspense } from 'react';
import { Canvas } from "@react-three/fiber";
import Loader from '../components/Loader';
import Sky from '../models/Sky';
import CTA from "../components/CTA";
import { projects } from "../constants";
import { arrow } from "../assets/icons";
import { useEffect, useRef, useLayoutEffect } from "react";

const Projects = () => {

  const sectionRef = useRef(null);

  return (
    <div className="w-full h-screen relative"> {/* Set to the height of the screen */}
      <Canvas className='w-full h-screen fixed top-0 left-0 z-0'> {/* Positioned fixed */}
        <Suspense fallback={<Loader />}>
          <Sky isRotating={true} />
        </Suspense>
      </Canvas>
      <div className='w-full h-screen absolute top-0 left-0 overflow-y-scroll'> {/* Make this div scrollable */}
        <section className='bg-slate-800 max-container pt-20 pb-10'> {/* Add padding to account for viewport height */}
          <h1 className='head-text text-white'> {/* Change text to light color */}
            My{" "}
            <span className='blue-gradient_text drop-shadow font-semibold'>
              Projects
            </span>
          </h1>

          <p className='text-slate-300 mt-2 leading-relaxed'> {/* Lighter text for dark background */}
            Here's a curated collection of projects that are especially meaningful to me.
            They represent the essence of my creativity and technical skill, with many rooted in open-source communities.
            If any project captures your imagination, I warmly encourage you to delve into its code and consider contributing your unique perspective for its growth.
            Together, we can push the boundaries of what's possible!
          </p>

          <div className='flex flex-wrap my-20 gap-16'>
            {projects.map((project) => (
              <div className='lg:w-[400px] w-full bg-slate-800' key={project.name}> {/* Darker card backgrounds */}
                <div className='block-container w-12 h-12'>
                  <div className={`btn-back rounded-xl ${project.theme}`} />
                  <div className='btn-front rounded-xl flex justify-center items-center'> {/* Darker button fronts */}
                    <img
                      src={project.iconUrl}
                      alt={project.name}
                      className='w-1/2 h-1/2 object-contain'
                    />
                  </div>
                </div>

                <div className='mt-5 flex flex-col text-white'> {/* Text color changed to white */}
                  <h4 className='text-2xl font-poppins font-semibold'>
                    {project.name}
                  </h4>
                  <p className='mt-2 text-slate-300'>{project.description}</p> {/* Lighter paragraph text */}
                  <div className='mt-5 flex items-center gap-2 font-poppins'>
                    <Link
                      to={project.link}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='font-semibold text-blue-400'
                    >
                      Link
                    </Link>
                    <img
                      src={arrow}
                      alt='arrow'
                      className='w-4 h-4 object-contain'
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <hr className='border-slate-600' />

          <CTA />
        </section>
      </div>
    </div>
  );
};

export default Projects;
