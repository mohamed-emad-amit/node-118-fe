import { CreateNewPost } from "../../components/CreateNewPost/CreateNewPost";
import { FeedsPosts } from "../../components/FeedsPosts/FeedsPosts";

export const Home = () => {
  return (
    <div>
      <div className="border rounded-1 p-4 mb-3">
        <h3>Create New Post</h3>
        <CreateNewPost />
      </div>

      <div>
        <h3>Feeds</h3>

        <FeedsPosts />
      </div>
    </div>
  );
};
