import emailjs from "@emailjs/browser";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef, useState } from "react";
import Loader from '../components/Loader';
import Sky from '../models/Sky';
import Fox from "../models/Fox";
import useAlert from "../hooks/useAlert";
import Alert from "../components/Alert";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const { alert, showAlert, hideAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState("idle");

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };

  const handleFocus = () => setCurrentAnimation("walk");
  const handleBlur = () => setCurrentAnimation("idle");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setCurrentAnimation("hit");

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Mihir Chitre",
          from_email: form.email,
          to_email: "chitre.m@northeastern.edu",
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          showAlert({
            show: true,
            text: "Thank you for your message 😃",
            type: "success",
          });

          setTimeout(() => {
            hideAlert(false);
            setCurrentAnimation("idle");
            setForm({
              name: "",
              email: "",
              message: "",
            });
          }, [3000]);
        },
        (error) => {
          setLoading(false);
          console.error(error);
          setCurrentAnimation("idle");

          showAlert({
            show: true,
            text: "I didn't receive your message 😢",
            type: "danger",
          });
        }
      );
  };

  return (
    <div className="w-full h-screen relative"> {/* Set to the height of the screen */}
      <Canvas className='w-full h-screen fixed top-0 left-0 z-0'> {/* Positioned fixed */}
        <Suspense fallback={<Loader />}>
          <Sky isRotating={true} />
        </Suspense>
      </Canvas>
      <div className='w-full h-screen absolute top-0 left-0 overflow-y-scroll'>
        <section className='relative flex lg:flex-row flex-col max-container'>
          {alert.show && <Alert {...alert} />}

          <div className='flex-1 min-w-[50%] flex flex-col'>
            <h1 className='head-text text-white'>Get in Touch</h1>

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className='w-full flex flex-col gap-7 mt-14'
            >
              <label className='text-white font-semibold'>
                Name
                <input
                  type='text'
                  name='name'
                  className='input'
                  placeholder='John'
                  required
                  value={form.name}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </label>
              <label className='text-white font-semibold'>
                Email
                <input
                  type='email'
                  name='email'
                  className='input'
                  placeholder='John@gmail.com'
                  required
                  value={form.email}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </label>
              <label className='text-white font-semibold'>
                Your Message
                <textarea
                  name='message'
                  rows='4'
                  className='textarea'
                  placeholder='Write your thoughts here...'
                  value={form.message}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </label>

              <button
                type='submit'
                disabled={loading}
                className='btn'
                onFocus={handleFocus}
                onBlur={handleBlur}
              >
                {loading ? "Sending..." : "Submit"}
              </button>
            </form>
          </div>

          <div className='lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]'>
            <Canvas
              camera={{
                position: [0, 0, 5],
                fov: 75,
                near: 0.1,
                far: 1000,
              }}
            >
              <directionalLight position={[0, 0, 1]} intensity={2.5} />
              <ambientLight intensity={1} />
              <pointLight position={[5, 10, 0]} intensity={2} />
              <spotLight
                position={[10, 10, 10]}
                angle={0.15}
                penumbra={1}
                intensity={2}
              />

              <Suspense fallback={<Loader />}>
                <Fox
              currentAnimation={currentAnimation}
              position={[0.8, -3, 0.5]}
              rotation={[12.629, -0.8, 0]}
              scale={[0.5, 0.5, 0.5]}
            />
              </Suspense>
            </Canvas>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;