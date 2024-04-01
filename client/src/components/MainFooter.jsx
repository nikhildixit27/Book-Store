import React from 'react';
import { FaLinkedin, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";
import { Link } from 'react-router-dom';

function MainFooter() {
    const socialHandles = [
        {
            name: 'Twitter',
            link: 'https://twitter.com/NikhilD44022478',
            icon: <FaTwitter className="w-6 h-6" />
        },
        {
            name: 'LinkedIn',
            link: 'https://www.linkedin.com/in/nikhil-dixit-a15509173/',
            icon: <FaLinkedin className="w-6 h-6" />
        },
        {
            name: 'Instagram',
            link: 'https://www.instagram.com/xnikhildixit/',
            icon: <FaInstagram className="w-6 h-6" />
        },
        {
            name: 'GitHub',
            link: 'https://github.com/nikhildixit27',
            icon: <FaGithub className="w-6 h-6" />
        }
    ]


    return (
        <footer className="bg-gray-700 text-white py-4">
            <div className="mx-auto flex flex-col text-center md:flex-row md:justify-between items-center px-8">
                <div className="md:text-left">
                    <p className="text-lg font-semibold">Connect with Me</p>
                    <p className="text-sm mt-2">Let's connect and build something amazing together!</p>
                </div>
                <div className="mt-4 md:mt-0">
                    <p className="text-lg font-semibold underline">Developed by Nikhil Dixit</p>
                </div>
                <div className="flex justify-center md:justify-end mt-4 md:mt-0">
                    {socialHandles.map((handle, index) => (
                        <Link to ={handle.link} key={index} target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-800 mx-3">
                            {handle.icon}
                        </Link>
                    ))}
                    
                    {/* <a href="https://github.com/nikhildixit27" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-800 mx-3">
                        <FaGithub className="w-6 h-6" />
                    </a>
                    */}

                </div>
            </div>
        </footer>
    );
}

export default MainFooter;