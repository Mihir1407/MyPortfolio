import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className='cta'>
      <p className='cta-text'>
        <div className="text-white">
          Have a project in mind? <br className='sm:block hidden' />
          Let's build something together!
        </div>
      </p>
      <Link to='/contact' className='btn'>
        Contact
      </Link>
    </section>
  );
};

export default CTA;