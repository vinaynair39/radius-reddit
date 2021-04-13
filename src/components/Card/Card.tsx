import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Notifications, { notify } from "react-notify-toast";
import LazyLoad from "react-lazyload";
import { useDispatch } from "react-redux";
import { addToSaved, removeFromSaved } from "store/common/reducer";
import { ReactComponent as Comments } from "assets/comments.svg";
import { ReactComponent as Share } from "assets/share.svg";
import { ReactComponent as Save } from "assets/save.svg";
import { ReactComponent as Upvote } from "assets/upvote.svg";
import { ReactComponent as DownVote } from "assets/downvote.svg";

import "./Card.scss";
import Lightbox from "react-image-lightbox";

dayjs.extend(relativeTime);

interface Props {
  author: string;
  createdAt: number;
  title: string;
  image: string;
  subreddit: string;
  awards?: {
    count: number;
    image: string;
  }[];
  numOfComments: number;
  link: string;
  upvotes: number;
  profileImage: string;
  saved: boolean;
  cardRef?: any;
  id: string;
}
const Card: React.FC<Props> = ({
  author,
  createdAt,
  id,
  title,
  numOfComments,
  subreddit,
  link,
  image,
  upvotes,
  profileImage,
  cardRef = null,
  saved,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const dateTime = new Date(0); // The 0 there is the key, which sets the date to the epoch
  dateTime.setUTCSeconds(createdAt);
  const postedOn = dayjs(dateTime.toLocaleDateString()).fromNow();

  const handleShare = () => {
    navigator.clipboard.writeText("https://www.reddit.com" + link);
    notify.show("Link copied!", "success");
  };

  const handeSave = () => {
    dispatch(
      addToSaved({
        data: {
          author_fullname: author,
          created_utc: createdAt,
          title,
          num_comments: numOfComments,
          subreddit_name_prefixed:subreddit,
          permalink:link,
          preview: {
            images: [
              {
                source: {
                  url: image,
                },
              },
            ],
          },
          image,
          ups: upvotes,
          profileImage,
          sr_detail: {
            icon_img: profileImage,
          },
          id,
        },
      })
    );
  };

  const handleUnsave = () => {
    dispatch(removeFromSaved(id));
  };


  const handleUpvote = () => {
    notify.show("Feature work in progress!");

  };
  const handleDownvote = () => {
    notify.show("Feature work in progress!");
  };
  const handleComment = () => {
    notify.show("Feature work in progress!");
  };

  return (
    <div className="card" ref={cardRef}>
      <Notifications />
      <div className="card-header">
        <img className="profile" src={profileImage} alt={""} />
        <span>{subreddit}</span>
        <span className="posted-by">Posted by {author}</span>
        <span className="posted-on">{postedOn}</span>
        {/* {formattedAwards} */}
      </div>
      <div className="card-main">
        <h1>{title}</h1>
        <LazyLoad height={"100%"} once>
          <img className="card-image" src={image} alt="" onClick={() => setIsOpen(true)}/>
        </LazyLoad>
      </div>
      <div className="card-footer">
        <div className="upvotes">
          <button onClick={handleUpvote}>
            <Upvote />
          </button>
          <span>{upvotes}</span>
          <button onClick={handleDownvote}>
            <DownVote />
          </button>
        </div>
        <button onClick={handleComment}>
          <Comments />
          <span>{numOfComments} Comments</span>
        </button>
        <button onClick={handleShare}>
          <Share />
          <span>Share</span>
        </button>
        <button
          onClick={saved ? handleUnsave : handeSave}
          className={saved ? "saved" : ""}
        >
          <Save />
          <span>Save</span>
        </button>
      </div>
      {isOpen && (
        <Lightbox mainSrc={image} onCloseRequest={() => setIsOpen(false)} />
      )}
    </div>
  );
};
export default Card;
