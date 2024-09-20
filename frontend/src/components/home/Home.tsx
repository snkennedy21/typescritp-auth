import CodeBlock from '../codeblockExample/CodeblockExample';
import profilePicture from '../../assets/profilePicture.png';

const Home = () => {
	return (
		<div>
			<div className="flex flex-col md:flex-row items-center justify-center gap-10 mt-32">
				<img src={profilePicture} alt="picture" className="h-52 w-52" />
				<div className="ml-4 flex flex-col items-center md:block">
					<h2 className="text-[52px] font-bold">Sean Kennedy</h2>
					<p className="text-[32px]">Full Stack Developer</p>
				</div>
			</div>
			<section className="text-xl mt-20 mx-10">
				Welcome to my personal learning hub! I'm Sean Kennedy, a full
				stack developer with a passion for exploring new technologies.
				This website is my way of keeping track of my learning journey—a
				place where I can document and reference what I’ve learned along
				the way. I’ve decided to share it in the hopes that others might
				find it interesting or useful as well. Whether you’re here to
				learn alongside me or simply curious about my progress, I’m glad
				you stopped by!
			</section>
		</div>
	);
};

export default Home;
