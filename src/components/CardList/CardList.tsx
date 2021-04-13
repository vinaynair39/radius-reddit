import React from "react";
import Card from "components/Card/Card";
import "./CardList.scss";
import { useSelector } from "react-redux";
import { AppState } from "store/store";
import Lottie from "lottie-react-web";
import animation from "assets/loader.json";

export interface PostType {
  data: {
    subreddit: string;
    author_fullname: string;
    title: string;
    subreddit_name_prefixed: string;
    ups: number;
    total_awards_received: number;
    created_utc: number;
    permalink: string;
    num_comments: number;
    id: string;
    preview: {
      images: {
        source: {
          url: string;
        };
      }[];
    };
    sr_detail: {
      icon_img: string;
    };
  };
}

interface Props {
  items: PostType[];
  loading: boolean;
  cardRef?: any;
}

const CardList: React.FC<Props> = ({ items=[], loading, cardRef }) => {
  const savedPosts = useSelector((state: AppState) => state.common.saved);
  return (
    <div className="cardlist">
      {loading && (
      <div className="loader">
          <Lottie
          options={{
            animationData: animation,
          }}
        />
      </div>
      )}
      {(items || []).map(({ data }, index) => {
        return (
          <Card
            key={data.id}
            subreddit={data.subreddit_name_prefixed}
            author={data.author_fullname}
            createdAt={data.created_utc}
            image={
              data?.preview?.images[0]?.source?.url?.replaceAll("amp;", "") ??
              ""
            }
            link={data.permalink}
            numOfComments={data.num_comments}
            title={data.title}
            id={data.id}
            upvotes={data.ups}
            profileImage={data.sr_detail.icon_img}
            saved={
              savedPosts.findIndex((post: any) => post?.data.id === data.id) >
              -1
            }
            cardRef={items.length === index + 1 ? cardRef : null}
          />
        );
        return;
      })}
    </div>
  );
};
export default CardList;
