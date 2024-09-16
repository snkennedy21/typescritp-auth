import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { closeMobileNavigation } from '../../store/navigationSlice';
import { updateAccordionState } from '../../store/sidebarSlice'; // Import the action

const Accordion = ({ text, navLink, open, subsections }) => {
	const dispatch = useDispatch();
	const [isOpen, setIsOpen] = useState(open);
	const contentRef = useRef(null);

	const toggleAccordion = () => {
		setIsOpen(!isOpen);
		dispatch(updateAccordionState({ navLink, open: !isOpen })); // Use navLink as the unique identifier
	};

	useEffect(() => {
		// Synchronize isOpen state with open prop from Redux
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
						dispatch(closeMobileNavigation());
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
				{subsections.map((subsection, subIndex) =>
					subsection.subsections ? (
						<Accordion
							key={subsection.navLink}
							text={subsection.text}
							navLink={subsection.link}
							open={subsection.open}
							subsections={subsection.subsections}
						/>
					) : (
						<div onClick={() => dispatch(closeMobileNavigation())}>
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
