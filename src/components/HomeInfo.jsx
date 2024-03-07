import React from 'react'
import { Link } from 'react-router-dom'
import { arrow } from '../assets/icons';

const InfoBox = ({ text, link, btnText }) => {
    return (
        <div className='info-box'>
            <p className='font-medium sm:text-xl text-center'>{text}</p>
            <Link to={link} className='neo-brutalism-white neo-btn'>
                {btnText}
                <img src={arrow} alt='arrow' className='w-4 h-4 object-contain' />
            </Link>
        </div>
    );
}

const renderContent = {
    1: (
        <h1 className='sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5'>
            Hi, I'm
            <span className='font-semibold mx-2 text-white'>Mihir</span>
            👋
            <br />
            A Software Engineer from Boston
        </h1>
    ),
    2: (
        <InfoBox text="Discover how I've built my career, one line of code at a time"
            link="/about"
            btnText="Learn more" />
    ),
    3: (
        <InfoBox text="Take a peek at how my ideas come to life, project by project"
            link="/projects"
            btnText="Check out my portfolio" />
    ),
    4: (
        <InfoBox text="Got questions or want to collaborate? I'm just a message away!"
            link="/contact"
            btnText="Say Hi" />
    ),
}

const HomeInfo = ({ currentStage }) => {
    return renderContent[currentStage] || null;
}

export default HomeInfo