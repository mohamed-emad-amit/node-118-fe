import { Button, Carousel } from "react-bootstrap";
import { baseUrlHandler } from "../../utils/baseUrlHandler";

export const PostCard = ({ post }) => {
  const baseUrl = baseUrlHandler();

  console.log(post);
  return (
    <div className="p-4 border mb-3 mx-auto text-center">
      <Carousel className="mx-auto mb-3" style={{ maxWidth: "400px" }}>
        {post.images.map((image, index) => (
          <Carousel.Item key={index}>
            <img
              src={`${baseUrl}/${image}`}
              alt={`image-${index + 1}`}
              className="w-100"
            />
          </Carousel.Item>
        ))}
      </Carousel>

      <h3>{post.caption}</h3>

      {/* Not Impelemented Yet [Comment - Like - Time] */}
      <div>
        <Button>Like {post.likes.length}</Button>
      </div>
    </div>
  );
};
