import React, { useState } from "react";
import { ReactComponent as Search } from "assets/search.svg";
import "./Searchbar.scss";
import axios from "axios";
import { setLoading, setPosts } from "store/common/reducer";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

interface Props {}
const Searchbar: React.FC<Props> = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch()
  const {pathname} = useLocation()
  const history = useHistory()
  const handleTextChange = ({
    target,
  }: {
    target: {
      name: string;
      value: string;
    };
  }) => {
    setText(target?.value);
  };

  const handleSearch = async (e: any) => {
    e.preventDefault();
    dispatch(setLoading(true))
    dispatch(setPosts([]))

    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/r/subreddits/search.json?q=${text}&sr_detail=true`
    );
   dispatch(setPosts(data.data.children))
   dispatch(setLoading(false))
   if(pathname !== '/') history.push("/")
  };

  return (
    <form className="searchbar" onSubmit={handleSearch}>
      <div className="icon">
        <Search />
      </div>
      <input
        type="text"
        value={text}
        onChange={handleTextChange}
        placeholder="Search Reddit"
      />
    </form>
  );
};
export default Searchbar;
