import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import {
	faChevronRight,
	faChevronDown,
} from '@fortawesome/free-solid-svg-icons';

const Accordion = ({ text, navLink, open, subsections }) => {
	const [isOpen, setIsOpen] = useState(open);
	const contentRef = useRef(null);

	const toggleAccordion = () => {
		setIsOpen(!isOpen);
	};

	useEffect(() => {
		// Synchronize isOpen state with open prop
		setIsOpen(open);
	}, [open]);

	useEffect(() => {
		const estimatedHeightPerSubsection = 80;
		const totalHeight = subsections.length * estimatedHeightPerSubsection;
		if (contentRef.current) {
			contentRef.current.style.maxHeight = isOpen
				? `${totalHeight}px`
				: '0px';
		}
	}, [isOpen, subsections.length]);

	return (
		<div className="accordion">
			<div className="flex justify-between items-center gap-2">
				<NavLink
					className="hover:text-blue-300 transition-color duration-200 cursor-pointer"
					onClick={() => {
						if (!isOpen) {
							toggleAccordion();
						}
					}}
					to={navLink}
				>
					{text}
				</NavLink>
				<FontAwesomeIcon
					onClick={toggleAccordion}
					icon={faChevronRight}
					className={`
					transform transition-all duration-200 
					ease-in-out w-3 h-3 cursor-pointer hover:bg-blue-300 
					p-[3px] rounded-full ${isOpen ? 'rotate-90' : ''}`}
				/>
			</div>
			<div
				ref={contentRef}
				className={`accordion-content overflow-hidden transition-max-height duration-300 ease-in-out ml-2`}
			>
				{subsections.map((subsection, index) =>
					subsection.subsections ? (
						<Accordion
							key={index}
							text={subsection.text}
							navLink={subsection.link}
							open={subsection.open}
							subsections={subsection.subsections}
						/>
					) : (
						<div>
							<NavLink
								to={subsection.link}
								className="hover:text-blue-300 "
							>
								{subsection.text}
							</NavLink>
						</div>
					),
				)}
			</div>
		</div>
	);
};

export default Accordion;
