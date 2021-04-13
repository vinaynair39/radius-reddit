import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "store/store";
import CardList from "components/CardList/CardList";
import Layout from "components/Layout/Layout";
// import "./SavedPage.scss";

interface Props {}
const SavedPage: React.FC<Props> = () => {
  const { saved = [], isLoading } = useSelector(
    (state: AppState) => state.common
  );
  return (
    <Layout>
      {saved.length > 0 ? <CardList items={saved} loading={isLoading} /> : <div className="no-content">You have no posts saved as of now</div>}
    </Layout>
  );
};
export default SavedPage;
