import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card'
interface PostCardProps {
    title: string;
    content: string;
    author: string;
}
const PostCard: React.FC<PostCardProps> = ({ title, content, author}) => {
    return (
        <Card className='bg-background/5 text-white my-5 p-3 mr-5 md:w-full '>
            <CardHeader>
            <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>{content}</CardContent>
            <CardFooter>
                <p>{author}</p>
            </CardFooter>
        </Card>

    )
}

export default PostCard
