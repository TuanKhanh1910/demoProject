import React, { useEffect, useState } from "react";
import { movieServ } from "../../services/movieServices";
import { NavLink } from "react-router-dom";
import { Button, Space } from "antd";
import { useDispatch } from "react-redux";
import {
  set_loading_started,
  set_loading_end,
} from "../../redux/slices/loadingSlice";
const ListMovie = () => {
  const [movie, setMovie] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(set_loading_started());
    movieServ
      .getAllMovie()
      .then((result) => {
        return (
          console.log(result),
          setMovie(result.data.content),
          dispatch(set_loading_end())
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto py-10">
      <h2 className="text-3xl font-bold">Danh sách phim</h2>
      <div className="grid grid-cols-4 gap-5">
        {movie.map(({ hinhAnh, tenPhim, maPhim, moTa }, index) => {
          return (
            <div className="movie_item" key={index}>
              <img className="h-60 w-full object-cover" src={hinhAnh} alt="" />
              <div className="text my-3">
                <h3 className="font-bold text-lg my-3 line-clamp-1">
                  <span className="text-white py-1 px-2 bg-orange-500 rounded-md mr-3">
                    C18
                  </span>{" "}
                  {tenPhim}
                </h3>
                <p className="line-clamp-2">{moTa}</p>
                <NavLink to={`/detail/${maPhim}`}>
                  <Button className="w-full h-10 text-lg" type="primary" danger>
                    Xem ngay
                  </Button>
                </NavLink>
              </div>
            </div>
          );
        })}

        {/* Movie item */}
      </div>
    </div>
  );
};

export default ListMovie;
