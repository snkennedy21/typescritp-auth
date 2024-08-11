import Sidebar from '../../components/sidebar/Sidebar';
import MainContent from '../../components/mainContent/MainContent';
import AdditionalLinks from '../../components/additionalLinks/AdditionalLinks';
import HamburgerMenu from '../../components/hamburgerMenu/HamburgerMenu';

const ApplicationLayout = () => {
	return (
		<div className="flex flex-col h-screen">
			{/* Desktop View */}
			<div className="hidden lg:flex flex-row h-full">
				<div className="lg:w-1/6 bg-gray-200">
					<Sidebar />
				</div>
				<div className="flex-1 overflow-auto flex">
					<div className="lg:flex-1">
						<MainContent />
					</div>
					<div className="lg:w-1/6 bg-gray-100 sticky top-0">
						<AdditionalLinks />
					</div>
				</div>
			</div>

			{/* Tablet View */}
			<div className="hidden md:flex lg:hidden flex-col h-full">
				<div className="flex flex-row h-full">
					<div className="md:w-1/6 bg-gray-200">
						<Sidebar />
					</div>
					<div className="flex-1 overflow-auto flex flex-col">
						<div className="lg:flex-1">
							<MainContent />
						</div>
						<div className="lg:w-1/6 bg-gray-100 sticky top-0">
							<AdditionalLinks />
						</div>
					</div>
				</div>
			</div>

			{/* Mobile View */}
			<div className="block md:hidden">
				<HamburgerMenu />
				<div className="flex-1 overflow-auto flex flex-col">
					<div className="md:w-1/6 bg-gray-200">
						<Sidebar isMobile={true} />
					</div>
					<div className="lg:flex-1">
						<MainContent />
					</div>
					<div className="lg:w-1/6 bg-gray-100 sticky top-0">
						<AdditionalLinks />
					</div>
				</div>
			</div>
		</div>
	);
};

export default ApplicationLayout;
