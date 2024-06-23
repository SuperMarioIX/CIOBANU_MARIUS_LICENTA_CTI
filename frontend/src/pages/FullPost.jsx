import React from "react";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { useParams } from "react-router-dom";
import axios from 'axios'

export const FullPost = () => {
  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);
  const { id } = useParams();
  console.log(id);


  React.useEffect(() => {
    axios.get(`http://localhost:4444/posts/${id}`)
    .then((res) => {
      setData(res.data);
      setLoading(false);
    })
    .catch((err) => {
      console.warn(err);
      alert('Posts ERROR');
    });
  }, []);

  if(isLoading){
    return <Post isLoading={isLoading} isFullPost />;
  }

 
  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl="https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        // user={{
        //   avatarUrl:
        //     "https://res.cloudinary.com/practicaldev/image/fetch/s--uigxYVRB--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png",
        //   fullName: "Keff",
        // }}
        isFullPost
      >
      <p>
        {data.text}  
      </p>
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Alex Danilescu",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Acest comentariu este de test",
          },
          {
            user: {
              fullName: "Ion Popescu",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
