import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import { IComment, IPost } from "../models/posts";
import { IUser } from "../models/users";
import http from "../services/http";

export default function Post() {
  const params = useParams();

  const [isOpenComment, setIsOpenComment] = useState(false);
  const [post, setPost] = useState<IPost | null>(null);
  const [user, setUser] = useState<IUser | null>(null);
  const [comments, setComments] = useState<IComment[]>([]);

  useEffect(() => {
    const getPost = async () => {
      const dataPost: IPost = (await http.get<IPost>(`/posts/${params.id}`)).data;
      const dataUser: IUser = (await http.get<IUser>(`/users/${dataPost.userId}`)).data;
      const dataComments: IComment[] = (await http.get<IComment[]>(`/posts/${params.id}/comments`)).data.map((comment) => ({ ...comment, email: comment.email.split("@")[0] }));
      setPost(dataPost);
      setUser(dataUser);
      setComments(dataComments);
    };

    getPost();
  }, [params.id]);

  return (
    <div className="width-panel d-flex justify-content-center flex-column mx-auto">
      <BackButton to={"/dashboard"} className="mb-4"></BackButton>

      <div className="d-flex">
        <h6 className="fw-bold m-0 me-3">{user?.username}</h6>
        <div>
          <p className="color-gray">{post?.title}</p>
          <p className="color-gray-body">{post?.body}</p>

          {!isOpenComment && (
            <div onClick={() => setIsOpenComment(true)} className="text-primary cursor-pointer w-fit-content">
              <i className="fa-regular fa-comment me-2"></i>
              <span className="d-inline-block me-4">{comments.length}</span>
            </div>
          )}

          {isOpenComment && (
            <div>
              <p className="color-gray fw-bold">All Comments</p>
              <table>
                <tbody>
                  {comments.map((comment) => (
                    <tr key={comment.id}>
                      <td>
                        <h6 className="fw-bold m-0 me-3">{comment?.email}</h6>
                      </td>
                      <td>
                        <p className="color-gray-body">{comment?.body}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
