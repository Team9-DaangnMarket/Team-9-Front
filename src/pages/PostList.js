import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as searchActions } from "../redux/modules/search";
import { useDispatch, useSelector } from "react-redux";

import { Grid, Button } from "../elements";
import PostItem from "../components/PostItem";
import { TiHome } from "react-icons/ti";
import { BiReceipt, BiLogOut } from "react-icons/bi";
import { MdOutlineMenu } from "react-icons/md";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { BsPlusLg } from "react-icons/bs";
import { AiOutlineHeart, AiOutlineUser } from "react-icons/ai";
import {
  HiOutlineLocationMarker,
  HiOutlineSearch,
  HiOutlineBell,
} from "react-icons/hi";

import Skeleton from "../components/skeleton/Skeleton";
import InfinityScroll from "../shared/InfinityScroll";
import { deleteCookie } from "../shared/Cookie";

const PostList = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const post_data = useSelector((state) => state.post);
  const [listData, setListData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getPostList = () => {
    dispatch(postActions.getPostAction(post_data.page));
  };

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
    dispatch(postActions.getPostAction(0));
  }, []);

  const logOut = () => {
    const ok = window.confirm("로그아웃하시겠습니까?");
    if (ok) {
      deleteCookie("OK");
      history.push("/login");
    } else {
      return null;
    }
  };

  return (
    <div>
      <MenuTop>
        <Grid is_container>
          <div className="nav-top-bx">
            <h2>
              서초동
              <MdOutlineKeyboardArrowDown className="arrow-down" />
            </h2>
            <Grid is_container _className="top-btns">
              <button
                onClick={() => {
                  history.push("/search");
                  dispatch(searchActions.setKeyword(null));
                }}
              >
                <HiOutlineSearch />
              </button>

              <button>
                <MdOutlineMenu />
              </button>

              <button>
                <HiOutlineBell />
              </button>
            </Grid>
          </div>
        </Grid>
      </MenuTop>

      <PostListBx>
        <Grid is_container _className="parent-position">
          <Button
            _className="plus-btn"
            _onClick={() => {
              history.push("/write");
            }}
          >
            <BsPlusLg />
          </Button>
          <InfinityScroll
            callNext={getPostList}
            paging={{ next: post_data.has_next }}
          >
            {isLoading
              ? post_data.posts.map((item, idx) => {
                  return (
                    <Skeleton version={"post-item"} key={`skel-id-${idx}`} />
                  );
                })
              : post_data.posts.map((item, idx) => {
                  return <PostItem post={item} key={`post-id-${idx}`} />;
                })}
          </InfinityScroll>

          {/* <SyncLoader></SyncLoader> */}
        </Grid>
      </PostListBx>

      <MenuBottom>
        <Grid _className="btn-bx" is_container>
          <button type="button" className="btns">
            <TiHome />
          </button>
          <button type="button" className="btns">
            <BiReceipt />
          </button>
          <button type="button" className="btns">
            <HiOutlineLocationMarker />
          </button>
          <button
            type="button"
            className="btns"
            onClick={() => history.push("/likelist")}
          >
            <AiOutlineHeart />
          </button>
          <button type="button" className="btns" onClick={logOut}>
            <BiLogOut />
          </button>
        </Grid>
      </MenuBottom>
    </div>
  );
};

const MenuTop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9999;
  /* height: 40px; */
  border-bottom: 1px solid var(--border-color);
  background: #fff;

  .nav-top-bx {
    display: flex;
    align-items: center;

    h2 {
      width: 100%;
      font-size: 20px;
      cursor: pointer;
    }

    .arrow-down {
      vertical-align: middle;
    }
  }

  .top-btns {
    display: flex;
    justify-content: flex-end;

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border: none;
      background: none;
      font-size: 24px;
      cursor: pointer;
    }
  }
`;
const PostListBx = styled.div`
  margin: 42px 0;
  .parent-position {
    position: relative;
  }
  .plus-btn {
    position: fixed;
    top: calc(93.67vh + -67.50999999999999px);
    right: calc(49.83vw + -201.79px);
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 50%;
    background: var(--point-color);
    color: #fff;
    font-size: 20px;
    z-index: 9999;
  }
`;

const MenuBottom = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  border-top: 1px solid var(--border-color);
  background-color: #fff;

  .btn-bx {
    background: #fff;
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
  }
  .btns {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    font-size: 24px;
    border: none;
    background: none;
  }
`;
export default PostList;
