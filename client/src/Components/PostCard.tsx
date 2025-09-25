import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/Components/ui/card';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Button } from '@/Components/ui/button';
import { Textarea } from '@/Components/ui/textarea';
import { usePostStore } from '@/Store/usePostStore';
import { useAuthStore } from '@/Store/useAuthStore';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface PostCardProps {
  id: string;
  title: string;
  content: string;
  author: string;
  files?: string[];
}

interface Comment {
  username: string;
  text: string;
}

const PostCard: React.FC<PostCardProps> = ({
  id,
  title,
  content,
  author,
  files = [],
}) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [showCommentsPage, setShowCommentsPage] = useState(false);

  const { toggleLike, getPostLike }: any = usePostStore();
  const { authUser } : any= useAuthStore();

  useEffect(() => {
    const fetchLikes = async (id: string) => {
      try {
        const post = await getPostLike(id)
        if (post) {
          setLikesCount(post.likes.length);
          setLiked(post.likes.includes(authUser._id));
        }
      } catch (err) {
        console.error('Error fetching post likes', err);
      }
    };

    fetchLikes(id);
  }, [id, authUser._id]);

  const handleLike = async () => {
    const updatedLikes: string[] = await toggleLike(id);
    if (!updatedLikes) return;

    setLiked(updatedLikes.includes(authUser._id));
    setLikesCount(updatedLikes.length);
  };

  const handleAddComment = () => {
    if (!commentText.trim()) return;

    const newComment: Comment = {
      username: authUser.username || 'User',
      text: commentText.trim(),
    };

    setComments((prev) => [...prev, newComment]);
    setCommentText('');
  };

  return (
    <Card className="bg-background/5 text-white my-4 p-4 md:w-[95%] mx-auto rounded-xl shadow-xl h-[80vh] flex flex-col overflow-hidden">
      {/* Header */}
      <CardHeader className="flex flex-row justify-between items-center pb-2">
        <CardTitle className="text-xl font-semibold">
          {showCommentsPage ? 'Comments' : title}
        </CardTitle>
        {showCommentsPage && (
          <Button
            variant="ghost"
            className="text-xs text-muted-foreground hover:text-white bg-background/0 hover:bg-background/20 active:bg-background/10"
            onClick={() => setShowCommentsPage(false)}
          >
            ← Back to Post
          </Button>
        )}
      </CardHeader>

      {/* Main Content */}
      <CardContent className="flex-1 overflow-y-auto pr-1 space-y-4">
        {!showCommentsPage ? (
          <>
            <p className="text-base leading-relaxed">{content}</p>

            {files.length > 0 && (
              <div className="mt-2">
                <Swiper
                  modules={[Navigation, Pagination, Autoplay]}
                  navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                  }}
                  pagination={{
                    clickable: true,
                    dynamicBullets: true,
                  }}
                  autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                  }}
                  spaceBetween={20}
                  slidesPerView={1}
                  loop={files.length > 1}
                  className="rounded-md overflow-hidden relative"
                >
                  {files.slice(0, 9).map((url, index) => (
                    <SwiperSlide key={index}>
                      <div className="flex justify-center">
                        <img
                          src={url}
                          alt={`Slide ${index + 1}`}
                          className="min-w-full max-h-[300px] object-contain rounded-md"
                          loading="lazy"
                        />
                      </div>
                    </SwiperSlide>
                  ))}

                  <div className="swiper-button-prev !text-white after:!text-xl" />
                  <div className="swiper-button-next !text-white after:!text-xl" />
                </Swiper>
              </div>
            )}

            {/* Like & Comment Buttons */}
            <div className="flex items-center gap-4 pt-3">
              <Button
                variant={liked ? 'default' : 'outline'}
                className={`transition-all\
                  bg-background/0 hover:bg-background/20 active:bg-background/10
                  ${
                  liked ? 'bg-pink-600 text-white border-none' : ''
                }`}
                onClick={handleLike}
              >
                {liked ? `❤️ You liked (${likesCount})` : `🤍 Like (${likesCount})`}
              </Button>

              <Button variant="outline" className=' bg-background/0 hover:bg-background/20 active:bg-background/10' onClick={() => setShowCommentsPage(true)}>
                💬 View Comments
              </Button>
            </div>
          </>
        ) : (
          <>
            {/* Comments Section */}
            {comments.length > 0 ? (
              <div className="space-y-2">
                {comments.map((c, idx) => (
                  <div
                    key={idx}
                    className="bg-background/10 p-3 rounded-md text-sm"
                  >
                    <span className="font-semibold text-primary">
                      {c.username}
                    </span>
                    <p className="ml-1 mt-1 text-white">{c.text}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">
                No comments yet. Be the first!
              </p>
            )}
          </>
        )}
      </CardContent>

      {/* Footer */}
      <CardFooter className="pt-4 flex-col gap-3">
        {showCommentsPage && (
          <>
            <Textarea
              placeholder="Write your comment..."
              className="resize-none h-20 p-3 border border-border rounded-md bg-background/10 focus:outline-none focus:ring-2 focus:ring-primary/50"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <Button
              onClick={handleAddComment}
              className="w-full bg-primary text-white hover:bg-primary/90"
            >
              Post Comment
            </Button>
          </>
        )}
        <p className="text-xs text-muted-foreground w-full text-right">
          Posted by {author}
        </p>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
