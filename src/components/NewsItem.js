import React,{useState} from "react";
import axios from "axios";
import Delete from "../Image/delete.png";
import Save from "../Image/save.png";
import Bookmark from "../Image/bookmark.png";
import Alert from "./Alert";

const NewsItem = ({
  title,
  description,
  imageUrl,
  newsUrl,
  author,
  date,
  source,
  signedin,
  state,
  content,
  _id,
  setArticles,articles
}) => {
const [bookmarked, setbookmarked] = useState(false)
const [savedMessage, setSavedMessage] = useState({
  showAlert: false,
  alertMessage: ""
});

const [deleteMessage, setDeleteMessage] = useState({
  showAlert: false,
  alertMessage: ""
});
  const saveArticle = async () => {

    try {
      const response = await axios.post(
        "http://localhost:8080/api/articles/addarticle",
        {
          user: state.user.id,
          source: source,
          author: author,
          title: title,
          description: description,
          url: newsUrl,
          urlToImage: imageUrl,
          publishedAt: date,
          content: content,
        }
      );
      console.log(response.data);
      setSavedMessage({
        showAlert: true,
        alertMessage: "Article is Saved.",
      });
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const deleteArticle = async () => {
    console.log(_id, typeof _id);
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/articles/deletearticle/${_id}`
        );
        console.log(response.data);
        setArticles(articles.filter((curr)=>curr._id!==_id))
        setDeleteMessage({
          showAlert: true,
          alertMessage: "Article has been Deleted.",
        });
    } catch (error) {
      console.log("Error:", error);
    }
  };
  console.log("new",articles)
  return (
    <div className="my-3">
      <div className="card">
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            position: "absolute",
            right: "0",
          }}
        >
          <span className="badge rounded-pill bg-danger"> {source} </span>
        </div>
        <img
          src={
            !imageUrl
              ? "https://fdn.gsmarena.com/imgroot/news/21/08/xiaomi-smart-home-india-annoucnements/-476x249w4/gsmarena_00.jpg"
              : imageUrl
          }
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text">
            <small className="text-body-secondary">
              By {author ? author : "unknown"} on {new Date(date).toGMTString()}{" "}
              mins ago
            </small>
          </p>
          <div className="alignment">
          <a
            rel="noreferrer"
            href={newsUrl}
            target="_blank"
            className="btn btn-sm btn-dark"
          >
            Read More
          </a>
          {signedin ? (
            <img
              style={{ width: "48px", padding: "5px" }}
              src={!bookmarked?Save:Bookmark}
              alt="save"
              onClick={() => {
                saveArticle();
                setbookmarked(true)
              }}
            />
          ) : null}
          {!signedin ? (
            <img
              style={{ width: "48px", padding: "5px" }}
              src={Delete}
              alt="delete"
              onClick={() => {
                deleteArticle();
              }}
            />
          ) : null}
          </div>
        </div>
        {savedMessage.showAlert && (
          <Alert
            message={savedMessage.alertMessage}
            onClose={() => setSavedMessage({ showAlert: false, alertMessage: "" })}
          />
        )}
        {deleteMessage.showAlert && (
          <Alert
            message={deleteMessage.alertMessage}
            onClose={() => setDeleteMessage({ showAlert: false, alertMessage: "" })}
          />
        )}
      </div>
    </div>
  );
};

export default NewsItem;
