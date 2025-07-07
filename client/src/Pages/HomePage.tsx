import HomeCard from "@/Components/HomeCard";
import Navbar from "@/Components/Navbar"
import PostCard from "@/Components/PostCard"
import { Link } from "react-router-dom";

function HomePage() {
  const posts = [
    {
      title: "Post 1",
      content: "This is the content of post 1",
      author: "John Doe",
    },
    {
      title: "Post 2",
      content: "This is the content of post 2",
      author: "Jane Doe",
    }
  ];

  const communities = [
  {
    name: "CodeCrafters",
    logo: "https://placehold.co/100x100?text=CC",
    description: "A passionate group of developers building cool stuff with JavaScript and TypeScript.",
    joining: "12.3K members"
  },
  {
    name: "DesignHub",
    logo: "https://placehold.co/100x100?text=DH",
    description: "Creative minds sharing their love for UI/UX, motion design, and product thinking.",
    joining: "8.4K members"
  },

];

const Persons = [{
  name: "John Doe",
  image: "https://placehold.co/100x100?text=JD",
  description: "Software engineer with a passion for building scalable and maintainable systems.",
  joining: "12.3K followers"

},
{
  name: "Jane Doe",
  image: "https://placehold.co/100x100?text=JD",
  description: "Full-stack developer with a focus on creating seamless user experiences.",
  joining: "8.4K followers"
}
]


  return (
    <div className="w-screen overflow-x-hidden">
      <Navbar />
      <div className="mx-4 md:ml-[300px] mt-10 flex flex-row w-[85%] ">
        <div className="flex-1/2 ">
          <h1 className="text-3xl font-bold mx-2 mb-4 w">Home</h1>
          {posts.map((post, index) => (
            <PostCard
              key={index}
              title={post.title}
              content={post.content}
              author={post.author}
            />
          ))}
        </div>
        <div className="hidden md:block basis-1/3 text-white px-4 pr-20 flex-1/2">
          <h2 className="text-3xl font-semibold mb-2 pr-20">Community</h2>
          <div className="bg-background/10 px-10 pr-20 rounded-sm pb-5">
            <div>
            <p className="text-xl pt-6">Suggested Communities</p>
              {/* community card */}
              {
                communities.map((community, index) =>(
                  <div key={index} className="py-3">

                    <HomeCard  Name={community.name} Desc={community.description} Img={community.logo} link={community.joining}  />
                  </div>
                ))
              }
            </div>
            <Link to='/communities' className="text-sm  font-semibold text-blue-600 hover:text-blue-700 active:text-blue-500">Show More {">>"}</Link>
          </div>
            {/* Find People */}
          <div className="px-10 bg-background/10 my-3 rounded-sm pb-5">
            <p className="text-xl">Similar Minds</p>
              {
                Persons.map((person, index) =>(
                   <div key={index} className="py-3">

                    <HomeCard  Name={person.name} Desc={person.description} Img={person.image} link={person.joining}  />
                  </div>
                ))
              }

              <Link to='/search' className="text-sm  font-semibold text-blue-600 hover:text-blue-700 active:text-blue-500">Show More {">>"}</Link>
          </div>

        </div>
      </div>
    </div>
  );
}

export default HomePage;
