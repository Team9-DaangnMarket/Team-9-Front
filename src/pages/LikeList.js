import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { axiosInstance } from "../shared/api";

import { Grid } from "../elements";
import { BiArrowBack } from "react-icons/bi";
import PostItem from "../components/PostItem";

// TODO 해당 유저의 고유 아이디 값을 참조하여 관심목록 조회 할것
const LikeList = (props) => {
  const [like_list, setLikeList] = useState([]);

  const fetchLikeList = async () => {
    try {
      const res = await axiosInstance.get("/postLike");
      setLikeList(res.data);
      console.log("찜 목록 불러오기 성공", res.data);
    } catch (err) {
      console.log("찜 목록 불러오기 실패", err);
    }
  };

  useEffect(() => {
    fetchLikeList();
  }, []);

  if (!like_list.length) {
    return (
      <LikeListWrap>
        <nav className={"list-nav"}>
          <Grid is_container is_flex flex_align={"center"}>
            <button
              type={"button"}
              className={"back-btn"}
              onClick={() => (window.location.href = "/")}
            >
              <BiArrowBack />
            </button>
            <h2 className={"title"}>관심목록</h2>
          </Grid>
        </nav>

        <Grid
          is_container
          is_flex
          flex_justify={"center"}
          padding={"40px 0 0 0"}
        >
          <EmptyLike>찜 목록이 없습니다 :)</EmptyLike>
        </Grid>
      </LikeListWrap>
    );
  }

  return (
    <LikeListWrap>
      <nav className={"list-nav"}>
        <Grid is_container is_flex flex_align={"center"}>
          <button
            type={"button"}
            className={"back-btn"}
            onClick={() => (window.location.href = "/")}
          >
            <BiArrowBack />
          </button>
          <h2 className={"title"}>관심목록</h2>
        </Grid>
      </nav>

      <div className={"list-cont"}>
        <Grid is_container padding={"0 16px"}>
          <ul className={"like-list"}>
            {like_list.map((post, idx) => {
              return <PostItem post={post} key={`post-id-${idx}`} />;
            })}
          </ul>
        </Grid>
      </div>
    </LikeListWrap>
  );
};

export default LikeList;

const LikeListWrap = styled.section`
  padding-top: 56px;

  .list-nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    background-color: #fff;
    border-bottom: 1px solid var(--border-color);
    z-index: 9999;

    .back-btn {
      border: 0;
      background: none;
      width: 40px;
      height: 40px;
      font-size: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 10px;
      cursor: pointer;
    }

    .title {
      position: relative;
      top: 1px;
      font-size: 15px;
    }
  }
`;

const EmptyLike = styled.div``;
