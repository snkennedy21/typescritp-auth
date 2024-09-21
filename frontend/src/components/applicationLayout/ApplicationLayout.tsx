import Sidebar from '../../components/sidebar/Sidebar';
import MainContent from '../../components/mainContent/MainContent';
import AdditionalLinks from '../../components/additionalLinks/AdditionalLinks';
import HamburgerMenu from '../../components/hamburgerMenu/HamburgerMenu';
import './applicationLayout.css';

// TODO: Changing Screen Sizes Causes Components To Be Rendered As New. This Means All Their State Is Recalculated. Must Fix

const ApplicationLayout = () => {
	return (
		<div className="flex flex-col">
			{/* Mobile Specific Elements */}
			<div className="block md:hidden">
				{/* Hamburger Menu */}
				<HamburgerMenu />
				<div className="md:w-1/6">
					<Sidebar isMobile={true} />
				</div>
			</div>

			{/* Main Layout for All Screen Sizes */}
			<div className="flex flex-row h-full">
				{/* Sidebar - Shown on Desktop/Tablet, hidden on Mobile */}
				<div className="w-1/5 sticky top-0 h-screen hidden md:block">
					<Sidebar />
				</div>

				{/* Main Content - Single Instance, Scrollable */}
				<div className="flex-1 overflow-y-auto">
					<MainContent />
				</div>

				{/* Additional Links - Shown on Desktop/Tablet, hidden on Mobile */}
				<div className="w-1/5 sticky top-0 h-screen hidden lg:block">
					<AdditionalLinks />
				</div>
			</div>
		</div>
	);
};

export default ApplicationLayout;
