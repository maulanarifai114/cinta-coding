import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { IDashboard } from "../models/dashboard";
import { IPost, IComment } from "../models/posts";
import { IUser } from "../models/users";
import http from "../services/http";

export default function Dashboard() {
  const [posts, setPosts] = useState<IDashboard[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  let [searchParams, setSearchParams] = useSearchParams();

  const location = useLocation();

  useEffect(() => {
    const getPosts = async () => {
      const queryPage = +(searchParams.get("page") ?? 1);
      const querySearch = (searchParams.get("search") ?? "").toLowerCase();

      setPage(queryPage);
      setSearch(querySearch);

      const data: IPost[] = (await http.get<IPost[]>("/posts")).data;
      const dataPages = data.filter((item) => item.title.toLowerCase().includes(querySearch) || item.body.toLowerCase().includes(querySearch)).slice((queryPage - 1) * 10, queryPage * 10);
      const dataFinal: IDashboard[] = [];

      const users: Promise<AxiosResponse<IUser, any>>[] = [];
      const totalComment: Promise<AxiosResponse<IComment[], any>>[] = [];

      for (const dataPage of dataPages) {
        users.push(http.get<IUser>(`/users/${dataPage.userId}`));
        totalComment.push(http.get<IComment[]>(`/post/${dataPage.id}/comments`));
      }

      const awaitedUsers = await Promise.all(users);
      const awaitedTotalComment = await Promise.all(totalComment);

      for (const [index, dataPaged] of dataPages.entries()) dataFinal.push({ ...dataPaged, user: awaitedUsers[index].data, totalComment: awaitedTotalComment[index].data.length });

      setTotal(data.length);
      setPosts(dataFinal);
    };

    getPosts();
  }, [location, searchParams]);

  const pagination = (type: "prev" | "next") => {
    let pagination = page;
    if (type === "prev" && pagination > 1) {
      pagination--;
      search ? setSearchParams({ page: pagination.toString(), search }) : setSearchParams({ page: pagination.toString() });
    }
    if (type === "next" && pagination < total / 10) {
      pagination++;
      search ? setSearchParams({ page: pagination.toString(), search }) : setSearchParams({ page: pagination.toString() });
    }
  };

  const onSearch = (event: any) => {
    event.preventDefault();
    search ? setSearchParams({ search }) : setSearchParams({});
  };

  return (
    <div className="width-panel d-flex justify-content-center flex-column mx-auto">
      <form onSubmit={onSearch}>
        <input onKeyUp={(e: any) => setSearch(e.target?.value)} onBlur={onSearch} className="form-control bg-gray mb-5" type="text" placeholder="Search" />
      </form>

      {posts.map((post) => (
        <div key={post.id} className="d-flex mb-4">
          <h6 className="fw-bold m-0 me-3">{post.user.username}</h6>
          <div>
            <p className="color-gray">{post.title}</p>
            <div className="text-primary">
              <i className="fa-regular fa-comment me-2"></i>
              <span className="d-inline-block me-4">{post.totalComment}</span>
              <Link to={`/post/${post.id}`} className="fw-bold text-decoration-none">
                Detail
              </Link>
            </div>
          </div>
        </div>
      ))}

      <div className="d-flex justify-content-end mb-5">
        <span onClick={() => pagination("prev")} className="cursor-pointer d-inline-block">
          prev
        </span>
        <span className="text-primary fw-bold d-inline-block mx-4">{page}</span>
        <span onClick={() => pagination("next")} className="cursor-pointer d-inline-block">
          next
        </span>
      </div>
    </div>
  );
}
