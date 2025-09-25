import HomeCard from "@/Components/HomeCard";
import Navbar from "@/Components/Navbar"
import PostCard from "@/Components/PostCard"
import { usePostStore } from "@/Store/usePostStore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HomePage() {
  const [posts, setPosts] = useState<any[]>([]);

  const { getPost } : any = usePostStore()

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts = await getPost();
      console.log(fetchPosts)
      setPosts(fetchedPosts);
    };
    fetchPosts();
  }, []);



  return (
    <div className="w-screen overflow-x-hidden">
      <Navbar />
      <div className="mx-4 md:ml-[300px] mt-20">
        <div className="lg:flex-1/2 w-full">
          <h1 className="text-3xl font-bold mx-2 mb-4">Home</h1>
          {

            posts.length === 0 ? (
            <p className="text-center mt-10 text-gray-500">No posts yet.</p>
          ) : (
            posts.map((post) => (
              <PostCard
                key={post._id}
                id={post._id}
                title={post.title}
                content={post.description}
                author={post.owner.username}
                files={post.files}
              />
            ))
          )
          
          }
        </div>
        {/* <div className="hidden lg:block basis-1/3 text-white px-4 pr-20 flex-1/2">
          <h2 className="text-3xl font-semibold mb-2 pr-20">Community</h2> */}
          {/* <div className="bg-background/10 px-10 pr-20 rounded-sm pb-5">
            <div>
              <p className="text-xl pt-6">Suggested Communities</p>
              {/* community card */}
              {/* {
                communities.map((community, index) => (
                  <div key={index} className="py-3">

                    <HomeCard Name={community.name} Desc={community.description} Img={community.logo} link={community.joining} />
                  </div>
                ))
              }
            </div>
            <Link to='/communities' className="text-sm  font-semibold text-blue-600 hover:text-blue-700 active:text-blue-500">Show More {">>"}</Link>
          </div> */} 
          {/* Find People */}
          {/* <div className="px-10 bg-background/10 my-3 rounded-sm pb-5">
            <p className="text-xl">Similar Minds</p>
            {
              Persons.map((person, index) => (
                <div key={index} className="py-3">

                  <HomeCard Name={person.name} Desc={person.description} Img={person.image} link={person.joining} />
                </div>
              ))
            }

            <Link to='/search' className="text-sm  font-semibold text-blue-600 hover:text-blue-700 active:text-blue-500">Show More {">>"}</Link>
          </div> */}

        {/* // </div> */}
      </div>
    </div>
  );
}

export default HomePage;
